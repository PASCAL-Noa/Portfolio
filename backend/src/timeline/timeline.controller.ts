import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TimelineService } from './timeline.service.js';
import { CreateTimelineItemDto } from './dto/create-timeline-item.dto.js';
import { UpdateTimelineItemDto } from './dto/update-timeline-item.dto.js';
import { ReorderTimelineDto } from './dto/reorder-timeline.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Public()
  @Get()
  findAll() {
    return this.timelineService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelineService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTimelineItemDto) {
    return this.timelineService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reorder')
  reorderPut(@Body() dto: ReorderTimelineDto) {
    const items = dto.items || dto.orders || [];
    return this.timelineService.reorder(items);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reorder')
  reorderPatch(@Body() dto: ReorderTimelineDto) {
    const items = dto.items || dto.orders || [];
    return this.timelineService.reorder(items);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTimelineItemDto) {
    return this.timelineService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelineService.remove(id);
  }
}
