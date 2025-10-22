// backend/src/products/products.controller.ts

import { Controller, Get, Query } from '@nestjs/common'; // <-- Añade Query
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // --- CAMBIO: Usamos @Query para capturar los parámetros de la URL ---
  @Get()
  findAll(@Query('search') search?: string, @Query('sortBy') sortBy?: string) {
    return this.productsService.findAll(search, sortBy);
  }
}
