import React, { useState, useEffect } from 'react';
import { Clock, Users, Music, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { isOpenNow, getTodaysHours } from '@/lib/hours';

type CrowdLevel = 'quiet' | 'moderate' | 'busy' | 'very-busy';

interface LiveEvent {
  title: string;
  time: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ExperienceBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [crowdLevel, setCrowdLevel] = useState<CrowdLevel>('moderate');
  const [liveEvent, setLiveEvent] = useState<LiveEvent | null>(null);

  useEffect(() => {
    // Check for events happening today
    checkForLiveEvents();
    
    // Update crowd level based on time of day (heuristic)
    updateCrowdLevel();
    
    // Update every hour
    const interval = setInterval(() => {
      updateCrowdLevel();
      checkForLiveEvents();
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  const checkForLiveEvents = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinutes;

    // Check for weekly events
    // Wednesday Trivia Night: 7:00 PM - 9:00 PM
    if (dayOfWeek === 3) {
      const eventStart = 19 * 60; // 7:00 PM
      const eventEnd = 21 * 60; // 9:00 PM
      if (currentTime >= eventStart - 60 && currentTime <= eventEnd) {
        setLiveEvent({
          title: 'Trivia Night',
          time: '7:00 PM - 9:00 PM',
        });
        return;
      }
    }

    // Sunday Live Jazz Brunch: 11:00 AM - 3:00 PM
    if (dayOfWeek === 0) {
      const eventStart = 11 * 60; // 11:00 AM
      const eventEnd = 15 * 60; // 3:00 PM
      if (currentTime >= eventStart - 60 && currentTime <= eventEnd) {
        setLiveEvent({
          title: 'Live Jazz Brunch',
          time: '11:00 AM - 3:00 PM',
        });
        return;
      }
    }

    // Saturday Brewery Tours: 2:00 PM & 4:00 PM
    if (dayOfWeek === 6) {
      const tour1 = 14 * 60; // 2:00 PM
      const tour2 = 16 * 60; // 4:00 PM
      if (
        (currentTime >= tour1 - 30 && currentTime <= tour1 + 60) ||
        (currentTime >= tour2 - 30 && currentTime <= tour2 + 60)
      ) {
        setLiveEvent({
          title: 'Brewery Tour',
          time: '2:00 PM & 4:00 PM',
        });
        return;
      }
    }

    // Check for specific date events (simplified - you could enhance this with actual event data)
    // For now, we'll just check if it's evening (after 5 PM) and suggest checking events
    if (currentHour >= 17 && currentHour < 22) {
      // Evening hours - could have live music or events
      // This is a placeholder - in a real app, you'd check against actual event dates
    }

    setLiveEvent(null);
  };

  const updateCrowdLevel = () => {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();

    // Heuristic: Busier on weekends and during peak hours
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend
      if (hour >= 12 && hour <= 15) {
        setCrowdLevel('busy'); // Lunch rush
      } else if (hour >= 18 && hour <= 21) {
        setCrowdLevel('very-busy'); // Dinner rush
      } else {
        setCrowdLevel('moderate');
      }
    } else {
      // Weekday
      if (hour >= 12 && hour <= 14) {
        setCrowdLevel('moderate'); // Lunch
      } else if (hour >= 17 && hour <= 20) {
        setCrowdLevel('busy'); // Dinner
      } else {
        setCrowdLevel('quiet');
      }
    }
  };

  const getCrowdLevelLabel = (level: CrowdLevel): string => {
    switch (level) {
      case 'quiet':
        return 'Quiet';
      case 'moderate':
        return 'Moderate';
      case 'busy':
        return 'Busy';
      case 'very-busy':
        return 'Very Busy';
    }
  };

  const getCrowdLevelColor = (level: CrowdLevel): string => {
    switch (level) {
      case 'quiet':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'busy':
        return 'text-orange-500';
      case 'very-busy':
        return 'text-red-500';
    }
  };

  const scrollToSection = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsVisible(false);
  };

  const isOpen = isOpenNow();
  const todaysHours = getTodaysHours();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:z-30 bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
      >
        <div className="brewing-container">
          <div className="flex items-center justify-between py-2 lg:py-3 gap-2 lg:gap-4">
            {/* Left: Status & Hours */}
            <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
              {/* Open/Closed Status */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                  }`}
                />
                <span className="text-xs lg:text-sm font-medium text-foreground whitespace-nowrap">
                  {isOpen ? 'Open' : 'Closed'}
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-muted-foreground flex-shrink-0">
                <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="whitespace-nowrap hidden sm:inline">
                  {todaysHours}
                </span>
                <span className="whitespace-nowrap sm:hidden">
                  {isOpen ? todaysHours.split(' - ')[1] : 'Closed'}
                </span>
              </div>

              {/* Crowd Level */}
              <div className="flex items-center gap-1.5 text-xs lg:text-sm flex-shrink-0 hidden md:flex">
                <Users className={`h-3 w-3 lg:h-4 lg:w-4 ${getCrowdLevelColor(crowdLevel)}`} />
                <span className={`whitespace-nowrap ${getCrowdLevelColor(crowdLevel)}`}>
                  {getCrowdLevelLabel(crowdLevel)}
                </span>
              </div>

              {/* Live Event */}
              {liveEvent && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs lg:text-sm text-primary flex-shrink-0 hidden lg:flex"
                >
                  <Music className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="whitespace-nowrap font-medium">
                    Tonight: {liveEvent.title}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {liveEvent ? (
                <Button
                  size="sm"
                  className="h-7 lg:h-8 text-xs px-3 lg:px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => scrollToSection('#events')}
                >
                  <span className="hidden sm:inline">View Events</span>
                  <span className="sm:hidden">Events</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              ) : isOpen ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 lg:h-8 text-xs px-3 lg:px-4 border-primary text-primary hover:bg-primary/10"
                  onClick={() => scrollToSection('#menu')}
                >
                  <span className="hidden sm:inline">View Menu</span>
                  <span className="sm:hidden">Menu</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="h-7 lg:h-8 text-xs px-3 lg:px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => scrollToSection('#contact')}
                >
                  <span className="hidden sm:inline">Reserve</span>
                  <span className="sm:hidden">Book</span>
                </Button>
              )}

              {/* Close Button */}
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 lg:h-8 lg:w-8 p-0 hover:bg-muted"
                onClick={() => setIsVisible(false)}
                aria-label="Close experience bar"
              >
                <X className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceBar;

