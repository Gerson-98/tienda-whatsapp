// Galería editorial: un proyecto grande protagonista y el resto en mosaico; la imagen lidera.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/sanityClient";
import { logger } from "@/lib/logger";
import type { Project } from "@/types/project";

const EASE = [0.22, 1, 0.36, 1] as const;

// Primer proyecto: grande (2 filas). Siguientes dos: columna derecha. El resto: pares; si sobra uno, ocupa todo el ancho.
const spanFor = (i: number, total: number) => {
  if (i === 0) return "lg:col-span-7 lg:row-span-2";
  if (i <= 2) return "lg:col-span-5";
  const remaining = total - 3;
  const isLastOdd = remaining % 2 === 1 && i === total - 1;
  return isLastOdd ? "lg:col-span-12" : "lg:col-span-6";
};

const Tile = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const reduce = useReducedMotion();
  const featured = index === 0;
  const src = project.imageUrl
    ? urlFor(project.imageUrl).width(featured ? 1400 : 1000).auto("format").quality(80).url()
    : "/images/placeholder.png";

  return (
    <motion.div
      initial={reduce ? false : { clipPath: "inset(14% 6% 14% 6% round 24px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: EASE, delay: (index % 3) * 0.08 }}
      className={`${spanFor(index, total)} group relative min-h-[300px] overflow-hidden rounded-3xl bg-primary/20`}
    >
      <Link
        to="/cotizacion"
        aria-label={`Cotizar un proyecto similar a ${project.name}`}
        className="absolute inset-0 block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary focus-visible:ring-inset"
      >
        <img
          src={src}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.endsWith("/images/placeholder.png")) return;
            img.src = "/images/placeholder.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_40%_6%/0.85)] via-[hsl(215_40%_6%/0.15)] to-transparent transition-opacity duration-500 group-hover:from-[hsl(215_40%_6%/0.92)]" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
          <div className="min-w-0">
            {project.categoryName && (
              <p className="mb-2 text-sm font-medium text-secondary">{project.categoryName}</p>
            )}
            <h3 className={`font-display font-extrabold leading-tight tracking-tight text-white text-balance ${featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
              {project.name}
            </h3>
            <span className="mt-3 block h-[2px] w-0 bg-secondary transition-[width] duration-700 ease-out group-hover:w-24" aria-hidden />
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-all duration-500 group-hover:rotate-0 group-hover:bg-secondary group-hover:text-secondary-foreground md:h-14 md:w-14">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export const ProjectGallery = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const query = `*[_type == "project" && defined(imageUrl)] | order(_createdAt desc)[0...6]{_id, name, description, imageUrl, "categoryName": category->name}`;

    client
      .fetch<Project[]>(query)
      .then((data) => {
        if (active) setProjects(data);
      })
      .catch((error) => {
        if (!active) return;
        logger.error("Error al obtener proyectos para la galería:", error);
        setFetchFailed(true);
        setProjects([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (projects?.length === 0 && !fetchFailed) return null;

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tighter text-balance md:text-6xl">
            Obras que hablan <span className="text-primary">por nosotros</span>
          </h2>
          <Button asChild variant="outline" className="self-start rounded-full md:self-auto">
            <Link to="/proyectos">
              Ver todos los proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {projects === null ? (
          <div className="grid auto-rows-[300px] grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            <div className="animate-pulse rounded-3xl bg-muted lg:col-span-7 lg:row-span-2" />
            <div className="animate-pulse rounded-3xl bg-muted lg:col-span-5" />
            <div className="animate-pulse rounded-3xl bg-muted lg:col-span-5" />
          </div>
        ) : fetchFailed ? (
          <p className="text-muted-foreground">
            No pudimos cargar los proyectos en este momento. Mientras tanto, explora el
            catálogo completo en la sección de proyectos.
          </p>
        ) : (
          <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:auto-rows-[340px] lg:grid-cols-12 lg:gap-5">
            {projects.map((project, i) => (
              <Tile key={project._id} project={project} index={i} total={projects.length} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
