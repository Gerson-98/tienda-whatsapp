import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  name: string;
  description: string | null;
  imageUrl: SanityImageSource | null;
  price: number;
  categoryName: string | null;
};
