import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, y = 30, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
