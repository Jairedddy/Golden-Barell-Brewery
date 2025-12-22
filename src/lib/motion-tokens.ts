/**
 * Motion Tokens - Centralized motion design system
 * 
 * Defines consistent durations, delays, and easing curves for all animations
 * across the application. This ensures animations feel intentional and cohesive.
 */

/**
 * Duration tokens (in seconds)
 * - Fast: Quick micro-interactions (hover, tap)
 * - Base: Standard animations (fade in, slide)
 * - Slow: Deliberate, cinematic transitions
 */
export const motionDurations = {
  fast: 0.2,
  base: 0.6,
  slow: 1.0,
  slower: 1.5,
} as const;

/**
 * Delay tokens (in seconds)
 * - Used for staggered animations and sequential reveals
 */
export const motionDelays = {
  none: 0,
  tiny: 0.1,
  small: 0.2,
  medium: 0.3,
  large: 0.5,
} as const;

/**
 * Easing curves
 * - Standard: Primary easing for most animations (smooth, natural)
 * - Enter: For elements entering the viewport (slight anticipation)
 * - Exit: For elements leaving (quick, clean)
 * - Bounce: Playful, elastic feel (use sparingly)
 */
export const motionEasings = {
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number], // Custom cubic-bezier
  enter: [0.16, 1, 0.3, 1] as [number, number, number, number],
  exit: [0.7, 0, 0.84, 0] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  easeInOut: 'easeInOut' as const,
  easeOut: 'easeOut' as const,
  easeIn: 'easeIn' as const,
  linear: 'linear' as const,
} as const;

/**
 * Stagger timing
 * - Controls delay between child animations in staggered containers
 */
export const motionStagger = {
  tight: 0.04,
  base: 0.06,
  relaxed: 0.1,
  loose: 0.15,
} as const;

/**
 * Distance tokens (in pixels)
 * - Standard movement distances for slide/fade animations
 */
export const motionDistances = {
  small: 20,
  base: 30,
  large: 50,
  xl: 80,
} as const;

/**
 * Scale tokens
 * - Standard scale values for zoom/scale animations
 */
export const motionScales = {
  hidden: 0.8,
  visible: 1,
  hover: 1.05,
  tap: 0.95,
  lift: 1.02,
} as const;

/**
 * Opacity tokens
 */
export const motionOpacity = {
  hidden: 0,
  visible: 1,
  subtle: 0.6,
  muted: 0.4,
} as const;

/**
 * Transition presets
 * - Pre-configured transition objects for common use cases
 */
export const motionTransitions = {
  fast: {
    duration: motionDurations.fast,
    ease: motionEasings.standard,
  },
  base: {
    duration: motionDurations.base,
    ease: motionEasings.standard,
  },
  slow: {
    duration: motionDurations.slow,
    ease: motionEasings.standard,
  },
  enter: {
    duration: motionDurations.base,
    ease: motionEasings.enter,
  },
  exit: {
    duration: motionDurations.fast,
    ease: motionEasings.exit,
  },
} as const;

/**
 * Reduced motion overrides
 * - When prefers-reduced-motion is enabled, use instant or minimal animations
 */
export const motionReduced = {
  duration: 0.01, // Near-instant, but not 0 to avoid layout issues
  distance: 0,
  scale: 1,
  opacity: {
    hidden: 1, // No opacity change
    visible: 1,
  },
} as const;

