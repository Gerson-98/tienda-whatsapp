// sanity-studio/schemas/siteSettings.ts

export default {
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    {
      name: 'heroHomeImage',
      title: 'Imagen principal - Inicio',
      type: 'image',
      options: {hotspot: true},
      description: 'Foto grande del lado derecho en la página de Inicio.',
    },
    {
      name: 'heroAboutImage',
      title: 'Imagen de portada - Nosotros',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen de fondo del encabezado de la página "Nosotros".',
    },
    {
      name: 'heroProjectsImage',
      title: 'Imagen de portada - Proyectos',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen de fondo del encabezado de la página "Proyectos".',
    },
    {
      name: 'heroProductsImage',
      title: 'Imagen de portada - Productos',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen de fondo del encabezado de la página "Productos".',
    },
    {
      name: 'heroContactImage',
      title: 'Imagen de portada - Contacto',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen de fondo del encabezado de la página "Contacto".',
    },
    {
      name: 'heroQuoteImage',
      title: 'Imagen de portada - Cotización',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen de fondo del encabezado de la página "Cotización".',
    },
  ],
}
