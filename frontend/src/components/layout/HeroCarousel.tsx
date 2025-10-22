import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const projectImages = [
    "/images/hero/proyecto-moderno.jpg",
    "/images/hero/villa-lujo.jpg",
    "/images/hero/interior-minimalista.jpg",
  ];

  return (
    <section className="relative h-[70vh] sm:h-[89vh] w-full overflow-hidden">
      <Carousel
        className="absolute inset-0 w-full h-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full">
          {projectImages.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <img
                src={src}
                alt={`Proyecto de Ventanas de PVC ${index + 1}`}
                // --- CAMBIO CLAVE AQUÍ: Añadimos 'block' ---
                className="w-full h-full object-cover block"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4 z-20">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Diseño y Eficiencia en Ventanas de PVC
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-white/90">
            Transformamos tu hogar con soluciones modernas, duraderas y de alto
            aislamiento térmico y acústico.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">Solicitar Cotización</Button>
            <Button size="lg" variant="secondary">
              Ver Proyectos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
