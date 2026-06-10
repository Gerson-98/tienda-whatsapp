// frontend/src/pages/ProjectsPage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  animate,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { client, urlFor } from "@/sanityClient";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

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

type Project = {
  _id: string;
  name: string;
  description: string;
  imageUrl: any;
  categoryName: string | null;
};
type Category = { _id: string; name: string };

export const ProjectsPage = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const reduce = useReducedMotion();

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

  useEffect(() => {
    if (activeCategory === "Todos") setFilteredProjects(allProjects);
    else
      setFilteredProjects(
        allProjects.filter((p) => p.categoryName === activeCategory)
      );
  }, [activeCategory, allProjects]);

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/projects-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Nuestros <span className="text-gradient">proyectos</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Calidad, diseño y eficiencia que transforman espacios reales.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-muted/50 py-16 border-y border-border">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 200, suffix: "+", label: "Proyectos completados" },
            { value: 6, suffix: "+", label: "Años de experiencia" },
            { value: 100, suffix: "%", label: "Satisfacción" },
            { value: 5000, suffix: "+", label: "Ventanas instaladas" },
          ].map((s) => (
            <div key={s.label}>
              <h3 className="font-display font-black text-4xl md:text-5xl text-primary tracking-tighter">
                {s.suffix === "+" && "+"}
                <AnimatedCounter to={s.value} />
                {s.suffix === "%" && "%"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GALERÍA */}
      <div className="container mx-auto py-20">
        {!isLoading && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10">
            <button
              onClick={() => setActiveCategory("Todos")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === "Todos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category.name)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border overflow-hidden"
                >
                  <div className="aspect-video bg-muted animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={fadeUp}
                  className="group rounded-2xl overflow-hidden border border-border bg-card"
                >
                  <div className="relative overflow-hidden">
                    {project.imageUrl && (
                      <img
                        src={urlFor(project.imageUrl)
                          .width(600)
                          .height(400)
                          .auto("format")
                          .quality(75)
                          .url()}
                        alt={project.name}
                        className="aspect-video object-cover w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                      <h3 className="font-display font-bold text-xl mb-3">
                        {project.name}
                      </h3>
                      <Link
                        to="/cotizacion"
                        className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                      >
                        Cotizar este estilo{" "}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    {project.categoryName && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {project.categoryName}
                      </span>
                    )}
                    <h3 className="font-display font-semibold mt-1">
                      {project.name}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No hay proyectos para mostrar en esta categoría.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="container mx-auto pb-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter mb-4">
            ¿Viste algo que te inspiró?
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto mb-8 font-light">
            Hagamos realidad tu proyecto. Asesoría gratuita y sin compromiso.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/cotizacion">
              Iniciar mi cotización <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
