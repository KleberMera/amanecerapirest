import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles...');

  const roles = [
    { id: 1, nombre: 'Admin', descripcion: 'Rol con permisos administrativos' },
    { id: 2, nombre: 'User', descripcion: 'Rol básico para usuarios' },
    { id: 3, nombre: 'Moderator', descripcion: 'Rol con permisos de moderación' },
  ];

  for (const role of roles) {
    await prisma.rol.upsert({
      where: { id: role.id },
      update: {}, // Si ya existe, no lo modifica
      create: role, // Si no existe, lo crea
    });
  }

  console.log('Roles seed completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error seeding roles:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
