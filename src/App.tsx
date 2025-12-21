import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import BrewingSection from './components/BrewingSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Always apply dark theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <MenuSection />
            <BrewingSection />
            <EventsSection />
            <GallerySection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
