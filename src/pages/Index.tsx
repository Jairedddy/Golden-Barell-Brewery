import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BrewingSection from '@/components/BrewingSection';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import ExperienceBar from '@/components/ExperienceBar';

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <BrewingSection />
      <EventsSection />
      <GallerySection />
      <ContactSection />
      <ExperienceBar />
    </>
  );
};

export default Index;
