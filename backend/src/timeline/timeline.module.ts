import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service.js';
import { TimelineController } from './timeline.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [TimelineController],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
