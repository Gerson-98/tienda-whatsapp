import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service'; // <-- Importa PrismaService

@Injectable()
export class CategoriesService {
  // Inyecta PrismaService para poder usarlo con 'this.prisma'
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    // Usa Prisma para crear una nueva categoría en la base de datos
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    // Usa Prisma para obtener todas las categorías
    return this.prisma.category.findMany();
  }
}
