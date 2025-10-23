// src/components/motion/FadeInSection.tsx

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion"; // <-- Importamos 'Variants'

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  animateOnLoad?: boolean;
}

// --- CAMBIO CLAVE: Tipamos explícitamente las variantes ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const MotionSection = ({
  children,
  className,
  animateOnLoad = false,
}: FadeInSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={sectionVariants} // <-- Usamos las variantes tipadas
      initial="hidden"
      animate={animateOnLoad || isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export const MotionItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
