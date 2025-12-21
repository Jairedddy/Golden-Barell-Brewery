import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionHeader from '@/components/SectionHeader';

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
        <SectionHeader
          subtitle="Visual Journey"
          title="Gallery"
          description="Step inside Golden Barrel through our lens. From our gleaming copper tanks to mouthwatering dishes and the warm atmosphere that makes us special, discover what awaits you."
          className="mb-16"
        />

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
              className={`relative group overflow-hidden rounded-xl ${getGridClasses(image.size)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={galleryAnimation.isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                zIndex: 10,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              style={{ perspective: 1000 }}
            >
              {/* Gold Border Accent on Hover */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/60 z-20 pointer-events-none"
                initial={false}
                transition={{ duration: 0.4 }}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                style={{
                  boxShadow: '0 0 30px hsl(45, 85%, 60% / 0.4)',
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Image Container */}
              <div className={`relative overflow-hidden rounded-xl ${getHeightClasses(image.size)}`}>
                <motion.img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 1
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
                
                {/* Gradient Overlay with Animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%', rotate: -45 }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </motion.div>


                {/* Corner Accent */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 rounded-tr-xl"
                  initial={false}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 rounded-bl-xl"
                  initial={false}
                  transition={{ duration: 0.4 }}
                />
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
    </section>
  );
};

export default GallerySection;
