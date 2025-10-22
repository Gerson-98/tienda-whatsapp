// backend/src/routes/projects.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Definimos la ruta GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      // Incluimos la categoría de cada proyecto en la respuesta
      include: {
        projectCategory: true,
      },
      orderBy: {
        createdAt: 'desc', // Opcional: para mostrar los más nuevos primero
      },
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudieron obtener los proyectos.' });
  }
});

export default router;
