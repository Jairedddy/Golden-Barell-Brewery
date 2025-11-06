import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Gallery image paths served from public
const fermentationTanks = "/images/gallery/fermentation tanks.jpg";
const beerPoured = "/images/gallery/Beer being poured.jpg";
const burgerBeer = "/images/gallery/Burger with Beer.jpg";
const breweryAmbience = "/images/gallery/Brewery ambience.jpg";
const flightBeers = "/images/gallery/Flight of Beers.jpg";
const appetizerPlatter = "/images/gallery/appetizer platter.jpg";
const barrelsTanks = "/images/gallery/Barrels and Tanks.jpg";
const rusticBrewery = "/images/gallery/Rustic Brewery.jpg";
const goldenBeer = "/images/gallery/Golden beer in Glass.jpg";
const grilledSteak = "/images/gallery/Grilled Steak.jpg";
const tapHandles = "/images/gallery/Brewery tap handles.jpg";
const artisanPresentation = "/images/gallery/artian presentation.jpg";
const brewingEquipment = "/images/gallery/24HL brewing equipment.jpg";
const bottles = "/images/gallery/bottles.jpg";
const brewery = "/images/gallery/brewery.jpg";
const brewery2 = "/images/gallery/brewery 2.jpg";
const breweryAmbience2 = "/images/gallery/brewery ambience 2.jpg";
const cheers = "/images/gallery/cheers.jpg";
const cheersFood = "/images/gallery/cheers and food.jpg";
const wedgesBeer = "/images/gallery/wedges and beer.jpg";
const lastImage = "/images/gallery/last.jpg";
const lastSecondImage = "/images/gallery/last second.jpg";

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const headerAnimation = useScrollAnimation();
  const galleryAnimation = useScrollAnimation();

  const galleryImages = [
    // Row 1-2: Large featured image (2x2) + 4 medium images (fills 2 rows perfectly)
    {
      id: 1,
      url: fermentationTanks,
      alt: 'Craft brewery copper fermentation tanks',
      category: 'Brewery',
      size: 'large' // col-span-2 row-span-2 (takes cols 1-2, rows 1-2)
    },
    {
      id: 2,
      url: beerPoured,
      alt: 'Fresh craft beer being poured',
      category: 'Beer',
      size: 'medium' // col 3, row 1
    },
    {
      id: 3,
      url: burgerBeer,
      alt: 'Gourmet burger with craft beer',
      category: 'Food',
      size: 'medium' // col 4, row 1
    },
    {
      id: 4,
      url: flightBeers,
      alt: 'Flight of craft beers',
      category: 'Beer',
      size: 'medium' // col 3, row 2
    },
    {
      id: 5,
      url: goldenBeer,
      alt: 'Golden craft beer in glass',
      category: 'Beer',
      size: 'medium' // col 4, row 2
    },
    // Row 3: 4 medium images
    {
      id: 6,
      url: bottles,
      alt: 'Craft beer bottles collection',
      category: 'Beer',
      size: 'medium'
    },
    {
      id: 7,
      url: cheers,
      alt: 'Friends cheers with craft beers',
      category: 'Social',
      size: 'medium'
    },
    {
      id: 8,
      url: wedgesBeer,
      alt: 'Potato wedges with craft beer',
      category: 'Food',
      size: 'medium'
    },
    {
      id: 9,
      url: cheersFood,
      alt: 'Cheers with food and beer',
      category: 'Social',
      size: 'medium'
    },
    // Row 4: Wide (2x1) + 2 medium
    {
      id: 10,
      url: breweryAmbience,
      alt: 'Brewery restaurant interior ambiance',
      category: 'Venue',
      size: 'wide' // col-span-2
    },
    {
      id: 11,
      url: appetizerPlatter,
      alt: 'Delicious appetizers platter',
      category: 'Food',
      size: 'medium'
    },
    {
      id: 12,
      url: artisanPresentation,
      alt: 'Artisan food presentation',
      category: 'Food',
      size: 'medium'
    },
    // Row 5-6: 2 Tall images (1x2) + 4 medium images
    {
      id: 13,
      url: brewery,
      alt: 'Modern brewery interior',
      category: 'Brewery',
      size: 'tall' // row-span-2, col 1
    },
    {
      id: 14,
      url: barrelsTanks,
      alt: 'Brewery equipment and barrels',
      category: 'Brewery',
      size: 'medium' // col 2, row 5
    },
    {
      id: 15,
      url: grilledSteak,
      alt: 'Grilled steak dinner',
      category: 'Food',
      size: 'tall' // row-span-2, col 3
    },
    {
      id: 16,
      url: tapHandles,
      alt: 'Brewery bar with tap handles',
      category: 'Venue',
      size: 'medium' // col 4, row 5
    },
    {
      id: 17,
      url: brewingEquipment,
      alt: '24HL brewing equipment',
      category: 'Brewery',
      size: 'medium' // col 2, row 6
    },
    {
      id: 18,
      url: brewery2,
      alt: 'Brewery production area',
      category: 'Brewery',
      size: 'medium' // col 4, row 6
    },
    // Row 7: 4 medium images to complete the grid perfectly!
    {
      id: 19,
      url: rusticBrewery,
      alt: 'Rustic brewery restaurant interior',
      category: 'Venue',
      size: 'medium'
    },
    {
      id: 20,
      url: breweryAmbience2,
      alt: 'Cozy brewery atmosphere',
      category: 'Venue',
      size: 'medium'
    },
    {
      id: 21,
      url: lastImage,
      alt: 'Craft brewery experience',
      category: 'Venue',
      size: 'medium'
    },
    {
      id: 22,
      url: lastSecondImage,
      alt: 'Golden Barrel specialty',
      category: 'Beer',
      size: 'medium'
    }
  ];

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(galleryImages[newIndex].id);
  };

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  // Helper function to get grid classes based on image size
  const getGridClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'; // Large featured image
      case 'wide':
        return 'md:col-span-2'; // Wide image
      case 'tall':
        return 'row-span-2'; // Tall image
      case 'medium':
      default:
        return ''; // Normal size
    }
  };

  const getHeightClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-full min-h-[400px]';
      case 'tall':
        return 'h-full min-h-[400px]';
      case 'wide':
        return 'h-64';
      case 'medium':
      default:
        return 'h-64';
    }
  };

  return (
    <section id="gallery" className="section-padding bg-muted/30">
      <div className="brewing-container">
        {/* Section Header */}
        <motion.div 
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-6">
            Gallery
          </h2>
          <p className="text-elegant text-muted-foreground max-w-3xl mx-auto">
            Step inside Golden Barrel through our lens. From our gleaming copper tanks to mouthwatering dishes 
            and the warm atmosphere that makes us special, discover what awaits you.
          </p>
        </motion.div>

        {/* Gallery Grid - Collage Style */}
        <motion.div 
          ref={galleryAnimation.ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4"
          initial="hidden"
          animate={galleryAnimation.isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${getGridClasses(image.size)}`}
              onClick={() => openLightbox(image.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={galleryAnimation.isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${getHeightClasses(image.size)}`}>
                <motion.img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.span 
                      className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {image.category}
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Follow us on social media for more behind-the-scenes content and updates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#" 
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              @goldenbarrelbrewery
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="#" 
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              #CraftedAtGoldenBarrel
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors duration-200 z-10"
              aria-label="Close lightbox"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-8 w-8" />
            </motion.button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 text-white hover:text-primary transition-colors duration-200 z-10 hidden md:block"
            aria-label="Previous image"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 text-white hover:text-primary transition-colors duration-200 z-10 hidden md:block"
            aria-label="Next image"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div 
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={selectedImageData.url}
              alt={selectedImageData.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white text-lg">{selectedImageData.alt}</p>
              <span className="inline-block mt-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {selectedImageData.category}
              </span>
            </div>
          </motion.div>

          {/* Mobile Navigation Hints */}
          <motion.div 
            className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Swipe or tap sides to navigate
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
