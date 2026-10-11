import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { login: any; getProfile: any };

  beforeEach(async () => {
    authService = {
      login: vi.fn().mockResolvedValue({
        accessToken: 'mock-token',
        user: { id: 'admin-1', email: 'test@admin.com', role: 'ADMIN' },
      }),
      getProfile: vi.fn().mockResolvedValue({
        id: 'admin-1',
        email: 'test@admin.com',
        role: 'ADMIN',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.login', async () => {
    const res = await controller.login({
      email: 'test@admin.com',
      password: 'password123',
    });

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@admin.com',
      password: 'password123',
    });
    expect(res).toHaveProperty('accessToken');
  });

  it('should call authService.getProfile', async () => {
    const res = await controller.getProfile('admin-1');

    expect(authService.getProfile).toHaveBeenCalledWith('admin-1');
    expect(res.email).toBe('test@admin.com');
  });
});
