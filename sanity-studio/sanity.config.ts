// sanity-studio/sanity.config.ts

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// --- 1. IMPORTA TUS NUEVOS SCHEMAS ---
import project from './schemas/project'
import product from './schemas/product'
import projectCategory from './schemas/projectCategory'

export default defineConfig({
  name: 'default',
  title: 'VentPro CMS',

  projectId: '2kke24ur', // Asegúrate que estos valores estén aquí
  dataset: 'production', // Asegúrate que estos valores estén aquí

  plugins: [structureTool(), visionTool()],

  schema: {
    // --- 2. AÑADE LOS SCHEMAS AL ARRAY ---
    types: [project, product, projectCategory],
  },
})
