import React, { useState } from 'react';
import { Wine, Coffee } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appetizers');
  const headerAnimation = useScrollAnimation();

  const menuCategories = {
    appetizers: [
      {
        id: 1,
        name: 'Beer Cheese Fondue',
        price: '$16',
        description: 'House-made cheese fondue featuring our Golden Lager, served with warm pretzel bread.'
      },
      {
        id: 2,
        name: 'Smoked Wings',
        price: '$14',
        description: 'Hickory smoked chicken wings glazed with our signature IPA BBQ sauce.'
      },
      {
        id: 3,
        name: 'Brewery Nachos',
        price: '$18',
        description: 'House-made tortilla chips topped with beer cheese, jalapeños, and slow-cooked pulled pork.'
      },
      {
        id: 4,
        name: 'Crispy Brussels Sprouts',
        price: '$12',
        description: 'Flash-fried Brussels sprouts with bacon, parmesan, and balsamic reduction.'
      },
      {
        id: 5,
        name: 'Pretzel Bites',
        price: '$10',
        description: 'Warm pretzel bites served with beer cheese and whole grain mustard.'
      },
      {
        id: 6,
        name: 'Charcuterie Board',
        price: '$24',
        description: 'Selection of artisan cheeses, cured meats, pickled vegetables, and house-made jam.'
      }
    ],
    mains: [
      {
        id: 7,
        name: 'Beer Braised Brisket',
        price: '$28',
        description: 'Slow-braised brisket in our porter, served with roasted root vegetables and garlic mashed potatoes.'
      },
      {
        id: 8,
        name: 'Brewmaster\'s Burger',
        price: '$18',
        description: 'Grass-fed beef patty with beer cheese, caramelized onions, bacon, and crispy onion strings.'
      },
      {
        id: 9,
        name: 'Fish & Chips',
        price: '$22',
        description: 'Beer-battered Atlantic cod with hand-cut fries, coleslaw, and house-made tartar sauce.'
      },
      {
        id: 10,
        name: 'Grilled Salmon',
        price: '$26',
        description: 'Pan-seared Atlantic salmon with wheat beer glaze, quinoa pilaf, and seasonal vegetables.'
      },
      {
        id: 11,
        name: 'Ribeye Steak',
        price: '$36',
        description: '12oz ribeye with porter demi-glace, roasted fingerling potatoes, and grilled asparagus.'
      },
      {
        id: 12,
        name: 'Mushroom Risotto',
        price: '$22',
        description: 'Creamy risotto with wild mushrooms, truffle oil, parmesan, and herbs.'
      },
      {
        id: 13,
        name: 'BBQ Pork Ribs',
        price: '$24',
        description: 'Half rack of slow-smoked ribs with IPA BBQ glaze, coleslaw, and cornbread.'
      },
      {
        id: 14,
        name: 'Chicken Schnitzel',
        price: '$20',
        description: 'Breaded chicken breast with lemon caper sauce, arugula salad, and roasted potatoes.'
      }
    ],
    beverages: [
      {
        id: 15,
        name: 'Golden Barrel Lager',
        price: '$8',
        description: 'Our signature crisp lager with honey notes and a smooth finish.',
        abv: '4.8%'
      },
      {
        id: 16,
        name: 'Copper Creek IPA',
        price: '$9',
        description: 'Hoppy India Pale Ale bursting with citrus and pine aromatics.',
        abv: '6.2%'
      },
      {
        id: 17,
        name: 'Midnight Porter',
        price: '$9',
        description: 'Rich, dark porter with decadent chocolate and coffee undertones.',
        abv: '5.5%'
      },
      {
        id: 18,
        name: 'Harvest Wheat',
        price: '$8',
        description: 'Light and refreshing wheat beer with subtle spice notes and citrus.',
        abv: '4.5%'
      },
      {
        id: 19,
        name: 'Amber Ale',
        price: '$8',
        description: 'Smooth amber ale with caramel malt sweetness and balanced hops.',
        abv: '5.2%'
      },
      {
        id: 20,
        name: 'Stout Imperial',
        price: '$10',
        description: 'Bold imperial stout with roasted malt, dark chocolate, and vanilla.',
        abv: '8.5%'
      },
      {
        id: 21,
        name: 'Pale Ale',
        price: '$8',
        description: 'Classic American pale ale with floral hops and biscuit malt.',
        abv: '5.0%'
      },
      {
        id: 22,
        name: 'Seasonal Brew',
        price: '$9',
        description: 'Ask your server about our current seasonal offering.',
        abv: 'Varies'
      }
    ],
    desserts: [
      {
        id: 23,
        name: 'Porter Chocolate Cake',
        price: '$12',
        description: 'Rich chocolate cake made with our Midnight Porter, served warm with vanilla ice cream.'
      },
      {
        id: 24,
        name: 'Beer Float',
        price: '$10',
        description: 'Vanilla bean ice cream with your choice of our lighter craft beers.'
      },
      {
        id: 25,
        name: 'Apple Crisp',
        price: '$11',
        description: 'Warm apple crisp with cinnamon streusel topping and vanilla ice cream.'
      },
      {
        id: 26,
        name: 'Cheesecake',
        price: '$11',
        description: 'New York style cheesecake with seasonal berry compote.'
      },
      {
        id: 27,
        name: 'Bread Pudding',
        price: '$10',
        description: 'House-made bread pudding with whiskey caramel sauce.'
      }
    ],
    chefs_special: [
      {
        id: 28,
        name: 'Barrel-Aged Beef Wellington',
        price: '$42',
        description: 'Prime beef tenderloin wrapped in puff pastry with mushroom duxelles, served with porter reduction.'
      },
      {
        id: 29,
        name: 'Brewmaster\'s Tasting Plate',
        price: '$35',
        description: 'Chef\'s selection of three small plates paired with our craft beers.'
      },
      {
        id: 30,
        name: 'Lobster Mac & Cheese',
        price: '$32',
        description: 'Fresh lobster meat in creamy beer cheese sauce with cavatappi pasta and herb crust.'
      },
      {
        id: 31,
        name: 'Duck Confit',
        price: '$34',
        description: 'Slow-cooked duck leg with cherry ale reduction, wild rice, and roasted vegetables.'
      }
    ]
  };

  const renderMenuItems = (items: Array<{id: number; name: string; price: string; description: string; abv?: string}>) => (
    <motion.div 
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <AnimatePresence mode="wait">
        {items.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="brew-card relative group cursor-pointer"
            variants={fadeInUp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
          >
            {/* Hover Shimmer Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Content */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.name}
                  </h3>
                  {item.abv && (
                    <motion.p 
                      className="text-sm text-primary font-medium mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      ABV: {item.abv}
                    </motion.p>
                  )}
                </div>
                <motion.span 
                  className="text-xl font-bold text-primary ml-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.price}
                </motion.span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section id="menu" className="section-padding bg-muted/30">
      <div className="brewing-container">
        {/* Section Header */}
        <motion.div 
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-foreground mb-6">
            Our Menu
          </h2>
          <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted selection of artisan beers and farm-to-table cuisine, 
            each dish thoughtfully paired to enhance your dining experience.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full lg:w-auto grid grid-cols-3 lg:flex lg:flex-wrap gap-2 h-auto bg-transparent mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger 
                value="appetizers" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 border border-border data-[state=active]:border-primary transition-all"
              >
                Appetizers
              </TabsTrigger>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger 
                value="mains" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 border border-border data-[state=active]:border-primary transition-all"
              >
                Main Courses
              </TabsTrigger>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger 
                value="beverages" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 border border-border data-[state=active]:border-primary transition-all"
              >
                <Wine className="h-4 w-4 mr-2" />
                Craft Beers
              </TabsTrigger>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger 
                value="desserts" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 border border-border data-[state=active]:border-primary transition-all"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Desserts
              </TabsTrigger>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger 
                value="chefs_special" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 border border-border data-[state=active]:border-primary transition-all"
              >
                Chef's Special
              </TabsTrigger>
            </motion.div>
          </TabsList>

          <TabsContent value="appetizers">
            {renderMenuItems(menuCategories.appetizers)}
          </TabsContent>

          <TabsContent value="mains">
            {renderMenuItems(menuCategories.mains)}
          </TabsContent>

          <TabsContent value="beverages">
            {renderMenuItems(menuCategories.beverages)}
          </TabsContent>

          <TabsContent value="desserts">
            {renderMenuItems(menuCategories.desserts)}
          </TabsContent>

          <TabsContent value="chefs_special">
            {renderMenuItems(menuCategories.chefs_special)}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to experience our culinary artistry? Reserve your table today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;