import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground px-8 py-16 md:px-16 md:py-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
              Transforma tu espacio hoy mismo
            </h2>
            <p className="mt-6 text-lg font-light opacity-90">
              ¿Listo para empezar tu proyecto? Contáctanos para una cotización
              personalizada y sin compromiso.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full px-8 py-6 text-base font-medium"
              >
                <Link to="/cotizacion">
                  Solicitar cotización <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contacto">Contactar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
