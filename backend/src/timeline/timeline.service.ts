import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimelineItemDto } from './dto/create-timeline-item.dto.js';
import { UpdateTimelineItemDto } from './dto/update-timeline-item.dto.js';
import { ReorderTimelineEntryDto } from './dto/reorder-timeline.dto.js';

@Injectable()
export class TimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.timelineItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Élément de timeline introuvable (id: ${id})`);
    }

    return item;
  }

  async create(dto: CreateTimelineItemDto) {
    const existing = await this.prisma.timelineItem.findUnique({
      where: { id: dto.id },
    });

    if (existing) {
      throw new ConflictException(`Un élément avec l'identifiant '${dto.id}' existe déjà.`);
    }

    return this.prisma.timelineItem.create({
      data: {
        id: dto.id,
        period: dto.period,
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        image: dto.image,
        type: dto.type,
        link: dto.link,
        linkText: dto.linkText,
        order: dto.order || 0,
      },
    });
  }

  async update(id: string, dto: UpdateTimelineItemDto) {
    await this.findOne(id);

    return this.prisma.timelineItem.update({
      where: { id },
      data: {
        ...(dto.period && { period: dto.period }),
        ...(dto.title && { title: dto.title }),
        ...(dto.subtitle !== undefined && { subtitle: dto.subtitle }),
        ...(dto.description && { description: dto.description }),
        ...(dto.image !== undefined && { image: dto.image }),
        ...(dto.type && { type: dto.type }),
        ...(dto.link !== undefined && { link: dto.link }),
        ...(dto.linkText !== undefined && { linkText: dto.linkText }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.timelineItem.delete({
      where: { id },
    });
  }

  async reorder(items: ReorderTimelineEntryDto[]) {
    return this.prisma.$transaction(
      items.map((item) =>
        this.prisma.timelineItem.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
  }
}
