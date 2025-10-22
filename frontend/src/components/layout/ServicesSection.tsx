import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Square,
  ShieldCheck,
  Waves,
  RefreshCw,
  DoorOpen,
  ThermometerSun,
} from "lucide-react"; // Importamos íconos relevantes
const services = [
  {
    icon: <Square className="w-10 h-10 text-primary" />,
    title: "Ventanas Corredizas",
    description:
      "Ideales para espacios modernos, maximizan la luz y la vista con un deslizamiento suave y sin esfuerzo.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Ventanas Fijas",
    description:
      "Perfectas para seguridad y aislamiento. Ofrecen una solución duradera sin partes móviles.",
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-primary" />,
    title: "Ventanas Oscilobatientes",
    description:
      "Versatilidad y ventilación segura con su doble sistema de apertura, perfectas para cualquier clima.",
  },
  {
    icon: <DoorOpen className="w-10 h-10 text-primary" />,
    title: "Puertas de PVC",
    description:
      "Combina seguridad y estilo con nuestras puertas de PVC, disponibles para terrazas, balcones y entradas.",
  },
  {
    icon: <Waves className="w-10 h-10 text-primary" />,
    title: "Aislamiento Acústico",
    description:
      "Reduce el ruido exterior significativamente, creando un ambiente de paz y tranquilidad en tu hogar.",
  },
  {
    icon: <ThermometerSun className="w-10 h-10 text-primary" />,
    title: "Aislamiento Térmico",
    description:
      "Mantén tu hogar fresco en verano y cálido en invierno, optimizando el consumo de energía.",
  },
];

export const ServicesSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Nuestras Soluciones en PVC</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Ofrecemos una gama de productos diseñados para el confort, la
            seguridad y la estética de tu hogar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="text-center p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription>{service.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
