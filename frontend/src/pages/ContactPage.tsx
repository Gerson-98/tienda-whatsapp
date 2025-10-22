// src/pages/ContactPage.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";

export const ContactPage = () => {
  return (
    <main className="-mt-16">
      {/* SECCIÓN HERO */}
      <div
        className="relative z-[-1] h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/contact-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white container pt-16">
          <h1 className="text-4xl md:text-5xl font-bold">Hablemos</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg md:text-xl">
            Estamos aquí para responder tus preguntas y ayudarte a iniciar tu
            próximo proyecto.
          </p>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL DE CONTACTO */}
      <MotionSection className="container py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Columna Izquierda: Información Directa */}
          <MotionItem className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Ponte en Contacto</h2>
              <p className="text-muted-foreground mt-2">
                Utiliza el formulario o contáctanos directamente a través de
                cualquiera de nuestros canales. ¡Nos encantará escucharte!
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="tel:+50212345678"
                className="flex items-center gap-4 group"
              >
                <Phone className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-lg text-muted-foreground group-hover:text-primary transition-colors">
                  (+502) 1234-5678
                </span>
              </a>
              <a
                href="mailto:cotizaciones@ventpro.com"
                className="flex items-center gap-4 group"
              >
                <Mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-lg text-muted-foreground group-hover:text-primary transition-colors">
                  cotizaciones@ventpro.com
                </span>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <p className="text-lg text-muted-foreground">
                  Avenida Las Américas 12-34, Zona 14
                  <br />
                  Ciudad de Guatemala, Guatemala
                </p>
              </div>
            </div>
          </MotionItem>

          {/* Columna Derecha: Formulario */}
          <MotionItem>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@correo.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (Opcional)</Label>
                <Input id="phone" placeholder="Tu número de teléfono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">¿Cómo podemos ayudarte?</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </MotionItem>
        </div>
      </MotionSection>

      {/* SECCIÓN MAPA A TODO LO ANCHO */}
      <div className="w-full h-[400px]">
        {/* Aquí va el código de inserción de Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.166160321281!2d-90.51528668515995!3d14.58966598980993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a385f1c9f023%3A0x28198f1f5317a86!2sAvenida%20Las%20Am%C3%A9ricas!5e0!3m2!1ses!2sgt!4v1678886543210!5m2!1ses!2sgt"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
};
