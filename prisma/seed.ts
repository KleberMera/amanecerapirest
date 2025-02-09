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
    { id: 1, username: 'kleber', password: '0928213727', rolId: 1, nombre: 'Kleber', apellido: 'Mera', email: 'kleber@gmail.com', nombreComercial: 'Kleber Mera' },
    { id: 2, username: 'Sandra Galarza', password: 'SandraGalarza', rolId: 2, nombre: 'Sandra', apellido: 'Galarza', email: 'sandra@gmail.com', nombreComercial: 'Sandra Galarza' },
    { id: 3, username: 'Grecia Rojas', password: 'GreciaRojas', rolId: 2, nombre: 'Grecia', apellido: 'Rojas', email: 'grecia@gmail.com',   nombreComercial: 'Grecia Rojas' },
    { id: 4, username: 'Lila Mora', password: 'LilaMora', rolId: 2, nombre: 'Lila', apellido: 'Mora', email: 'lila@gmail.com', nombreComercial: 'Lila Mora' },
    { id: 5, username: 'MariaSuarez', password: 'MariaSuarez', rolId: 2, nombre: 'Maria', apellido: 'Suarez', email: 'maria@gmail.com', nombreComercial: 'Maria Suarez' },
    { id: 6, username: 'Diomedes Mera', password: 'DiomedesMera', rolId: 2 , nombre: 'Diomedes', apellido: 'Mera', email: 'diomedes@gmail.com', nombreComercial: 'Diomedes Mera' },
    { id: 7, username: 'David Rojas', password: 'DavidRojas', rolId: 2, nombre: 'David', apellido: 'Rojas', email: 'david@gmail.com', nombreComercial: 'David Rojas' },
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
    { id: 6, usuarioId: 7, totalAcumulado: 55, mesAcumulado: 'Diciembre', fechaAcumulado: new Date('2024-01-12'), estado: true },
   
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
    { id: 6, usuarioId: 7, cantidad: 0, mesCompra: 'Enero', fechaCompra: new Date('2024-01-01'), estado: true },
    //Febrero
    { id: 7, usuarioId: 2, cantidad: 1, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    { id: 8, usuarioId: 3, cantidad: 0, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    { id: 9, usuarioId: 4, cantidad: 1, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    { id: 10, usuarioId: 5, cantidad: 1, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    { id: 11, usuarioId: 6, cantidad: 1, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    { id: 12, usuarioId: 7, cantidad: 0, mesCompra: 'Febrero', fechaCompra: new Date('2024-02-01'), estado: true },
    

   
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
    { id: 6, accionCompradaId: 6, interesGenerado: 11.94 },

    //Febrero
    { id: 7, accionCompradaId: 7, interesGenerado: 8.60 },
    { id: 8, accionCompradaId: 8, interesGenerado: 14.80 },
    { id: 9, accionCompradaId: 9, interesGenerado: 13.40 },
    { id: 10, accionCompradaId: 10, interesGenerado: 16.60 },
    { id: 11, accionCompradaId: 11, interesGenerado: 16.80 },
    { id: 12, accionCompradaId: 12, interesGenerado: 11.00 },
   
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
