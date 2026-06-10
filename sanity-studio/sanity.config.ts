// sanity-studio/sanity.config.ts

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// --- 1. IMPORTA TUS NUEVOS SCHEMAS ---
import project from './schemas/project'
import product from './schemas/product'
import projectCategory from './schemas/projectCategory'
import siteSettings from './schemas/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'VentPro CMS',

  projectId: '2kke24ur', // Asegúrate que estos valores estén aquí
  dataset: 'production', // Asegúrate que estos valores estén aquí

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del sitio')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'siteSettings'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    // --- 2. AÑADE LOS SCHEMAS AL ARRAY ---
    types: [project, product, projectCategory, siteSettings],
  },
})
