import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Project = {
  _id: string;
  name: string;
  description: string | null;
  imageUrl: SanityImageSource | null;
  categoryName: string | null;
};
