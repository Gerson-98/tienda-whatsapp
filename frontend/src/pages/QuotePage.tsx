// frontend/src/pages/QuotePage.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MotionSection } from "@/components/motion/FadeInSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";

export const QuotePage = () => {
  // 1. Estados para el formulario de cotización
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // 2. Manejador de cambios (igual que en ContactPage)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 3. Manejador de envío (adaptado para 'Cotización')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // --- CAMBIO CLAVE: El tipo ahora es 'Cotización' ---
          body: JSON.stringify({ ...formData, type: "Cotización" }),
        }
      );
      if (!response.ok) throw new Error("Falló el envío");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
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
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Detalles de tu Proyecto</CardTitle>
            <CardDescription>
              Mientras más detalles nos brindes, más precisa será tu cotización.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center h-[400px]">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold">¡Solicitud Recibida!</h3>
                <p className="text-muted-foreground mt-2">
                  Gracias por tu interés. Hemos recibido los detalles de tu
                  proyecto y te contactaremos a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(+502) 1234-5678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Tipo de Proyecto</Label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="Ej: Casa particular, Edificio, Renovación..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Describe tu proyecto</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Danos una idea de lo que necesitas: cantidad de ventanas, medidas aproximadas, estilo, etc."
                    rows={6}
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
                    "Enviar Solicitud de Cotización"
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
      </MotionSection>
    </main>
  );
};
