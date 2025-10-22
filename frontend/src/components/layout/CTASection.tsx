import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="bg-background">
      <div className="container text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Transforma Tu Espacio Hoy Mismo
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          ¿Listo para empezar tu proyecto? Contáctanos para una cotización
          personalizada y sin compromiso. Nuestro equipo de expertos está listo
          para ayudarte.
        </p>
        <Button size="lg">Solicitar Cotización</Button>
      </div>
    </section>
  );
};
