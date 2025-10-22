import React from "react";
import { motion } from "framer-motion";

const fadeInStagger = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      staggerChildren: 0.15,
    },
  },
};

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  animateOnLoad?: boolean; // <-- Nueva prop opcional
}

export const MotionSection = ({
  children,
  className,
  animateOnLoad = false,
}: MotionSectionProps) => {
  // <-- Valor por defecto es false
  return (
    <motion.div
      className={className}
      variants={fadeInStagger}
      initial="hidden"
      // --- Lógica condicional para el trigger ---
      animate={animateOnLoad ? "visible" : undefined} // Anima al cargar si es true
      whileInView={!animateOnLoad ? "visible" : undefined} // Anima al ver si es false
      // --- Lógica condicional para la repetición ---
      viewport={{ once: animateOnLoad, amount: 0.2 }} // Repite solo si NO es animateOnLoad
    >
      {children}
    </motion.div>
  );
};

// MotionItem no necesita cambios
export const MotionItem = ({ children, className }: MotionSectionProps) => {
  return (
    <motion.div variants={fadeInStagger} className={className}>
      {children}
    </motion.div>
  );
};
