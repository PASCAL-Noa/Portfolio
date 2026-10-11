import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'application/pdf',
];

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB max

@Injectable()
export class MediaService {
  private readonly uploadDir = join(process.cwd(), 'uploads');

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Format de fichier non autorisé (${file.mimetype}). Formats acceptés : Images (WebP, PNG, JPEG), Vidéos (MP4, WebM), Documents (PDF).`,
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('Le fichier dépasse la taille maximale autorisée (100 Mo)');
    }
  }

  formatFileResponse(file: Express.Multer.File) {
    this.validateFile(file);

    return {
      url: `/uploads/${file.filename}`,
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
