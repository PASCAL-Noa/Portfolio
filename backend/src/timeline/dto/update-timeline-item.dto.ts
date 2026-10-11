import { PartialType } from '@nestjs/mapped-types';
import { CreateTimelineItemDto } from './create-timeline-item.dto.js';

export class UpdateTimelineItemDto extends PartialType(CreateTimelineItemDto) {}
