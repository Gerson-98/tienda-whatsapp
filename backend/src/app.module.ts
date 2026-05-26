import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { ProductsModule } from './products/products.module'; // <-- 1. Importa el módulo
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, ProductsModule, SubmissionsModule, AuthModule], // <-- 2. Añádelo aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
