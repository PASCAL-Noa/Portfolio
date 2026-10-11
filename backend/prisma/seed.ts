import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as argon2 from 'argon2';
import { projects } from '../../frontend/src/data/projects.ts';
import { projectDetails } from '../../frontend/src/data/projectDetails.ts';
import { timelineItems } from '../../frontend/src/data/skills.ts';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5433/portfolio_db?schema=public';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'npascal.pro@icloud.com';
  const rawPassword = process.env.ADMIN_PASSWORD || 'npascal2004';
  const passwordHash = await argon2.hash(rawPassword);

  console.log(`Seeding database with full portfolio data...`);

  // 1. Provision single admin user
  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Admin user provisioned: ${admin.email}`);

  // 2. Seed ALL projects and their project details
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const detail = projectDetails[p.id];

    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description,
        technologies: p.technologies,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        detailUrl: p.detailUrl,
        featured: p.featured ?? false,
        order: i,
        detail: detail
          ? {
              upsert: {
                create: {
                  title: detail.title,
                  banner: detail.banner,
                  description: detail.description,
                  duration: detail.duration,
                  team: detail.team,
                  tags: detail.tags as any,
                  downloadUrl: detail.downloadUrl,
                  downloadLabel: detail.downloadLabel,
                  docUrl: detail.docUrl,
                  docLabel: detail.docLabel,
                  videoUrl: detail.videoUrl,
                  media: detail.media as any,
                  thumbnails: detail.thumbnails as any,
                },
                update: {
                  title: detail.title,
                  banner: detail.banner,
                  description: detail.description,
                  duration: detail.duration,
                  team: detail.team,
                  tags: detail.tags as any,
                  downloadUrl: detail.downloadUrl,
                  downloadLabel: detail.downloadLabel,
                  docUrl: detail.docUrl,
                  docLabel: detail.docLabel,
                  videoUrl: detail.videoUrl,
                  media: detail.media as any,
                  thumbnails: detail.thumbnails as any,
                },
              },
            }
          : undefined,
      },
      create: {
        id: p.id,
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description,
        technologies: p.technologies,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        detailUrl: p.detailUrl,
        featured: p.featured ?? false,
        order: i,
        detail: detail
          ? {
              create: {
                title: detail.title,
                banner: detail.banner,
                description: detail.description,
                duration: detail.duration,
                team: detail.team,
                tags: detail.tags as any,
                downloadUrl: detail.downloadUrl,
                downloadLabel: detail.downloadLabel,
                docUrl: detail.docUrl,
                docLabel: detail.docLabel,
                videoUrl: detail.videoUrl,
                media: detail.media as any,
                thumbnails: detail.thumbnails as any,
              },
            }
          : undefined,
      },
    });
  }
  console.log(`Seeded ${projects.length} projects with full detail pages.`);

  // 3. Seed ALL timeline items
  for (let i = 0; i < timelineItems.length; i++) {
    const t = timelineItems[i];
    await prisma.timelineItem.upsert({
      where: { id: t.id },
      update: {
        period: t.period,
        title: t.title,
        subtitle: t.subtitle,
        description: t.description,
        image: t.image,
        type: t.type,
        link: t.link,
        linkText: t.linkText,
        order: i,
      },
      create: {
        id: t.id,
        period: t.period,
        title: t.title,
        subtitle: t.subtitle,
        description: t.description,
        image: t.image,
        type: t.type,
        link: t.link,
        linkText: t.linkText,
        order: i,
      },
    });
  }
  console.log(`Seeded ${timelineItems.length} timeline milestones.`);

  console.log(`Database seeding completed successfully! All data is fully preserved and synchronized.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
