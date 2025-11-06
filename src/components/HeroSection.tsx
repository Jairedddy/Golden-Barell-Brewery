import React from 'react';
import { ArrowDown, Award, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-brewery.jpg';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, float } from '@/lib/animations';

const HeroSection: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img 
          src={heroImage} 
          alt="Golden Barrel Brewery interior with gleaming copper tanks and warm ambient lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 brewing-container text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Main Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="heading-display text-foreground mb-6">
              Crafting Excellence
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Since 2018
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <p className="text-elegant text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Where traditional brewing meets culinary artistry. Experience handcrafted beers, 
              farm-to-table cuisine, and the warm hospitality that makes Golden Barrel a cornerstone 
              of our community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={float}
      >
        <button
          onClick={() => scrollToSection('#about')}
          className="text-primary hover:text-primary/80 transition-colors duration-200"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;