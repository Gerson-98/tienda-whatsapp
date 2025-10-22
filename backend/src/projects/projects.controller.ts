// src/projects/projects.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects') // <-- Define la URL base como /projects
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get() // <-- Maneja las peticiones GET a /projects
  findAll() {
    return this.projectsService.findAll();
  }
}
