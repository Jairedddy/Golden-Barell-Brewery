import React from 'react';
import { Droplets, Thermometer, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BrewingSection: React.FC = () => {
  const headerAnimation = useScrollAnimation();
  const stepsAnimation = useScrollAnimation();
  const qualityAnimation = useScrollAnimation();

  const brewingSteps = [
    {
      step: 1,
      title: 'Mashing',
      icon: Droplets,
      description: 'Premium malted grains are mixed with hot water to extract fermentable sugars.',
      duration: '60-90 minutes',
      temperature: '148-158°F'
    },
    {
      step: 2,
      title: 'Boiling',
      icon: Thermometer,
      description: 'The wort is boiled and hops are added for flavor, aroma, and preservation.',
      duration: '60-120 minutes',
      temperature: '212°F'
    },
    {
      step: 3,
      title: 'Fermentation',
      icon: Clock,
      description: 'Yeast converts sugars into alcohol and CO2 in temperature-controlled tanks.',
      duration: '5-14 days',
      temperature: '60-72°F'
    },
    {
      step: 4,
      title: 'Conditioning',
      icon: CheckCircle,
      description: 'Beer ages and develops its final flavor profile before being served fresh.',
      duration: '2-4 weeks',
      temperature: '38-45°F'
    }
  ];

  const qualityPoints = [
    'Locally sourced premium ingredients',
    'Small batch brewing for quality control',
    'Traditional techniques with modern precision',
    'Rigorous quality testing at every step',
    'Fresh beer served within days of completion'
  ];

  return (
    <section id="brewing" className="section-padding bg-background">
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
            Our Brewing Process
          </h2>
          <p className="text-elegant text-muted-foreground max-w-3xl mx-auto">
            Every Golden Barrel beer is crafted using time-honored techniques and the finest 
            ingredients. Our master brewer oversees each step to ensure exceptional quality 
            and consistency in every pour.
          </p>
        </motion.div>

        {/* Brewing Steps */}
        <motion.div 
          ref={stepsAnimation.ref}
          className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          animate={stepsAnimation.isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {brewingSteps.map((step, index) => (
            <motion.div 
              key={step.step} 
              className="relative"
              variants={scaleIn}
            >
              {/* Connection Line (hidden on mobile) */}
              {index < brewingSteps.length - 1 && (
                <motion.div 
                  className="hidden xl:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 transform translate-y-2 z-0"
                  initial={{ scaleX: 0 }}
                  animate={stepsAnimation.isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                />
              )}
              
              <motion.div 
                className="brew-card text-center relative z-10 h-full cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Number */}
                <motion.div 
                  className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.step}
                </motion.div>

                {/* Icon */}
                <motion.div 
                  className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="h-8 w-8 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{step.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium text-foreground">{step.temperature}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quality Commitment */}
        <div ref={qualityAnimation.ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={qualityAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-foreground mb-6">
              Quality You Can Taste
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our commitment to excellence starts with ingredient selection and continues through 
              every step of our brewing process. We believe that great beer is made with patience, 
              precision, and passion.
            </p>
            <motion.ul 
              className="space-y-3"
              initial="hidden"
              animate={qualityAnimation.isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {qualityPoints.map((point, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            className="brew-card bg-gradient-card p-8"
            initial="hidden"
            animate={qualityAnimation.isVisible ? "visible" : "hidden"}
            variants={scaleIn}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h4 className="text-xl font-semibold text-foreground mb-6 text-center">
              By The Numbers
            </h4>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">15</div>
                <div className="text-sm text-muted-foreground">Unique Recipes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">500</div>
                <div className="text-sm text-muted-foreground">Barrels/Month</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">72hrs</div>
                <div className="text-sm text-muted-foreground">Grain to Glass</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Quality Tested</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-background/50 rounded-lg">
              <p className="text-center text-sm text-muted-foreground italic">
                "Every batch is a testament to our dedication to craft brewing excellence."
              </p>
              <p className="text-center text-sm font-medium text-primary mt-2">
                - Marcus Thompson, Master Brewer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrewingSection;