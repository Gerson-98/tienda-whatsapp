// src/projects/projects.module.ts

import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service'; // <-- 1. Importa el servicio

@Module({
  controllers: [ProjectsController],
  // --- 2. Añadimos PrismaService a la lista de 'providers' ---
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
