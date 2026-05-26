// frontend/src/sanityClient.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "2kke24ur", // <-- Pega tu Project ID aquí
  dataset: "production",
  useCdn: false, // `false` si quieres datos frescos siempre, `true` para mejor rendimiento
  apiVersion: "2023-05-03", // Usa una fecha de API reciente
});

// Función para generar URLs de imágenes desde Sanity
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
