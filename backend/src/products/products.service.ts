// backend/src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client'; // <-- Importante para tipado

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // --- CAMBIO: El método ahora acepta parámetros opcionales ---
  async findAll(search?: string, sortBy?: string) {
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    // 1. Lógica de Búsqueda
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive', // No distingue mayúsculas/minúsculas
      };
    }

    // 2. Lógica para Ordenar
    if (sortBy === 'price_asc') {
      orderBy.price = 'asc';
    } else if (sortBy === 'price_desc') {
      orderBy.price = 'desc';
    } else {
      orderBy.name = 'asc'; // Orden por defecto
    }

    return this.prisma.product.findMany({
      where,
      orderBy,
      include: { category: true },
    });
  }
}
