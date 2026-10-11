import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProjectsService } from './projects.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProjectCategoryEnum } from './dto/create-project.dto.js';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: {
    project: {
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
      project: {
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
        ProjectsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll projects', async () => {
    const res = await service.findAll();
    expect(prisma.project.findMany).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it('should create project with detail', async () => {
    prisma.project.findUnique.mockResolvedValue(null);
    prisma.project.create.mockResolvedValue({
      id: 'test-project',
      title: 'Test Project',
      detail: { title: 'Test Project' },
    });

    const res = await service.create({
      id: 'test-project',
      title: 'Test Project',
      category: ProjectCategoryEnum.GAME,
      image: '/banner.webp',
      technologies: ['C++'],
    });

    expect(prisma.project.create).toHaveBeenCalled();
    expect(res.id).toBe('test-project');
  });
});
