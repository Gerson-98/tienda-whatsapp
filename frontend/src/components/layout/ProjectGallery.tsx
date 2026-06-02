import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
    description: "Puertas corredizas de PVC para un acceso suave.",
    imageUrl: "/images/projects/dormitorio-balcon.jpg",
  },
  {
    title: "Ambiente Acogedor",
    description: "Aislamiento superior para un confort inigualable.",
    imageUrl: "/images/projects/sala-acogedora.jpg",
  },
];

export const ProjectGallery = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Portafolio
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-tighter">
              Proyectos <span className="text-gradient">recientes</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full self-start md:self-auto">
            <Link to="/proyectos">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={reduce ? undefined : fadeUp}
              className="group rounded-2xl overflow-hidden border border-border bg-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="font-display font-bold text-xl mb-3">
                    {p.title}
                  </h3>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
