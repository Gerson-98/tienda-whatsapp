// frontend/src/pages/QuotePage.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle, Send, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cartStore";
import { useHeroImage } from "@/lib/siteSettings";
import { logger } from "@/lib/logger";
import {
  QuoteCartSummary,
  buildCartMessagePrefix,
} from "@/components/products/QuoteCartSummary";

export const QuotePage = () => {
  const heroImage = useHeroImage("heroQuoteImage", "/images/hero/quote-hero.jpg");
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

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
  const [submittedEmail, setSubmittedEmail] = useState("");

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
      const cartSummary = buildCartMessagePrefix(items);
      const fullMessage = cartSummary
        ? `${formData.message}\n\n${cartSummary}`
        : formData.message;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            message: fullMessage,
            type: "Cotización",
          }),
        }
      );
      if (!response.ok) throw new Error("Falló el envío");
      setSubmittedEmail(formData.email);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
      clearCart();
    } catch (error) {
      logger.error("Error al enviar la cotización:", error);
      setStatus("error");
    }
  };

  const statusMessage =
    status === "sending"
      ? "Enviando tu solicitud..."
      : status === "success"
        ? "Solicitud enviada correctamente."
        : status === "error"
          ? "Hubo un problema al enviar tu solicitud."
          : "";

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Solicita tu <span className="text-secondary">cotización</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Completa el formulario y te contactaremos en menos de 24 horas
            hábiles.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FORM */}
          <div className="lg:col-span-3">
            <div aria-live="polite" className="sr-only">
              {statusMessage}
            </div>
            {status === "success" ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl">
                  ¡Solicitud recibida!
                </h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  {submittedEmail
                    ? `Te contactaremos a ${submittedEmail} en menos de 24 horas hábiles.`
                    : "Te contactaremos en menos de 24 horas hábiles."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setStatus("idle")}
                  >
                    Hacer otra solicitud
                  </Button>
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link to="/proyectos">Ver nuestros proyectos</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display font-bold text-2xl mb-6">
                  Detalles del proyecto
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nombre completo{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico{" "}
                        <span className="text-destructive">*</span>
                      </Label>
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
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(+502) 1234-5678"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="projectType" className="text-sm font-medium">
                      Tipo de proyecto{" "}
                      <span className="text-muted-foreground font-normal">
                        (opcional)
                      </span>
                    </Label>
                    <Input
                      id="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="Casa particular, edificio, renovación..."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Describe tu proyecto{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cantidad de ventanas, medidas aproximadas, estilo..."
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Campos requeridos
                  </p>
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
                        Enviar solicitud
                      </>
                    )}
                  </Button>
                  {status === "error" && (
                    <p
                      role="alert"
                      className="text-sm text-center text-destructive"
                    >
                      Hubo un problema al enviar tu solicitud. Intenta de
                      nuevo o escríbenos directamente a{" "}
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
              </>
            )}
          </div>

          {/* RESUMEN */}
          <aside className="lg:col-span-2 order-first lg:order-none">
            <div className="lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-xl mb-4">
                Tu cotización
              </h3>
              {items.length === 0 ? (
                <div className="bg-card rounded-2xl p-6 border border-border text-center py-10">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Tu carrito está vacío
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-4 rounded-full"
                  >
                    <Link to="/productos">Ver productos</Link>
                  </Button>
                </div>
              ) : (
                <QuoteCartSummary />
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
