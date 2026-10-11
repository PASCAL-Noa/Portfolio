import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimelineItemDto } from './dto/create-timeline-item.dto.js';
import { UpdateTimelineItemDto } from './dto/update-timeline-item.dto.js';

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
    const generatedId =
      dto.id ||
      dto.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-') + `-${Date.now()}`;

    const existing = await this.prisma.timelineItem.findUnique({
      where: { id: generatedId },
    });

    if (existing) {
      throw new ConflictException(`Un élément avec l'identifiant '${generatedId}' existe déjà.`);
    }

    return this.prisma.timelineItem.create({
      data: {
        id: generatedId,
        period: dto.period,
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        image: dto.image,
        type: dto.type,
        link: dto.link,
        linkText: dto.linkText,
        order: dto.order ?? dto.orderIndex ?? 0,
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
        ...(dto.order !== undefined || dto.orderIndex !== undefined
          ? { order: dto.order ?? dto.orderIndex }
          : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.timelineItem.delete({
      where: { id },
    });
  }

  async reorder(items: { id: string; order?: number; orderIndex?: number }[]) {
    const list = items || [];
    return this.prisma.$transaction(
      list.map((item) =>
        this.prisma.timelineItem.update({
          where: { id: item.id },
          data: { order: item.order ?? item.orderIndex ?? 0 },
        }),
      ),
    );
  }
}
