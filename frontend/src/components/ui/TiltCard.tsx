import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Tarjeta con inclinación 3D suave que sigue al cursor.
 * Se desactiva automáticamente en dispositivos táctiles y con prefers-reduced-motion.
 */
export const TiltCard = ({
  children,
  className,
  maxTilt = 10,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 280, damping: 28, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 280, damping: 28, mass: 0.5 });

  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || reduce) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, reduce]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        className={className}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    </div>
  );
};
