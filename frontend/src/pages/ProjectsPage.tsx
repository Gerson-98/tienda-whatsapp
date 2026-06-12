// frontend/src/pages/ProjectsPage.tsx

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { client } from "@/sanityClient";
import { logger } from "@/lib/logger";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCardSkeleton";
import { useHeroImage } from "@/lib/siteSettings";
import type { Project } from "@/types/project";

export const ProjectsPage = () => {
  const heroImage = useHeroImage("heroProjectsImage", "/images/hero/projects-hero.jpg");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const projectsQuery = `*[_type == "project"]{_id, name, description, imageUrl, "categoryName": category->name} | order(_createdAt asc)`;
        const categoriesQuery = `*[_type == "projectCategory"]{name} | order(name asc)`;
        const [projects, projectCategories] = await Promise.all([
          client.fetch<Project[]>(projectsQuery),
          client.fetch<{ name: string }[]>(categoriesQuery),
        ]);
        setAllProjects(projects);
        setCategories(projectCategories.map((c) => c.name));
      } catch (error) {
        logger.error("Error al obtener los proyectos:", error);
        setAllProjects([]);
        setErrorMessage(
          "Los proyectos no están disponibles en este momento. Contáctanos directamente."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [retryCount]);

  const filteredProjects = useMemo(() => {
    if (activeCategories.length === 0) return allProjects;
    return allProjects.filter(
      (p) => p.categoryName !== null && activeCategories.includes(p.categoryName)
    );
  }, [allProjects, activeCategories]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const hasActiveFilters = activeCategories.length > 0;

  const clearFilters = () => {
    setActiveCategories([]);
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
            Nuestros <span className="text-secondary">proyectos</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Calidad, diseño y eficiencia que transforman espacios reales.
          </p>
        </div>
      </div>

      {/* GALERÍA */}
      <div className="container mx-auto py-20">
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
            <button
              onClick={() => setActiveCategories([])}
              aria-pressed={activeCategories.length === 0}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                activeCategories.length === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              Todos
            </button>
            {categories.map((category) => {
              const isActive = activeCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {!isLoading && !errorMessage && (
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground mb-10">
            <span>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "proyecto encontrado" : "proyectos encontrados"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : errorMessage ? (
          <ErrorState
            title="Los proyectos no están disponibles en este momento"
            description={errorMessage}
            onRetry={() => setRetryCount((c) => c + 1)}
          />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={Images}
            title="No encontramos proyectos"
            description="Prueba con otra categoría."
            action={
              hasActiveFilters ? (
                <Button variant="outline" className="rounded-full" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  Limpiar filtros
                </Button>
              ) : undefined
            }
          />
        ) : (
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto pb-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
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
