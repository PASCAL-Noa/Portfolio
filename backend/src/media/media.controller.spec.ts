import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MediaController } from './media.controller.js';
import { MediaService } from './media.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

describe('MediaController', () => {
  let controller: MediaController;
  let mediaService: { formatFileResponse: any };

  beforeEach(async () => {
    mediaService = {
      formatFileResponse: vi.fn().mockImplementation((file) => ({
        url: `/uploads/${file.filename}`,
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        { provide: MediaService, useValue: mediaService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload single file and format response', () => {
    const mockFile = {
      filename: 'sample.webp',
      originalname: 'original.webp',
      mimetype: 'image/webp',
      size: 1024,
    } as Express.Multer.File;

    const res = controller.uploadSingle(mockFile);
    expect(mediaService.formatFileResponse).toHaveBeenCalledWith(mockFile);
    expect(res.url).toBe('/uploads/sample.webp');
  });

  it('should upload multiple files and format responses', () => {
    const mockFiles = [
      { filename: 'f1.png', originalname: 'o1.png', mimetype: 'image/png', size: 100 },
      { filename: 'f2.png', originalname: 'o2.png', mimetype: 'image/png', size: 200 },
    ] as Express.Multer.File[];

    const res = controller.uploadMultiple(mockFiles);
    expect(res).toHaveLength(2);
    expect(res[0].url).toBe('/uploads/f1.png');
    expect(res[1].url).toBe('/uploads/f2.png');
  });
});
