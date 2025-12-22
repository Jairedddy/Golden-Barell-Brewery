import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RouteTransitionsProps {
  children: ReactNode;
}

// Store scroll positions per route
const scrollPositions = new Map<string, number>();

/**
 * RouteTransitions - Cinematic route transition wrapper
 * 
 * Provides smooth, polished transitions between routes with:
 * - Fade + slight blur overlay during transition
 * - Respects prefers-reduced-motion
 * - Preserves scroll position correctly
 * - Accessible (no focus trapping)
 * 
 * @example
 * <RouteTransitions>
 *   <Routes>
 *     <Route path="/" element={<Index />} />
 *     <Route path="/gallery" element={<Gallery />} />
 *   </Routes>
 * </RouteTransitions>
 */
const RouteTransitions: React.FC<RouteTransitionsProps> = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const previousPathname = useRef(location.pathname);

  // Handle scroll preservation
  useEffect(() => {
    // Skip on initial mount
    if (previousPathname.current === location.pathname) {
      return;
    }

    // Save scroll position of previous route
    if (previousPathname.current) {
      scrollPositions.set(previousPathname.current, window.scrollY);
    }

    // Restore scroll position for returning routes, or scroll to top for new routes
    const savedPosition = scrollPositions.get(location.pathname);
    
    // Use a small delay to ensure DOM is ready after route transition
    const timeoutId = setTimeout(() => {
      if (savedPosition !== undefined) {
        window.scrollTo({ top: savedPosition, behavior: 'instant' });
      } else {
        // New route - scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 100);

    previousPathname.current = location.pathname;

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Handle transition overlay
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Slightly longer than page transition

    return () => clearTimeout(timer);
  }, [location.pathname, prefersReducedMotion]);

  // For reduced motion, skip animations entirely
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Transition Overlay - fade + blur */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 pointer-events-none bg-background/20"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Route Content with Transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default RouteTransitions;

