// src/pages/QuotePage.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";

export const QuotePage = () => {
  return (
    <main className="-mt-16">
      {/* SECCIÓN HERO */}
      <div
        className="relative z-[-1] h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/quote-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white container pt-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Solicita tu Cotización
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg md:text-xl">
            Estás a un paso de transformar tu espacio. Completa el formulario y
            nuestro equipo se pondrá en contacto contigo.
          </p>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL DE COTIZACIÓN */}
      <MotionSection className="container py-20">
        <div className="max-w-3xl mx-auto">
          <MotionItem>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Detalles de tu Proyecto</h2>
              <p className="text-muted-foreground mt-2">
                Mientras más detalles nos brindes, más precisa será tu
                cotización.
              </p>
            </div>
          </MotionItem>

          <MotionItem>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="(+502) 1234-5678" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-type">Tipo de Proyecto</Label>
                <Input
                  id="project-type"
                  placeholder="Ej: Casa particular, Edificio de oficinas, Renovación..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Describe tu proyecto</Label>
                <Textarea
                  id="message"
                  placeholder="Danos una idea de lo que necesitas: cantidad de ventanas, medidas aproximadas, estilo, etc."
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Enviar Solicitud
              </Button>
            </form>
          </MotionItem>
        </div>
      </MotionSection>
    </main>
  );
};
