import React, { ReactNode } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionInViewProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  /**
   * Threshold for intersection observer (0-1)
   * @default 0.15
   */
  threshold?: number;
  /**
   * Root margin for intersection observer
   * @default '0px 0px -15% 0px'
   */
  rootMargin?: string;
  /**
   * Whether to trigger animation only once
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Initial delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Custom transition duration override
   */
  duration?: number;
}

/**
 * MotionInView - Consistent scroll-triggered animation wrapper
 * 
 * A unified component for elements that animate when they enter the viewport.
 * Handles reduced motion preferences automatically and provides consistent
 * animation patterns across the application.
 * 
 * @example
 * <MotionInView>
 *   <div>This will fade in from bottom when scrolled into view</div>
 * </MotionInView>
 * 
 * @example
 * <MotionInView variants={fadeInLeft} delay={0.2}>
 *   <div>Custom animation with delay</div>
 * </MotionInView>
 */
const MotionInView: React.FC<MotionInViewProps> = ({
  children,
  variants = fadeInUp,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -15% 0px',
  triggerOnce = true,
  delay = 0,
  duration,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    threshold,
    rootMargin,
    once: triggerOnce,
  });
  const prefersReducedMotion = useReducedMotion();

  // Merge custom delay/duration into variants if provided
  const finalVariants = React.useMemo(() => {
    if (prefersReducedMotion) {
      // Return instant variants for reduced motion
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    if (delay > 0 || duration !== undefined) {
      // Clone variants and merge transition
      const baseVariants = { ...variants };
      if (baseVariants.visible && typeof baseVariants.visible === 'object') {
        baseVariants.visible = {
          ...baseVariants.visible,
          transition: {
            ...(baseVariants.visible.transition || {}),
            ...(delay > 0 && { delay }),
            ...(duration !== undefined && { duration }),
          },
        };
      }
      return baseVariants;
    }

    return variants;
  }, [variants, delay, duration, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={finalVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionInView;

