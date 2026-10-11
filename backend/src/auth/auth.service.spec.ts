import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { adminUser: { findUnique: any } };
  let jwt: { sign: any };

  beforeEach(async () => {
    prisma = {
      adminUser: {
        findUnique: vi.fn(),
      },
    };
    jwt = {
      sign: vi.fn().mockReturnValue('mock-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UnauthorizedException if admin does not exist', async () => {
    prisma.adminUser.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'unknown@test.com', password: 'password123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return accessToken if credentials match', async () => {
    const hashedPassword = await argon2.hash('valid_secret_pass');
    prisma.adminUser.findUnique.mockResolvedValue({
      id: 'admin-uuid-1',
      email: 'admin@test.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    });

    const result = await service.login({
      email: 'admin@test.com',
      password: 'valid_secret_pass',
    });

    expect(result).toHaveProperty('accessToken', 'mock-jwt-token');
    expect(result.user).toEqual({
      id: 'admin-uuid-1',
      email: 'admin@test.com',
      role: 'ADMIN',
    });
  });
});
