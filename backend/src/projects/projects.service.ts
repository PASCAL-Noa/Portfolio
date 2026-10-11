import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: { detail: true },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { detail: true },
    });

    if (!project) {
      throw new NotFoundException(`Projet introuvable (id: ${id})`);
    }

    return project;
  }

  async create(dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { id: dto.id },
    });

    if (existing) {
      throw new ConflictException(`Un projet avec l'identifiant '${dto.id}' existe déjà.`);
    }

    const detailObj = dto.detail || {};

    return this.prisma.project.create({
      data: {
        id: dto.id,
        title: dto.title,
        category: dto.category,
        image: dto.image,
        description: dto.description,
        technologies: dto.technologies || [],
        githubUrl: dto.githubUrl,
        liveUrl: dto.liveUrl,
        detailUrl: dto.detailUrl || `/pages/${dto.id}.html`,
        detailLabel: dto.detailLabel,
        featured: dto.featured || false,
        order: dto.order ?? dto.orderIndex ?? 0,
        detail: {
          create: {
            title: detailObj.title || dto.title,
            banner: detailObj.banner || dto.banner || dto.image,
            description: detailObj.description || dto.detailDescription || dto.description || '',
            duration: detailObj.duration || dto.duration,
            team: detailObj.team || dto.team,
            tags: (detailObj.tags || dto.tags || []) as any,
            downloadUrl: detailObj.downloadUrl || dto.downloadUrl,
            downloadLabel: detailObj.downloadLabel || dto.downloadLabel,
            docUrl: detailObj.docUrl || dto.docUrl,
            docLabel: detailObj.docLabel || dto.docLabel,
            videoUrl: detailObj.videoUrl || dto.videoUrl,
            media: (detailObj.media || dto.media || []) as any,
            thumbnails: (detailObj.thumbnails || dto.thumbnails || []) as any,
          },
        },
      },
      include: { detail: true },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    const detailObj = dto.detail || {};

    return this.prisma.project.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.category && { category: dto.category }),
        ...(dto.image && { image: dto.image }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.technologies && { technologies: dto.technologies }),
        ...(dto.githubUrl !== undefined && { githubUrl: dto.githubUrl }),
        ...(dto.liveUrl !== undefined && { liveUrl: dto.liveUrl }),
        ...(dto.detailUrl !== undefined && { detailUrl: dto.detailUrl }),
        ...(dto.detailLabel !== undefined && { detailLabel: dto.detailLabel }),
        ...(dto.featured !== undefined && { featured: dto.featured }),
        ...(dto.order !== undefined || dto.orderIndex !== undefined
          ? { order: dto.order ?? dto.orderIndex }
          : {}),
        detail: {
          upsert: {
            create: {
              title: detailObj.title || dto.title || '',
              banner: detailObj.banner || dto.banner || dto.image || '',
              description: detailObj.description || dto.detailDescription || dto.description || '',
              duration: detailObj.duration || dto.duration,
              team: detailObj.team || dto.team,
              tags: (detailObj.tags || dto.tags || []) as any,
              downloadUrl: detailObj.downloadUrl || dto.downloadUrl,
              downloadLabel: detailObj.downloadLabel || dto.downloadLabel,
              docUrl: detailObj.docUrl || dto.docUrl,
              docLabel: detailObj.docLabel || dto.docLabel,
              videoUrl: detailObj.videoUrl || dto.videoUrl,
              media: (detailObj.media || dto.media || []) as any,
              thumbnails: (detailObj.thumbnails || dto.thumbnails || []) as any,
            },
            update: {
              ...(dto.title && { title: dto.title }),
              ...(detailObj.banner || dto.banner ? { banner: detailObj.banner || dto.banner } : {}),
              ...(detailObj.description !== undefined || dto.detailDescription !== undefined
                ? { description: detailObj.description ?? dto.detailDescription }
                : {}),
              ...(detailObj.duration !== undefined || dto.duration !== undefined
                ? { duration: detailObj.duration ?? dto.duration }
                : {}),
              ...(detailObj.team !== undefined || dto.team !== undefined
                ? { team: detailObj.team ?? dto.team }
                : {}),
              ...(detailObj.tags !== undefined || dto.tags !== undefined
                ? { tags: (detailObj.tags ?? dto.tags) as any }
                : {}),
              ...(detailObj.downloadUrl !== undefined || dto.downloadUrl !== undefined
                ? { downloadUrl: detailObj.downloadUrl ?? dto.downloadUrl }
                : {}),
              ...(detailObj.downloadLabel !== undefined || dto.downloadLabel !== undefined
                ? { downloadLabel: detailObj.downloadLabel ?? dto.downloadLabel }
                : {}),
              ...(detailObj.docUrl !== undefined || dto.docUrl !== undefined
                ? { docUrl: detailObj.docUrl ?? dto.docUrl }
                : {}),
              ...(detailObj.docLabel !== undefined || dto.docLabel !== undefined
                ? { docLabel: detailObj.docLabel ?? dto.docLabel }
                : {}),
              ...(detailObj.videoUrl !== undefined || dto.videoUrl !== undefined
                ? { videoUrl: detailObj.videoUrl ?? dto.videoUrl }
                : {}),
              ...(detailObj.media !== undefined || dto.media !== undefined
                ? { media: (detailObj.media ?? dto.media) as any }
                : {}),
              ...(detailObj.thumbnails !== undefined || dto.thumbnails !== undefined
                ? { thumbnails: (detailObj.thumbnails ?? dto.thumbnails) as any }
                : {}),
            },
          },
        },
      },
      include: { detail: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async reorder(items: { id: string; order?: number; orderIndex?: number }[]) {
    const list = items || [];
    return this.prisma.$transaction(
      list.map((item) =>
        this.prisma.project.update({
          where: { id: item.id },
          data: { order: item.order ?? item.orderIndex ?? 0 },
        }),
      ),
    );
  }
}
