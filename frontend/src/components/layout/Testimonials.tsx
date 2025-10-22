import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

// Sample testimonial data
const testimonials = [
  {
    name: "Ana Pérez",
    location: "Guatemala City",
    comment:
      "El aislamiento acústico es increíble. ¡Mi apartamento es mucho más tranquilo ahora! El equipo fue profesional y rápido.",
    rating: 5,
  },
  {
    name: "Carlos González",
    location: "Antigua Guatemala",
    comment:
      "La calidad de las ventanas superó mis expectativas. Se ven modernas y la eficiencia energética ha mejorado notablemente.",
    rating: 5,
  },
  {
    name: "Lucía Morales",
    location: "Quetzaltenango",
    comment:
      "Un servicio al cliente excepcional de principio a fin. Me ayudaron a elegir la opción perfecta para mi casa. ¡Totalmente recomendados!",
    rating: 5,
  },
];

// Helper component for star ratings
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-500">
    {Array.from({ length: rating }).map((_, index) => (
      <Star key={index} className="w-5 h-5 fill-current" />
    ))}
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            La Confianza de Nuestros Clientes
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Descubre por qué nuestros clientes nos eligen para sus proyectos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="bg-background p-6 flex flex-col justify-between shadow-md"
            >
              <CardContent className="p-0">
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-muted-foreground italic">
                  "{testimonial.comment}"
                </p>
              </CardContent>
              <div className="mt-6">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
