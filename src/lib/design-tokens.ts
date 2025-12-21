/**
 * Golden Barrel Brewery - "Liquid Gold" Design System Tokens
 * 
 * A comprehensive design token system that defines the visual identity
 * of the Golden Barrel Brewery brand. These tokens ensure consistency
 * across all components and create a premium, cohesive experience.
 */

// ============================================================================
// Color Palette - Liquid Gold Brand
// ============================================================================

export const colors = {
  // Primary Brand Colors
  gold: {
    50: 'hsl(45, 100%, 95%)',
    100: 'hsl(45, 95%, 90%)',
    200: 'hsl(45, 90%, 80%)',
    300: 'hsl(45, 85%, 70%)',
    400: 'hsl(45, 85% 60%)',  // Main gold
    500: 'hsl(45, 85%, 60%)', // Primary gold
    600: 'hsl(40, 80%, 55%)', // Rich gold
    700: 'hsl(40, 75%, 50%)', // Deep gold
    800: 'hsl(35, 70%, 45%)', // Dark gold
    900: 'hsl(30, 65%, 40%)', // Charcoal gold
  },
  
  amber: {
    50: 'hsl(30, 100%, 95%)',
    100: 'hsl(30, 95%, 90%)',
    200: 'hsl(30, 90%, 80%)',
    300: 'hsl(30, 85%, 70%)',
    400: 'hsl(30, 80%, 60%)',
    500: 'hsl(30, 80%, 55%)', // Primary amber
    600: 'hsl(30, 75%, 50%)',
    700: 'hsl(25, 70%, 45%)',
    800: 'hsl(25, 65%, 40%)',
    900: 'hsl(20, 60%, 35%)',
  },
  
  charcoal: {
    50: 'hsl(25, 15%, 20%)',
    100: 'hsl(25, 15%, 18%)',
    200: 'hsl(25, 15%, 15%)',
    300: 'hsl(25, 15%, 12%)',
    400: 'hsl(25, 15%, 10%)',
    500: 'hsl(25, 15%, 8%)',  // Main background
    600: 'hsl(25, 15%, 6%)',
    700: 'hsl(25, 15%, 5%)',
    800: 'hsl(25, 15%, 4%)',
    900: 'hsl(25, 15%, 3%)',
  },
  
  // Semantic Colors
  copper: 'hsl(20, 70%, 50%)',
  bronze: 'hsl(25, 60%, 45%)',
} as const;

// ============================================================================
// Spacing Scale
// ============================================================================

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
} as const;

// ============================================================================
// Border Radius
// ============================================================================

export const radii = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ============================================================================
// Shadows & Elevation
// ============================================================================

export const shadows = {
  sm: '0 2px 8px -2px rgba(0, 0, 0, 0.2)',
  md: '0 4px 20px -4px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 30px -10px hsl(40, 80%, 55% / 0.3)',
  xl: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
  
  // Brand-specific shadows
  gold: {
    sm: '0 2px 8px -2px hsl(45, 85%, 60% / 0.2)',
    md: '0 4px 16px -4px hsl(45, 85%, 60% / 0.3)',
    lg: '0 10px 30px -10px hsl(45, 85%, 60% / 0.4)',
    glow: '0 0 40px hsl(45, 85%, 60% / 0.4)',
    'glow-lg': '0 0 60px hsl(45, 85%, 60% / 0.5)',
  },
} as const;

// ============================================================================
// Typography Scale
// ============================================================================

export const typography = {
  fontFamily: {
    display: ['Playfair Display', 'serif'],
    body: ['Inter', 'sans-serif'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// Motion & Transitions
// ============================================================================

export const motion = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// Z-Index Scale
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ============================================================================
// Breakpoints (matching Tailwind defaults)
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// Export Type Definitions
// ============================================================================

export type ColorToken = typeof colors;
export type SpacingToken = typeof spacing;
export type RadiiToken = typeof radii;
export type ShadowToken = typeof shadows;
export type TypographyToken = typeof typography;
export type MotionToken = typeof motion;

