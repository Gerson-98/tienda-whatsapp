import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionItem } from "@/components/motion/FadeInSection";

const projects = [
  {
    title: "Residencia Moderna",
    description: "Ventanas de alto aislamiento para una cocina de diseño.",
    imageUrl: "/images/projects/cocina-moderna.jpg",
  },
  {
    title: "Sala de Estar Luminosa",
    description: "Maximizando la luz natural con perfiles minimalistas.",
    imageUrl: "/images/projects/sala-amplia.jpg",
  },
  {
    title: "Exterior de Lujo",
    description: "Soluciones duraderas que complementan la arquitectura.",
    imageUrl: "/images/projects/exterior-lujoso.jpg",
  },
  {
    title: "Hogar Confortable",
    description: "Renovación completa en residencia suburbana.",
    imageUrl: "/images/projects/casa-suburbana.jpg",
  },
  {
    title: "Vistas al Balcón",
    description: "Puertas corredizas de PVC para un acceso suave y seguro.",
    imageUrl: "/images/projects/dormitorio-balcon.jpg",
  },
  {
    title: "Ambiente Acogedor",
    description: "Aislamiento superior para un confort interior inigualable.",
    imageUrl: "/images/projects/sala-acogedora.jpg",
  },
];

export const ProjectGallery = () => {
  return (
    <section className="bg-background py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">
          Proyectos Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            // --- 2. Envolvemos cada tarjeta con MotionItem ---
            <MotionItem key={project.title}>
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="p-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </div>
      </div>
    </section>
  );
};
