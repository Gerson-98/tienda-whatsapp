import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    <section className="relative min-h-screen w-full overflow-hidden flex items-start md:items-center">
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
                className="w-full h-full object-cover block min-h-screen"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      <div className="container relative z-20 mx-auto text-white pt-32 md:pt-24 pb-12">
        <div className="max-w-3xl flex flex-col gap-6">
          <span className="relative inline-flex items-center gap-2 self-start rounded-full bg-secondary/20 text-secondary px-4 py-1 text-sm font-medium backdrop-blur-sm border border-secondary/30 mb-4">
            🏆 +200 proyectos en Guatemala
          </span>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter">
            Diseño y eficiencia en{" "}
            <span className="bg-gradient-to-r from-secondary to-amber-200 bg-clip-text text-transparent">
              ventanas premium
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-xl leading-relaxed">
            Transformamos tu espacio con soluciones modernas, duraderas y de
            alto aislamiento térmico y acústico.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium"
            >
              <Link to="/cotizacion">
                Solicitar Cotización <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link to="/proyectos">Ver Proyectos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
