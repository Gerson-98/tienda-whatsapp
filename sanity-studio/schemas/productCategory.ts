// sanity-studio/schemas/productCategory.ts
export default {
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'El nombre de la categoría (ej: "Ventanas", "Puertas")',
    },
  ],
}
