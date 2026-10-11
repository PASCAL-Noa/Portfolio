import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as argon2 from 'argon2';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5433/portfolio_db?schema=public';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'npascal.pro@icloud.com';
  const rawPassword = process.env.ADMIN_PASSWORD || 'temporary_admin_secret_123';
  const passwordHash = await argon2.hash(rawPassword);

  console.log(`Seeding database...`);

  // Provision single admin user
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

  // Seed sample initial project
  await prisma.project.upsert({
    where: { id: 'rebreaker' },
    update: {},
    create: {
      id: 'rebreaker',
      title: 'Rebreaker',
      category: 'game',
      image: '/assets/Rebreaker/projet-rebreaker.webp',
      description: 'Casse-brique moderne développé en équipe avec moteur physique et mécaniques revisitées.',
      technologies: ['C++', 'SFML', 'Game Dev'],
      githubUrl: 'https://github.com/Razar30/Rebreaker',
      detailUrl: '/pages/rebreaker.html',
      featured: true,
      order: 1,
      detail: {
        create: {
          title: 'Rebreaker',
          banner: '/assets/Rebreaker/projet-rebreaker.webp',
          description: '<p>Rebreaker est l\'un de mes projets d\'école les plus ambitieux.</p>',
          duration: '2 semaines',
          team: 'PASCAL Noa, GILOTIN Ethan, VILLARD-HERNANDEZ Mithaniel',
          tags: [
            { label: 'École', variant: 'purple' },
            { label: 'C++', variant: 'default' },
            { label: 'SFML', variant: 'default' },
          ],
          downloadUrl: 'https://github.com/Razar30/Rebreaker/releases',
          downloadLabel: 'Télécharger Rebreaker',
          docUrl: '/assets/Rebreaker/cdc-rebreaker.pdf',
          docLabel: 'Télécharger le Cahier des Charges',
          videoUrl: 'https://www.youtube.com/embed/RJzi27_0S90',
          media: [
            { type: 'video', src: 'https://www.youtube.com/embed/RJzi27_0S90' },
            { type: 'image', src: '/assets/Rebreaker/rebreaker2.webp', alt: 'Gameplay Rebreaker' },
          ],
          thumbnails: ['/assets/Rebreaker/rebreaker2.webp'],
        },
      },
    },
  });
  console.log(`Initial projects seeded.`);

  // Seed sample timeline item
  await prisma.timelineItem.upsert({
    where: { id: 'gaming-campus-bachelor' },
    update: {},
    create: {
      id: 'gaming-campus-bachelor',
      period: 'Sept. 2023 - 2026',
      title: 'Bachelor Développeur Informatique',
      subtitle: 'Gaming Campus / Lyon',
      description: 'Formation spécialisée en programmation informatique, bas niveau, architecture C++ et conception de moteurs de jeux.',
      image: '/assets/Timeline/gamingcampus.jpg',
      type: 'edu',
      order: 1,
    },
  });
  console.log(`Timeline seeded.`);

  console.log(`Database seeding completed.`);
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
