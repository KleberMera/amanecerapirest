import { Prisma, PrismaClient } from '@prisma/client';

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


  const users = [
    { id: 1, username: 'kleber', password: '0928213727', rolId: 1 },
    { id: 2, username: 'Sandra Galarza', password: 'SandraGalarza', rolId: 2 },
    { id: 3, username: 'Grecia Rojas', password: 'GreciaRojas', rolId: 2},
    { id: 4, username: 'Lila Mora', password: 'LilaMora', rolId: 2 },
    { id: 5, username: 'MariaSuarez', password: 'MariaSuarez', rolId: 2 },
    { id: 6, username: 'Diomedes Mera', password: 'DiomedesMera', rolId: 2 },
  ];

  for (const user of users) {
    await prisma.usuario.upsert({
      where: { id: user.id },
      update: {}, // Si ya existe, no lo modifica
      create: user, // Si no existe, lo crea
    });
  }


  const acumuladas = [
    { id: 1, usuarioId: 2, totalAcumulado: 42, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
    { id: 2, usuarioId: 3, totalAcumulado: 74, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
    { id: 3, usuarioId: 4, totalAcumulado: 67, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
    { id: 4, usuarioId: 5, totalAcumulado: 82, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
    { id: 5, usuarioId: 6, totalAcumulado: 83, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
   
  ];

  for (const acumulada of acumuladas) {
    await prisma.accionAcumulada.upsert({
      where: { id: acumulada.id },
      update: {}, // Si ya existe, no lo modifica
      create: acumulada, // Si no existe, lo crea
    });
  }

 
  const compradas = [
    { id: 1, usuarioId: 2, cantidad: 1, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    { id: 2, usuarioId: 3, cantidad: 0, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    { id: 3, usuarioId: 4, cantidad: 0, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    { id: 4, usuarioId: 5, cantidad: 1, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    { id: 5, usuarioId: 6, cantidad: 1, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    

   
  ];

  for (const comprada of compradas) {
    await prisma.accionComprada.upsert({
      where: { id: comprada.id },
      update: {}, // Si ya existe, no lo modifica
      create: comprada
    });
  }


  const intereses = [
    { id: 1, accionCompradaId: 1, interesGenerado: 9.12 },
    { id: 2, accionCompradaId: 2, interesGenerado: 16.06 },
    { id: 3, accionCompradaId: 3, interesGenerado: 14.54 },
    { id: 4, accionCompradaId: 4, interesGenerado: 17.79 },
    { id: 5, accionCompradaId: 5, interesGenerado: 18.01 },
   
  ];

  for (const interes of intereses) {
    await prisma.interesGanado.upsert({
      where: { id: interes.id },
      update: {}, // Si ya existe, no lo modifica
      create: interes
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
