import React from 'react';
import { Users, Heart, Leaf, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection: React.FC = () => {
  const headerAnimation = useScrollAnimation();
  const storyAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every brew tells a story of dedication and craftsmanship passed down through generations.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source locally, brew responsibly, and give back to our community and environment.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'More than a brewery, we\'re a gathering place where friends become family.'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Relentless pursuit of quality in every pour, every plate, every experience.'
    }
  ];

  const teamMembers = [
    {
      name: 'Marcus Thompson',
      role: 'Master Brewer & Co-Founder',
      bio: 'With 15 years of brewing expertise, Marcus brings innovative techniques to traditional recipes.',
      image: '/placeholder-team-1.jpg'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Executive Chef & Co-Founder',
      bio: 'Culinary artist specializing in beer-paired cuisine and farm-to-table experiences.',
      image: '/placeholder-team-2.jpg'
    },
    {
      name: 'James Mitchell',
      role: 'Head of Operations',
      bio: 'Ensures every guest receives the exceptional hospitality Golden Barrel is known for.',
      image: '/placeholder-team-3.jpg'
    }
  ];

  return (
    <section id="about" className="section-padding bg-background">
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
            Our Story
          </h2>
          <p className="text-elegant text-muted-foreground max-w-3xl mx-auto">
            Founded in 2018 by Marcus Thompson and Elena Rodriguez, Golden Barrel began as a dream 
            to create a space where exceptional craft beer meets culinary excellence. Today, we're 
            proud to be a cornerstone of our community, bringing people together over great food 
            and even better beer.
          </p>
        </motion.div>

        {/* Story Content */}
        <div ref={storyAnimation.ref} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate={storyAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-foreground">
              Where Tradition Meets Innovation
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our journey started in a small garage with a simple belief: great beer should bring 
              people together. What began as weekend experiments has grown into a full-scale 
              brewery and restaurant, but our core values remain unchanged.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combine time-honored brewing techniques with innovative flavors, sourcing the 
              finest ingredients from local farms and producers. Every pint tells the story of 
              our dedication to craft, community, and quality.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial="hidden"
            animate={storyAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <motion.div 
              className="brew-card bg-gradient-card p-8 text-center"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-4xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                animate={storyAnimation.isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                50+
              </motion.div>
              <div className="text-lg font-semibold text-foreground mb-1">Unique Brews</div>
              <div className="text-muted-foreground">Crafted to perfection</div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-2xl font-bold text-secondary">25k+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-2xl font-bold text-accent">15</div>
                  <div className="text-sm text-muted-foreground">Awards Won</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
        <div ref={valuesAnimation.ref} className="mb-20">
          <motion.h3 
            className="text-2xl lg:text-3xl font-display font-semibold text-center text-foreground mb-12"
            initial="hidden"
            animate={valuesAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Our Values
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={valuesAnimation.isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div 
                key={value.title} 
                className="brew-card text-center group cursor-pointer"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div 
                  className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team */}
        <div ref={teamAnimation.ref} className="text-center">
          <motion.h3 
            className="text-2xl lg:text-3xl font-display font-semibold text-foreground mb-12"
            initial="hidden"
            animate={teamAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Meet Our Team
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate={teamAnimation.isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                className="brew-card text-center group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div 
                  className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-muted-foreground overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="h-12 w-12" />
                </motion.div>
                <h4 className="text-lg font-semibold text-foreground mb-1">{member.name}</h4>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;