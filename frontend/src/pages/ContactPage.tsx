// frontend/src/pages/ContactPage.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Loader2, CheckCircle } from "lucide-react";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, type: "Contacto" }),
        }
      );
      if (!response.ok) throw new Error("Falló el envío");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      // --- CAMBIO CLAVE AQUÍ: Añadimos las llaves que faltaban ---
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="-mt-16">
      {/* SECCIÓN HERO (Sin cambios) */}
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

      {/* SECCIÓN PRINCIPAL DE CONTACTO (REDiseñada) */}
      <div className="bg-muted">
        <MotionSection className="container py-20">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Columna Izquierda: Bloque de Mapa */}
            <MotionItem className="bg-background rounded-lg overflow-hidden shadow-lg">
              {/* --- CAMBIO CLAVE 2: Aquí debes pegar la URL correcta del mapa --- */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6880.597763663834!2d-90.52171027789107!3d14.564572138762381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a6ab21508c17%3A0x83eafff435a548b6!2sProtecci%C3%B3n%20Total!5e0!3m2!1ses!2sgt!4v1761241191702!5m2!1ses!2sgt"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </MotionItem>

            {/* Columna Derecha: Formulario en una Tarjeta */}
            <MotionItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Envíanos un Mensaje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center h-[350px]">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold">¡Mensaje Enviado!</h3>
                      <p className="text-muted-foreground mt-2">
                        Gracias por contactarnos. Te responderemos pronto.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono (Opcional)</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Enviar Mensaje"
                        )}
                      </Button>
                      {status === "error" && (
                        <p className="text-red-500 text-sm text-center">
                          Hubo un error. Por favor, intenta de nuevo.
                        </p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </MotionItem>
          </div>
        </MotionSection>
      </div>

      {/* SECCIÓN DE TARJETAS DE INFORMACIÓN */}
      <MotionSection className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta Dirección */}
          <MotionItem>
            <Card className="text-center h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dirección</h3>
                <p className="text-muted-foreground">
                  Avenida Las Américas 12-34, Zona 14
                  <br />
                  Ciudad de Guatemala, Guatemala
                </p>
              </CardContent>
            </Card>
          </MotionItem>
          {/* Tarjeta Teléfonos */}
          <MotionItem>
            <Card className="text-center h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Teléfonos</h3>
                <a
                  href="tel:+50241916647"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  (+502) 4191-6647
                </a>
                <a
                  href="tel:+50212345678"
                  className="text-muted-foreground hover:text-primary transition-colors mt-1"
                >
                  (+502) 1234-5678
                </a>
              </CardContent>
            </Card>
          </MotionItem>
          {/* Tarjeta Correo */}
          <MotionItem>
            <Card className="text-center h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Correo Electrónico
                </h3>
                <a
                  href="mailto:cotizaciones@ventpro.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  cotizaciones@ventpro.com
                </a>
              </CardContent>
            </Card>
          </MotionItem>
        </div>
      </MotionSection>
    </main>
  );
};
