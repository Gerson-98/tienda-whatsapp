// src/components/motion/FadeInSection.tsx

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  animateOnLoad?: boolean;
}

// Variantes estándar — tween rápido, y pequeño, stagger ajustado
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// Variantes sin movimiento para prefers-reduced-motion
const reducedSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.04 } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const MotionSection = ({
  children,
  className,
  animateOnLoad = false,
}: FadeInSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={prefersReduced ? reducedSectionVariants : sectionVariants}
      initial="hidden"
      animate={animateOnLoad || isInView ? "visible" : "hidden"}
      style={{ willChange: "opacity" }}
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
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={prefersReduced ? reducedItemVariants : itemVariants}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};
