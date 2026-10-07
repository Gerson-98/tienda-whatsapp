import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  /** Delay de inicio en segundos */
  delay?: number;
  /** Duración por palabra en segundos */
  duration?: number;
  /** Stagger entre palabras */
  stagger?: number;
}

/**
 * Revela texto palabra por palabra con efecto "persiana".
 * Cada palabra se desliza hacia arriba desde detrás de un clip invisible.
 */
export const SplitText = ({
  children,
  className,
  delay = 0,
  duration = 0.55,
  stagger = 0.055,
}: SplitTextProps) => {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden leading-[1.15]"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
