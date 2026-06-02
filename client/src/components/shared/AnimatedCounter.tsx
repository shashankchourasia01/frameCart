import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ value, prefix = '', className }: AnimatedCounterProps) {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}`);
  const [text, setText] = useState(`${prefix}${value}`);

  useEffect(() => {
    spring.set(value);
    const unsub = display.on('change', (v) => setText(v));
    return unsub;
  }, [value, spring, display, prefix]);

  return (
    <motion.span className={className} key={value}>
      {text}
    </motion.span>
  );
}
