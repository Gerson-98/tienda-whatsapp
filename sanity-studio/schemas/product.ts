// sanity-studio/schemas/product.ts

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'El nombre del producto (ej: "Ventana Corrediza Serie 70")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Una breve descripción del producto.',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'El precio del producto en Quetzales (GTQ).',
    },
    {
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'La imagen principal del producto.',
    },
    // Más adelante añadiremos aquí la categoría
  ],
}
