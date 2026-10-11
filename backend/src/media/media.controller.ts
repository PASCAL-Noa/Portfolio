import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { MediaService, ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from './media.service.js';

const multerDiskStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const uniqueName = `${Date.now()}-${randomUUID()}${ext}`;
    cb(null, uniqueName);
  },
});

const multerFileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerDiskStorage,
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: multerFileFilter,
    }),
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.formatFileResponse(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multerDiskStorage,
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: multerFileFilter,
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return (files || []).map((file) => this.mediaService.formatFileResponse(file));
  }
}
