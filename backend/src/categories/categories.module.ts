import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <-- Importa el módulo

@Module({
  imports: [PrismaModule], // <-- Añádelo aquí
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
