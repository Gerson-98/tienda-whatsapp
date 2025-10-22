// backend/prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el seeding...');

  // ==========================================================
  // ===          SECCIÓN DE CATEGORÍAS Y PRODUCTOS         ===
  // ==========================================================
  console.log('Creando categorías y productos...');

  // 1. Crear Categorías de PRODUCTOS
  const ventanas = await prisma.category.upsert({
    where: { name: 'Ventanas' },
    update: {},
    create: { name: 'Ventanas' },
  });
  const puertas = await prisma.category.upsert({
    where: { name: 'Puertas' },
    update: {},
    create: { name: 'Puertas' },
  });

  // 2. Crear PRODUCTOS
  await prisma.product.upsert({
    where: { name: 'Ventana Corrediza Clásica' },
    update: {},
    create: {
      name: 'Ventana Corrediza Clásica',
      description: 'Ideal para espacios reducidos, ofrece máxima luminosidad.',
      price: 150.0,
      imageUrl: '/images/products/ventana1.jpg',
      categoryId: ventanas.id,
    },
  });
  await prisma.product.upsert({
    where: { name: 'Ventana Proyectable PVC' },
    update: {},
    create: {
      name: 'Ventana Proyectable PVC',
      description:
        'Apertura hacia el exterior, perfecta para ventilación controlada.',
      price: 185.5,
      imageUrl: '/images/products/ventana2.jpg',
      categoryId: ventanas.id,
    },
  });
  await prisma.product.upsert({
    where: { name: 'Puerta de PVC Nogal' },
    update: {},
    create: {
      name: 'Puerta de PVC Nogal',
      description:
        'Acabado en madera de nogal, combina elegancia y durabilidad.',
      price: 320.0,
      imageUrl: '/images/products/ventana3.jpg',
      categoryId: puertas.id,
    },
  });
  await prisma.product.upsert({
    where: { name: 'Ventana Fija Panorámica' },
    update: {},
    create: {
      name: 'Ventana Fija Panorámica',
      description:
        'Diseñada para ofrecer vistas ininterrumpidas y aislamiento superior.',
      price: 210.0,
      imageUrl: '/images/products/ventana4.jpg',
      categoryId: ventanas.id,
    },
  });
  await prisma.product.upsert({
    where: { name: 'Puerta Doble Hoja' },
    update: {},
    create: {
      name: 'Puerta Doble Hoja',
      description:
        'Ideal para terrazas y patios, con cerradura de alta seguridad.',
      price: 450.75,
      imageUrl: '/images/products/ventana5.jpg',
      categoryId: puertas.id,
    },
  });
  await prisma.product.upsert({
    where: { name: 'Ventana Oscilobatiente' },
    update: {},
    create: {
      name: 'Ventana Oscilobatiente',
      description: 'Doble funcionalidad de apertura para máxima versatilidad.',
      price: 230.0,
      imageUrl: '/images/products/ventana6.jpg',
      categoryId: ventanas.id,
    },
  });

  console.log('Categorías y productos creados.');

  // ==========================================================
  // ===          SECCIÓN DE CATEGORÍAS Y PROYECTOS         ===
  // ==========================================================
  console.log('Creando categorías y proyectos de instalación...');

  // 1. Crear Categorías de PROYECTOS
  const residencial = await prisma.projectCategory.upsert({
    where: { name: 'Residencial' },
    update: {},
    create: { name: 'Residencial' },
  });
  const comercial = await prisma.projectCategory.upsert({
    where: { name: 'Comercial' },
    update: {},
    create: { name: 'Comercial' },
  });
  const renovaciones = await prisma.projectCategory.upsert({
    where: { name: 'Renovaciones' },
    update: {},
    create: { name: 'Renovaciones' },
  });

  // 2. Crear PROYECTOS
  await prisma.project.upsert({
    where: { name: 'Residencia Moderna' },
    update: {},
    create: {
      name: 'Residencia Moderna',
      description:
        'Instalación completa en obra nueva con perfiles de alta eficiencia.',
      imageUrl: '/images/projects/cocina-moderna.jpg',
      projectCategoryId: residencial.id,
    },
  });
  await prisma.project.upsert({
    where: { name: 'Oficinas Corporativas' },
    update: {},
    create: {
      name: 'Oficinas Corporativas',
      description:
        'Soluciones para espacios de trabajo que potencian la productividad.',
      imageUrl: '/images/hero/proyecto-moderno.jpg',
      projectCategoryId: comercial.id,
    },
  });
  await prisma.project.upsert({
    where: { name: 'Renovación de Lujo' },
    update: {},
    create: {
      name: 'Renovación de Lujo',
      description:
        'Cambio de ventanería antigua por soluciones de PVC con aislamiento acústico.',
      imageUrl: '/images/projects/exterior-lujoso.jpg',
      projectCategoryId: renovaciones.id,
    },
  });

  console.log('Categorías y proyectos de instalación creados.');
  console.log('Seeding completado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
