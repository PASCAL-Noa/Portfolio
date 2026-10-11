import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as argon2 from 'argon2';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mockPasswordHash: string;

  beforeEach(async () => {
    mockPasswordHash = await argon2.hash('admin_password_123');

    const mockPrisma = {
      adminUser: {
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.email === 'admin@test.com' || where.id === 'admin-id-123') {
            return Promise.resolve({
              id: 'admin-id-123',
              email: 'admin@test.com',
              passwordHash: mockPasswordHash,
              role: 'ADMIN',
            });
          }
          return Promise.resolve(null);
        }),
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/auth/me (GET) - unauthorized without token', () => {
    return request(app.getHttpServer())
      .get('/api/auth/me')
      .expect(401);
  });

  it('/api/auth/login (POST) - rejects invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'wrong_password_xyz',
      })
      .expect(401);
  });

  it('/api/auth/login (POST) - accepts valid credentials and returns accessToken', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin_password_123',
      })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user).toEqual({
      id: 'admin-id-123',
      email: 'admin@test.com',
      role: 'ADMIN',
    });
  });

  it('/api/auth/login (POST) - rejects invalid payload format', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'invalid-email-format',
        password: '123',
      })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
