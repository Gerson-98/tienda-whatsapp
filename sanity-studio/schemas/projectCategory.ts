// sanity-studio/schemas/projectCategory.ts
export default {
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'El nombre de la categoría (ej: "Residencial", "Comercial")',
    },
  ],
}
