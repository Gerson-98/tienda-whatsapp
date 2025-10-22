// src/projects/projects.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // <-- 1. Importa el servicio central

@Injectable()
export class ProjectsService {
  // --- 2. Inyectamos PrismaService a través del constructor ---
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // La consulta sigue siendo la misma, pero ahora usa el servicio inyectado
    return this.prisma.project.findMany({
      include: {
        projectCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
