import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "Contacto" }),
      });
      if (!response.ok) throw new Error("Falló el envío");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold">Contáctanos</h2>
          <p className="text-muted-foreground mt-2">
            ¿Listo para iniciar tu proyecto o tienes alguna pregunta? Rellena el
            formulario y nuestro equipo de expertos se pondrá en contacto
            contigo a la brevedad.
          </p>
        </div>

        <div>
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <CheckCircle className="h-14 w-14 text-green-500 mb-4" />
              <h3 className="text-xl font-bold">¡Mensaje Enviado!</h3>
              <p className="text-muted-foreground mt-2">
                Gracias por contactarnos. Te responderemos pronto.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setStatus("idle")}
              >
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono (Opcional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu proyecto o tus dudas..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensaje"
                )}
              </Button>
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">
                  Hubo un error al enviar. Por favor, intenta de nuevo.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
