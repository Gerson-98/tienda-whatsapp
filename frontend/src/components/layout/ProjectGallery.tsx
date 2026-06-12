import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import { client } from "@/sanityClient";
import { logger } from "@/lib/logger";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCardSkeleton";
import type { Project } from "@/types/project";

export const ProjectGallery = () => {
  const reduce = useReducedMotion();
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    let active = true;
    const query = `*[_type == "project" && defined(imageUrl)] | order(_createdAt desc)[0...6]{_id, name, description, imageUrl, "categoryName": category->name}`;

    client
      .fetch<Project[]>(query)
      .then((data) => {
        if (!active) return;
        setProjects(data);
      })
      .catch((error) => {
        if (!active) return;
        logger.error("Error al obtener proyectos para la galería:", error);
        setProjects([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (projects?.length === 0) return null;

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
            Proyectos <span className="text-secondary">recientes</span>
          </h2>
          <Button asChild variant="outline" className="rounded-full self-start md:self-auto">
            <Link to="/proyectos">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {projects === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
