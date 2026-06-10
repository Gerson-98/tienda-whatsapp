// frontend/src/lib/siteSettings.ts
import { useEffect, useState } from "react";
import { client, urlFor } from "@/sanityClient";
import { logger } from "@/lib/logger";

export type SiteSettings = {
  heroHomeImage?: unknown;
  heroAboutImage?: unknown;
  heroProjectsImage?: unknown;
  heroProductsImage?: unknown;
  heroContactImage?: unknown;
  heroQuoteImage?: unknown;
};

let settingsPromise: Promise<SiteSettings | null> | null = null;

const fetchSiteSettings = (): Promise<SiteSettings | null> => {
  if (!settingsPromise) {
    settingsPromise = client
      .fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`)
      .catch((error) => {
        logger.error("Error al obtener la configuración del sitio:", error);
        settingsPromise = null;
        return null;
      });
  }
  return settingsPromise;
};

/**
 * Devuelve la URL de una imagen hero configurable desde Sanity,
 * usando `fallback` mientras carga o si el cliente no ha subido una imagen propia.
 */
export const useHeroImage = (
  field: keyof SiteSettings,
  fallback: string,
  width = 1600
): string => {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetchSiteSettings().then((settings) => {
      if (!active) return;
      const image = settings?.[field];
      if (image) {
        setUrl(urlFor(image).width(width).auto("format").quality(75).url());
      }
    });
    return () => {
      active = false;
    };
  }, [field, width]);

  return url;
};
