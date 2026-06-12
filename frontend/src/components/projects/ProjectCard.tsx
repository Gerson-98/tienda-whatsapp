import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { urlFor } from "@/sanityClient";
import type { Project } from "@/types/project";

export const ProjectCard = ({ project }: { project: Project }) => {
  const imageSrc = project.imageUrl
    ? urlFor(project.imageUrl).width(640).height(360).auto("format").quality(75).url()
    : "/images/placeholder.png";

  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl overflow-hidden border border-border bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
    >
      <Link
        to="/cotizacion"
        aria-label={`Cotizar un proyecto similar a ${project.name}`}
        className="block"
      >
        <div className="relative overflow-hidden">
          <img
            src={imageSrc}
            alt={project.name}
            className="aspect-video object-cover w-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src.endsWith("/images/placeholder.png")) return;
              img.src = "/images/placeholder.png";
            }}
          />
          <div className="absolute inset-0 bg-primary/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="font-display font-bold text-xl mb-3">
              {project.name}
            </h3>
            <span className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 group-hover:underline">
              Cotizar un proyecto similar <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="p-4">
          {project.categoryName && (
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {project.categoryName}
            </span>
          )}
          <h3 className="font-display font-semibold mt-1">{project.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
};
