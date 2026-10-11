import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProjectsController } from './projects.controller.js';
import { ProjectsService } from './projects.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

describe('ProjectsController', () => {
  let controller: ProjectsController;
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
      findOne: vi.fn().mockResolvedValue({ id: 'rebreaker' }),
      create: vi.fn().mockResolvedValue({ id: 'new-project' }),
      update: vi.fn().mockResolvedValue({ id: 'rebreaker' }),
      remove: vi.fn().mockResolvedValue({ id: 'rebreaker' }),
      reorder: vi.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        { provide: ProjectsService, useValue: service },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
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
    const res = await controller.findOne('rebreaker');
    expect(service.findOne).toHaveBeenCalledWith('rebreaker');
    expect(res.id).toBe('rebreaker');
  });
});
