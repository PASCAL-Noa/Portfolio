import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TimelineService } from './timeline.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TimelineCategoryEnum } from './dto/create-timeline-item.dto.js';

describe('TimelineService', () => {
  let service: TimelineService;
  let prisma: {
    timelineItem: {
      findMany: any;
      findUnique: any;
      create: any;
      update: any;
      delete: any;
    };
    $transaction: any;
  };

  beforeEach(async () => {
    prisma = {
      timelineItem: {
        findMany: vi.fn().mockResolvedValue([]),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      $transaction: vi.fn().mockImplementation((promises) => Promise.all(promises)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimelineService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TimelineService>(TimelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll timeline items', async () => {
    const res = await service.findAll();
    expect(prisma.timelineItem.findMany).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it('should create timeline item', async () => {
    prisma.timelineItem.findUnique.mockResolvedValue(null);
    prisma.timelineItem.create.mockResolvedValue({
      id: 'item-1',
      title: 'Timeline Title',
    });

    const res = await service.create({
      id: 'item-1',
      period: '2024',
      title: 'Timeline Title',
      description: 'Desc',
      type: TimelineCategoryEnum.EDU,
    });

    expect(prisma.timelineItem.create).toHaveBeenCalled();
    expect(res.id).toBe('item-1');
  });
});
