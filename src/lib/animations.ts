import { Variants, Transition } from 'framer-motion';
import {
  motionDurations,
  motionDelays,
  motionEasings,
  motionStagger,
  motionDistances,
  motionScales,
  motionOpacity,
  motionTransitions,
  motionReduced,
} from './motion-tokens';

/**
 * Creates a transition object with reduced motion support
 */
const createTransition = (
  duration: number = motionDurations.base,
  ease: typeof motionEasings.standard | string = motionEasings.standard,
  delay: number = motionDelays.none,
  reducedDuration: number = motionReduced.duration
): Transition => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return {
    duration: prefersReducedMotion ? reducedDuration : duration,
    ease: ease,
    delay: prefersReducedMotion ? 0 : delay,
  };
};

/**
 * Creates variants with reduced motion support
 */
const createVariants = (
  hidden: Record<string, any>,
  visible: Record<string, any>,
  transition?: Transition
): Variants => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion) {
    // For reduced motion, make animations instant or minimal
    return {
      hidden: { ...hidden, opacity: motionReduced.opacity.hidden },
      visible: { ...visible, opacity: motionReduced.opacity.visible, transition: { duration: motionReduced.duration } },
    };
  }

  return {
    hidden,
    visible: {
      ...visible,
      transition: transition || motionTransitions.base,
    },
  };
};

// ============================================================================
// ENTER ANIMATIONS (Elements entering viewport)
// ============================================================================

/**
 * Fade in from bottom
 */
export const fadeInUp: Variants = createVariants(
  { opacity: motionOpacity.hidden, y: motionDistances.base },
  { opacity: motionOpacity.visible, y: 0 },
  createTransition(motionDurations.base, motionEasings.standard)
);

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = createVariants(
  { opacity: motionOpacity.hidden, x: -motionDistances.base },
  { opacity: motionOpacity.visible, x: 0 },
  createTransition(motionDurations.base, motionEasings.standard)
);

/**
 * Fade in from right
 */
export const fadeInRight: Variants = createVariants(
  { opacity: motionOpacity.hidden, x: motionDistances.base },
  { opacity: motionOpacity.visible, x: 0 },
  createTransition(motionDurations.base, motionEasings.standard)
);

/**
 * Fade in from top
 */
export const fadeInDown: Variants = createVariants(
  { opacity: motionOpacity.hidden, y: -motionDistances.base },
  { opacity: motionOpacity.visible, y: 0 },
  createTransition(motionDurations.base, motionEasings.standard)
);

/**
 * Scale in (zoom effect)
 */
export const scaleIn: Variants = createVariants(
  { opacity: motionOpacity.hidden, scale: motionScales.hidden },
  { opacity: motionOpacity.visible, scale: motionScales.visible },
  createTransition(motionDurations.base, motionEasings.enter)
);

/**
 * Fade in only (no movement)
 */
export const fadeIn: Variants = createVariants(
  { opacity: motionOpacity.hidden },
  { opacity: motionOpacity.visible },
  createTransition(motionDurations.base, motionEasings.standard)
);

// ============================================================================
// STAGGER ANIMATIONS (For containers with multiple children)
// ============================================================================

/**
 * Stagger container - base timing
 */
export const staggerContainer: Variants = {
  hidden: { opacity: motionOpacity.hidden },
  visible: {
    opacity: motionOpacity.visible,
    transition: {
      staggerChildren: motionStagger.base,
      delayChildren: motionDelays.small,
    },
  },
};

/**
 * Stagger container - tight timing
 */
export const staggerContainerTight: Variants = {
  hidden: { opacity: motionOpacity.hidden },
  visible: {
    opacity: motionOpacity.visible,
    transition: {
      staggerChildren: motionStagger.tight,
      delayChildren: motionDelays.tiny,
    },
  },
};

/**
 * Stagger container - relaxed timing
 */
export const staggerContainerRelaxed: Variants = {
  hidden: { opacity: motionOpacity.hidden },
  visible: {
    opacity: motionOpacity.visible,
    transition: {
      staggerChildren: motionStagger.relaxed,
      delayChildren: motionDelays.medium,
    },
  },
};

// ============================================================================
// HOVER & INTERACTION ANIMATIONS
// ============================================================================

/**
 * Hover scale effect
 */
export const hoverScale = {
  scale: motionScales.hover,
  transition: createTransition(motionDurations.fast, motionEasings.standard),
};

/**
 * Hover lift effect (scale + translate)
 */
export const hoverLift = {
  y: -8,
  scale: motionScales.lift,
  transition: createTransition(motionDurations.fast, motionEasings.standard),
};

/**
 * Tap/press effect
 */
export const tapScale = {
  scale: motionScales.tap,
  transition: createTransition(motionDurations.fast, motionEasings.standard),
};

/**
 * Rotation on hover (subtle)
 */
export const hoverRotate = {
  rotate: [0, -5, 5, -5, 0],
  transition: createTransition(0.5, motionEasings.easeInOut),
};

// ============================================================================
// CONTINUOUS ANIMATIONS
// ============================================================================

/**
 * Floating animation (subtle vertical movement)
 */
export const float = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: motionEasings.easeInOut,
  },
};

/**
 * Shimmer effect (loading/skeleton)
 */
export const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '200%',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: motionEasings.linear,
      repeatDelay: 1,
    },
  },
};

// ============================================================================
// PAGE & ROUTE TRANSITIONS
// ============================================================================

/**
 * Page transition (fade + slide)
 */
export const pageTransition: Variants = {
  hidden: { 
    opacity: motionOpacity.hidden, 
    y: motionDistances.small 
  },
  visible: { 
    opacity: motionOpacity.visible, 
    y: 0,
    transition: createTransition(motionDurations.base, motionEasings.enter),
  },
  exit: { 
    opacity: motionOpacity.hidden,
    y: -motionDistances.small,
    transition: createTransition(motionDurations.fast, motionEasings.exit),
  },
};

// ============================================================================
// EXPORT MOTION TOKENS FOR DIRECT USE
// ============================================================================

export {
  motionDurations,
  motionDelays,
  motionEasings,
  motionStagger,
  motionDistances,
  motionScales,
  motionOpacity,
  motionTransitions,
  motionReduced,
};
