import React, { useRef } from 'react';
import { ArrowDown, Calendar, Utensils, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import NowPouringCard from './NowPouringCard';

const heroImage = "/images/hero-brewery.jpg";

/**
 * HeroCinematic - Cinematic hero section with layered depth and editorial layout
 * Features:
 * - Multi-layer background with gradient scrim and light leak overlay
 * - Editorial headline with highlighted words
 * - Primary CTAs with clear hierarchy
 * - "What's on tap today" micro-card
 * - Subtle parallax effect
 * - Responsive art direction
 */
const HeroCinematic: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth spring animation for parallax to reduce choppiness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  
  // Parallax transforms with smooth spring
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '25%']);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Multi-Layer Background */}
      <div className="absolute inset-0">
        {/* Base Image Layer */}
        <motion.div
          style={{ 
            y: backgroundY,
            willChange: 'transform'
          }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Golden Barrel Brewery interior with gleaming copper tanks and warm ambient lighting"
            className="w-full h-full object-cover object-center md:object-[center_30%]"
            loading="eager"
            style={{ willChange: 'transform' }}
          />
        </motion.div>

        {/* Gradient Scrim Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/70 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/60" />

        {/* Light Leak Overlay - Cinematic Effect */}
        <div className="absolute inset-0 opacity-30">
          {/* Top-right light leak */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(40, 80%, 55% / 0.2) 0%, hsl(40, 80%, 55% / 0.05) 50%, transparent 100%)'
            }}
          />
          {/* Bottom-left light leak */}
          <div 
            className="absolute bottom-0 left-0 w-80 h-80 blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(30, 80%, 55% / 0.15) 0%, hsl(30, 80%, 55% / 0.05) 50%, transparent 100%)'
            }}
          />
          {/* Center glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(40, 80%, 55% / 0.1) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.1) 1px, rgba(255, 255, 255, 0.1) 2px),
              repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.1) 1px, rgba(255, 255, 255, 0.1) 2px)
            `,
            backgroundSize: '2px 2px'
          }}
        />
      </div>

      {/* Content Layer with Parallax */}
      <motion.div
        style={{ 
          y: contentY,
          willChange: 'transform'
        }}
        className="relative z-10 brewing-container w-full"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Subtitle */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
            </motion.div>

            {/* Editorial Headline with Highlighted Words */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <h1 className="heading-display text-foreground mb-4">
                <span className="block">Crafting</span>
                <span className="block relative inline-block">
                  <span className="relative z-10">Excellence</span>
                  {/* Gold highlight marker */}
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-primary/30 -z-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
                <motion.span
                  className="block text-primary mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Since 2018
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
            </motion.div>

            {/* Primary CTAs with Hierarchy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Primary CTA - Reserve a Table */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection('#contact')}
                  className="relative bg-primary text-primary-foreground font-semibold px-8 py-6 text-base shadow-lg overflow-hidden group"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-amber-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                    </motion.div>
                    Reserve a Table
                  </span>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-md blur-xl opacity-0 group-hover:opacity-50 bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              {/* Secondary CTA - View Menu */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('#menu')}
                  className="relative border-2 border-primary/50 text-foreground font-semibold px-8 py-6 text-base backdrop-blur-sm overflow-hidden group"
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-md opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Background fill on hover */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center">
                    <motion.div
                      whileHover={{ rotate: [0, 15, -15, 15, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Utensils className="h-5 w-5 mr-2" />
                    </motion.div>
                    View Menu
                  </span>
                  
                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-md"
                    whileHover={{
                      boxShadow: [
                        '0 0 0 0px rgba(40, 80%, 55%, 0)',
                        '0 0 0 8px rgba(40, 80%, 55%, 0.1)',
                        '0 0 0 16px rgba(40, 80%, 55%, 0)',
                      ],
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={() => scrollToSection('#events')}
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2 group transition-colors duration-200"
              >
                <MapPin className="h-4 w-4" />
                <span>Upcoming Events</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </div>

          {/* Right Column - Now Pouring Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              <NowPouringCard />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCinematic;

