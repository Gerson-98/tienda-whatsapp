// src/pages/ProjectsPage.tsx

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// --- CAMBIO 1: Consolidamos todas las importaciones de 'framer-motion' en una sola línea ---
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useTransform,
  useMotionValue,
} from "framer-motion";

type Project = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  projectCategory: {
    name: string;
  };
};

// --- CAMBIO 2: Movemos el componente AnimatedCounter fuera de ProjectsPage (mejor práctica) ---
const AnimatedCounter = ({ to }: { to: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-US")
  );
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const ProjectsPage = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/projects");
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data: Project[] = await response.json();
        setAllProjects(data);
        const uniqueCategories = [
          "Todos",
          ...new Set(data.map((p) => p.projectCategory.name)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "Todos"
      ? allProjects
      : allProjects.filter((p) => p.projectCategory.name === activeCategory);

  return (
    <main className="-mt-16">
      {/* SECCIÓN HERO (Sin cambios) */}
      <div
        className="relative z-[-1] h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/projects-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white container pt-16">
          <h1 className="text-4xl md:text-5xl font-bold">Nuestros Proyectos</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg md:text-xl">
            Explora una selección de nuestro trabajo, donde la calidad, el
            diseño y la eficiencia se unen para crear espacios excepcionales.
          </p>
        </div>
      </div>

      {/* SECCIÓN ESTADÍSTICAS (Con los números correctos) */}
      <div className="bg-muted">
        <MotionSection className="container py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <MotionItem>
              <h3 className="text-4xl font-bold text-primary">
                +<AnimatedCounter to={200} />
              </h3>
              <p className="text-muted-foreground mt-2">
                Proyectos Completados
              </p>
            </MotionItem>
            <MotionItem>
              <h3 className="text-4xl font-bold text-primary">
                +<AnimatedCounter to={6} />
              </h3>
              <p className="text-muted-foreground mt-2">Años de Experiencia</p>
            </MotionItem>
            <MotionItem>
              <h3 className="text-4xl font-bold text-primary">
                <AnimatedCounter to={100} />%
              </h3>
              <p className="text-muted-foreground mt-2">
                Satisfacción del Cliente
              </p>
            </MotionItem>
            <MotionItem>
              <h3 className="text-4xl font-bold text-primary">
                +<AnimatedCounter to={5000} />
              </h3>
              <p className="text-muted-foreground mt-2">Ventanas Instaladas</p>
            </MotionItem>
          </div>
        </MotionSection>
      </div>

      {/* SECCIÓN FILTROS Y GALERÍA (Sin cambios) */}
      <div className="container py-20">
        {isLoading ? (
          <div className="text-center">Cargando proyectos...</div>
        ) : (
          <>
            <div className="flex justify-center flex-wrap gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    activeCategory === category ? "default" : "secondary"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <MotionSection key={activeCategory} animateOnLoad={true}>
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <MotionItem key={project.id}>
                      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                        <CardHeader className="p-0">
                          <img
                            src={project.imageUrl || "/images/placeholder.png"}
                            alt={project.name}
                            className="w-full h-64 object-cover"
                          />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                          <CardTitle>{project.name}</CardTitle>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {project.description}
                          </p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button asChild className="w-full">
                            <Link to="/cotizacion">Cotizar este estilo</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </MotionItem>
                  ))}
                </div>
              </AnimatePresence>
            </MotionSection>
          </>
        )}
      </div>

      {/* --- CAMBIO 3: Restauramos la sección "Call to Action" y eliminamos las estadísticas duplicadas --- */}
      <div className="bg-muted">
        <MotionSection className="container py-20 text-center">
          <MotionItem>
            <h2 className="text-3xl font-bold mb-4">
              ¿Viste algo que te inspiró?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Hagamos realidad tu proyecto. Contáctanos hoy para una asesoría
              gratuita y sin compromiso.
            </p>
          </MotionItem>
          <MotionItem>
            <Button size="lg" asChild>
              <Link to="/cotizacion">Iniciar mi Cotización</Link>
            </Button>
          </MotionItem>
        </MotionSection>
      </div>
    </main>
  );
};
