import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ReorderProjectItemDto } from './dto/reorder-projects.dto.js';

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
        featured: dto.featured || false,
        order: dto.order || 0,
        detail: {
          create: {
            title: dto.title,
            banner: dto.banner || dto.image,
            description: dto.detailDescription || dto.description || '',
            duration: dto.duration,
            team: dto.team,
            tags: (dto.tags as any) || [],
            downloadUrl: dto.downloadUrl,
            downloadLabel: dto.downloadLabel,
            docUrl: dto.docUrl,
            docLabel: dto.docLabel,
            videoUrl: dto.videoUrl,
            media: (dto.media as any) || [],
            thumbnails: (dto.thumbnails as any) || [],
          },
        },
      },
      include: { detail: true },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);

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
        ...(dto.featured !== undefined && { featured: dto.featured }),
        ...(dto.order !== undefined && { order: dto.order }),
        detail: {
          upsert: {
            create: {
              title: dto.title || '',
              banner: dto.banner || dto.image || '',
              description: dto.detailDescription || dto.description || '',
              duration: dto.duration,
              team: dto.team,
              tags: (dto.tags as any) || [],
              downloadUrl: dto.downloadUrl,
              downloadLabel: dto.downloadLabel,
              docUrl: dto.docUrl,
              docLabel: dto.docLabel,
              videoUrl: dto.videoUrl,
              media: (dto.media as any) || [],
              thumbnails: (dto.thumbnails as any) || [],
            },
            update: {
              ...(dto.title && { title: dto.title }),
              ...(dto.banner && { banner: dto.banner }),
              ...(dto.detailDescription !== undefined && { description: dto.detailDescription }),
              ...(dto.duration !== undefined && { duration: dto.duration }),
              ...(dto.team !== undefined && { team: dto.team }),
              ...(dto.tags !== undefined && { tags: dto.tags as any }),
              ...(dto.downloadUrl !== undefined && { downloadUrl: dto.downloadUrl }),
              ...(dto.downloadLabel !== undefined && { downloadLabel: dto.downloadLabel }),
              ...(dto.docUrl !== undefined && { docUrl: dto.docUrl }),
              ...(dto.docLabel !== undefined && { docLabel: dto.docLabel }),
              ...(dto.videoUrl !== undefined && { videoUrl: dto.videoUrl }),
              ...(dto.media !== undefined && { media: dto.media as any }),
              ...(dto.thumbnails !== undefined && { thumbnails: dto.thumbnails as any }),
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

  async reorder(items: ReorderProjectItemDto[]) {
    return this.prisma.$transaction(
      items.map((item) =>
        this.prisma.project.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
  }
}
