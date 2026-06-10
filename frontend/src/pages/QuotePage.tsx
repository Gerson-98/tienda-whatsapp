// frontend/src/pages/QuotePage.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle, Send, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cartStore";
import { useHeroImage } from "@/lib/siteSettings";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(price);

const fieldClass =
  "rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all w-full";

export const QuotePage = () => {
  const heroImage = useHeroImage("heroQuoteImage", "/images/hero/quote-hero.jpg");
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.getTotalPrice());

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
      const cartSummary = items
        .map((i) => `- ${i.name} x${i.quantity} (${formatPrice(i.price)})`)
        .join("\n");
      const fullMessage = cartSummary
        ? `${formData.message}\n\nProductos seleccionados:\n${cartSummary}`
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
      console.error(error);
      // Fallback mailto
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\nTel: ${formData.phone}\nTipo: ${formData.projectType}\n\n${formData.message}`
      );
      window.location.href = `mailto:cotizaciones@ventpro.com?subject=Cotizaci%C3%B3n%20VentPro&body=${body}`;
      setStatus("error");
    }
  };

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
            Solicita tu <span className="text-gradient">cotización</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Completa el formulario y nuestro equipo se pondrá en contacto.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FORM */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl">
                  ¡Solicitud recibida!
                </h3>
                <p className="text-muted-foreground mt-2">
                  Hemos recibido los detalles de tu proyecto. Te contactaremos a
                  la brevedad.
                </p>
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
                        Nombre completo
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className={fieldClass}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        className={fieldClass}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(+502) 1234-5678"
                      className={fieldClass}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="projectType" className="text-sm font-medium">
                      Tipo de proyecto
                    </Label>
                    <Input
                      id="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="Casa particular, edificio, renovación..."
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Describe tu proyecto
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cantidad de ventanas, medidas aproximadas, estilo..."
                      className={`${fieldClass} min-h-[120px] resize-none`}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold rounded-xl"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar solicitud
                      </>
                    )}
                  </Button>
                  {status === "error" && (
                    <p className="text-sm text-center text-destructive">
                      Hubo un error. Abrimos tu cliente de correo como alternativa.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* RESUMEN */}
          <aside className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 border border-border lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-xl mb-4">
                Tu cotización
              </h3>

              {items.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Tu carrito está vacío
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4 rounded-full">
                    <Link to="/productos">Ver productos</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-border last:border-0 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            x{item.quantity} · {formatPrice(item.price)}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t border-border">
                    <span>Subtotal estimado</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    El precio final puede variar según medidas y acabados.
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
