import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Beer {
  name: string;
  style: string;
  abv: string;
  description: string;
}

const featuredBeers: Beer[] = [
  {
    name: 'Golden Barrel Lager',
    style: 'Crisp Lager',
    abv: '4.8%',
    description: 'Our signature crisp lager with honey notes and a smooth finish.',
  },
  {
    name: 'Copper Creek IPA',
    style: 'India Pale Ale',
    abv: '6.2%',
    description: 'Hoppy India Pale Ale bursting with citrus and pine aromatics.',
  },
  {
    name: 'Midnight Porter',
    style: 'Rich Porter',
    abv: '5.5%',
    description: 'Rich, dark porter with decadent chocolate and coffee undertones.',
  },
  {
    name: 'Harvest Wheat',
    style: 'Wheat Beer',
    abv: '4.5%',
    description: 'Light and refreshing wheat beer with subtle spice notes and citrus.',
  },
];

/**
 * NowPouringCard - Micro-card showing what's currently on tap
 * Features rotating highlights of featured beers
 */
const NowPouringCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate every 4 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredBeers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentBeer = featuredBeers[currentIndex];

  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-card/95 backdrop-blur-md border border-primary/20 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Gold accent border on hover */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Droplet className="h-4 w-4 text-primary" />
        </motion.div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Now Pouring
        </span>
      </div>

      {/* Beer Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            {currentBeer.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{currentBeer.style}</span>
            <span className="text-xs text-primary font-medium">•</span>
            <span className="text-sm text-primary font-medium">{currentBeer.abv} ABV</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {currentBeer.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {featuredBeers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`View ${featuredBeers[index].name}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToMenu}
          className="text-primary hover:text-primary/80 hover:bg-primary/10 h-8 px-3"
        >
          View Menu
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default NowPouringCard;

