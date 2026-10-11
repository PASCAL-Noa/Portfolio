import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Prefix all routes with /api (e.g. /api/health)
  app.setGlobalPrefix('api');

  // Configure CORS
  const frontendUrl = configService.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
  app.enableCors({
    origin: [
      frontendUrl,
      'https://www.noa-pascal.com',
      'https://noa-pascal.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = configService.get<number>('PORT') ?? 4000;
  await app.listen(port);
  console.log(`🚀 Portfolio API running on: http://localhost:${port}/api`);
}
await bootstrap();
