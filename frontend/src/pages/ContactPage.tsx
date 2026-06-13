// frontend/src/pages/ContactPage.tsx

import { useState } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactInfo } from "@/components/layout/ContactInfo";
import { useHeroImage } from "@/lib/siteSettings";
import { logger } from "@/lib/logger";

export const ContactPage = () => {
  const heroImage = useHeroImage("heroContactImage", "/images/hero/contact-hero.jpg");
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
    } catch (error) {
      logger.error("Error al enviar el mensaje de contacto:", error);
      setStatus("error");
    }
  };

  const statusMessage =
    status === "sending"
      ? "Enviando tu mensaje..."
      : status === "success"
        ? "Mensaje enviado correctamente."
        : status === "error"
          ? "Hubo un problema al enviar tu mensaje."
          : "";

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Hablemos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Respondemos tus preguntas y te ayudamos a iniciar tu próximo proyecto.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">
              Envíanos un mensaje
            </h2>
            <p className="text-muted-foreground mb-8">
              Te responderemos en menos de 24 horas hábiles.
            </p>

            <div aria-live="polite" className="sr-only">
              {statusMessage}
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="bg-card rounded-2xl border border-border p-10 text-center"
              >
                <CheckCircle className="h-14 w-14 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground mt-2">
                  Gracias por contactarnos. Te responderemos en menos de 24
                  horas hábiles.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Correo
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Teléfono{" "}
                    <span className="text-muted-foreground font-normal">
                      (opcional)
                    </span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[140px] resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-center text-destructive">
                    Hubo un problema al enviar tu mensaje. Intenta de nuevo o
                    escríbenos directamente a{" "}
                    <a
                      href="mailto:cotizaciones@ventpro.com"
                      className="underline font-medium"
                    >
                      cotizaciones@ventpro.com
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>

          {/* INFO */}
          <div>
            <h2 className="font-display font-bold text-xl mb-6">
              Información de contacto
            </h2>
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  );
};
