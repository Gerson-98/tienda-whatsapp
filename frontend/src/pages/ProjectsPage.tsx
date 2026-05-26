// frontend/src/pages/ProjectsPage.tsx

import React, { useState, useEffect } from "react";
import { client, urlFor } from "@/sanityClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  animate,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

// --- Componente de ayuda para los números animados (Sin cambios) ---
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

// --- Tipos para los datos de Sanity (Sin cambios) ---
type Project = {
  _id: string;
  name: string;
  description: string;
  imageUrl: any;
  categoryName: string | null;
};
type Category = {
  _id: string;
  name: string;
};

export const ProjectsPage = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // Estado separado para los proyectos mostrados
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para obtener los datos de Sanity una sola vez al cargar la página
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const projectsQuery = `*[_type == "project"]{_id, name, description, imageUrl, "categoryName": category->name} | order(_createdAt asc)`;
        const categoriesQuery = `*[_type == "projectCategory"]{_id, name} | order(name asc)`;

        const [sanityProjects, sanityCategories] = await Promise.all([
          client.fetch(projectsQuery),
          client.fetch(categoriesQuery),
        ]);

        setAllProjects(sanityProjects);
        setCategories(sanityCategories);
      } catch (error) {
        console.error("Error al obtener los datos de Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // --- LÓGICA DE FILTRADO MEJORADA Y ROBUSTA ---
  // Este efecto se ejecuta cada vez que cambia la categoría activa o la lista principal de proyectos.
  useEffect(() => {
    if (activeCategory === "Todos") {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(
        (project) => project.categoryName === activeCategory
      );
      setFilteredProjects(filtered);
    }
  }, [activeCategory, allProjects]);

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

      {/* SECCIÓN ESTADÍSTICAS (Sin cambios) */}
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

      {/* SECCIÓN GALERÍA Y FILTROS */}
      <div className="container py-20">
        {!isLoading && (
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <Button
              variant={activeCategory === "Todos" ? "default" : "secondary"}
              onClick={() => setActiveCategory("Todos")}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={
                  activeCategory === category.name ? "default" : "secondary"
                }
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-64 bg-muted animate-pulse" />
                  <CardHeader>
                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted animate-pulse rounded-md mb-2" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                  </CardContent>
                </Card>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <MotionItem key={project._id}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader className="p-0">
                      {project.imageUrl && (
                        <img
                          src={urlFor(project.imageUrl)
                            .width(400)
                            .height(300)
                            .url()}
                          alt={project.name}
                          className="w-full h-64 object-cover"
                        />
                      )}
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
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                <p>No hay proyectos para mostrar en esta categoría.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECCIÓN CALL TO ACTION (Sin cambios) */}
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
