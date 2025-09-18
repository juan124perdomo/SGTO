import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Crear los roles si no existen
  const roleUser = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'user',
    },
  });

  const roleAdmin = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'admin',
    },
  });

  // --- AÑADIR NUEVO ROL ---
  const roleTecnico = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'tecnico',
    },
  });

  console.log(`Created role: ${roleUser.name} (ID: ${roleUser.id})`);
  console.log(`Created role: ${roleAdmin.name} (ID: ${roleAdmin.id})`);
  console.log(`Created role: ${roleTecnico.name} (ID: ${roleTecnico.id})`); // Añadimos log

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });