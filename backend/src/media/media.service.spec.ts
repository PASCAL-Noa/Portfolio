import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';
import { MediaService } from './media.service.js';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if file is null', () => {
    expect(() => service.formatFileResponse(null as any)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for disallowed mimetype', () => {
    const invalidFile = {
      mimetype: 'application/x-msdownload',
      size: 1024,
      originalname: 'malicious.exe',
      filename: 'malicious.exe',
    } as Express.Multer.File;

    expect(() => service.formatFileResponse(invalidFile)).toThrow(BadRequestException);
  });

  it('should format valid file response', () => {
    const validFile = {
      mimetype: 'image/webp',
      size: 2048,
      originalname: 'preview.webp',
      filename: '12345-preview.webp',
    } as Express.Multer.File;

    const res = service.formatFileResponse(validFile);
    expect(res).toEqual({
      url: '/uploads/12345-preview.webp',
      originalName: 'preview.webp',
      filename: '12345-preview.webp',
      mimetype: 'image/webp',
      size: 2048,
    });
  });
});
