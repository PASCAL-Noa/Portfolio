import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TimelineController } from './timeline.controller.js';
import { TimelineService } from './timeline.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

describe('TimelineController', () => {
  let controller: TimelineController;
  let service: {
    findAll: any;
    findOne: any;
    create: any;
    update: any;
    remove: any;
    reorder: any;
  };

  beforeEach(async () => {
    service = {
      findAll: vi.fn().mockResolvedValue([]),
      findOne: vi.fn().mockResolvedValue({ id: 'item-1' }),
      create: vi.fn().mockResolvedValue({ id: 'item-new' }),
      update: vi.fn().mockResolvedValue({ id: 'item-1' }),
      remove: vi.fn().mockResolvedValue({ id: 'item-1' }),
      reorder: vi.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelineController],
      providers: [
        { provide: TimelineService, useValue: service },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TimelineController>(TimelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll', async () => {
    const res = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it('should call findOne', async () => {
    const res = await controller.findOne('item-1');
    expect(service.findOne).toHaveBeenCalledWith('item-1');
    expect(res.id).toBe('item-1');
  });
});
