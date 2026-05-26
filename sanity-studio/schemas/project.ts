// sanity-studio/schemas/project.ts

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'El nombre del proyecto (ej: "Residencia Las Cumbres")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Una breve descripción del proyecto.',
    },
    {
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Permite al admin recortar la imagen de forma inteligente
      },
      description: 'La imagen principal del proyecto.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'projectCategory'}], // Le decimos que se conecta a 'projectCategory'
      description: 'La categoría a la que pertenece este proyecto.',
    },
  ],
}
