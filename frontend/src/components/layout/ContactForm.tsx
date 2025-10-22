import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ContactForm = () => {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Columna de Información */}
        <div>
          <h2 className="text-3xl font-bold">Contáctanos</h2>
          <p className="text-muted-foreground mt-2">
            ¿Listo para iniciar tu proyecto o tienes alguna pregunta? Rellena el
            formulario y nuestro equipo de expertos se pondrá en contacto
            contigo a la brevedad.
          </p>
          {/* Aquí podemos añadir más información de contacto en el futuro */}
        </div>

        {/* Columna del Formulario */}
        <form className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre completo" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="ejemplo@correo.com" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono (Opcional)</Label>
            <Input id="phone" type="tel" placeholder="Tu número de teléfono" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos sobre tu proyecto o tus dudas..."
            />
          </div>
          <Button type="submit" size="lg">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </section>
  );
};
