import React from 'react';
import { Users, Heart, Leaf, Trophy, Clock, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionHeader from '@/components/SectionHeader';
import MotionInView from '@/components/MotionInView';
import {
  mostLovedStyles,
  peakVisitingHours,
  seasonalFavorites,
} from '@/lib/mock-stats';

const AboutSection: React.FC = () => {
  const headerAnimation = useScrollAnimation();
  const storyAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();
  const chartsAnimation = useScrollAnimation();

  // Chart configurations
  const mostLovedConfig = {
    ipa: {
      label: 'IPA',
      color: 'hsl(45, 85%, 60%)',
    },
    stout: {
      label: 'Stout',
      color: 'hsl(30, 80%, 55%)',
    },
    lager: {
      label: 'Lager',
      color: 'hsl(40, 75%, 50%)',
    },
    paleAle: {
      label: 'Pale Ale',
      color: 'hsl(35, 70%, 45%)',
    },
    wheat: {
      label: 'Wheat',
      color: 'hsl(25, 65%, 40%)',
    },
    porter: {
      label: 'Porter',
      color: 'hsl(20, 60%, 35%)',
    },
  };

  const seasonalConfig = {
    spring: {
      label: 'Spring',
      color: 'hsl(142, 76%, 36%)',
    },
    summer: {
      label: 'Summer',
      color: 'hsl(45, 85%, 60%)',
    },
    fall: {
      label: 'Fall',
      color: 'hsl(30, 80%, 55%)',
    },
    winter: {
      label: 'Winter',
      color: 'hsl(217, 91%, 60%)',
    },
  };

  const COLORS = [
    'hsl(45, 85%, 60%)',
    'hsl(30, 80%, 55%)',
    'hsl(40, 75%, 50%)',
    'hsl(35, 70%, 45%)',
    'hsl(25, 65%, 40%)',
    'hsl(20, 60%, 35%)',
  ];

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
      image: '/placeholder-team-1.jpg'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Executive Chef & Co-Founder',
      image: '/placeholder-team-2.jpg'
    },
    {
      name: 'James Mitchell',
      role: 'Head of Operations',
      image: '/placeholder-team-3.jpg'
    }
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="brewing-container">
        {/* Section Header */}
        <SectionHeader
          subtitle="About Us"
          title="Our Story"
          className="mb-16"
        />

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

        {/* Statistics Charts */}
        <div ref={chartsAnimation.ref} className="mb-20 mt-16">
          <motion.h3 
            className="text-2xl lg:text-3xl font-display font-semibold text-center text-foreground mb-12"
            initial="hidden"
            animate={chartsAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            The Numbers Tell Our Story
          </motion.h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={chartsAnimation.isVisible ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Card 1: Most Loved Styles */}
            <MotionInView variants={fadeInUp}>
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl"
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Most Loved Styles</h3>
                  </div>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Our community's top picks this season
                </p>
                <ChartContainer config={mostLovedConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mostLovedStyles} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="percentage"
                        fill="hsl(45, 85%, 60%)"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {mostLovedStyles.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </motion.div>
            </MotionInView>

            {/* Card 2: Peak Visiting Hours */}
            <MotionInView variants={fadeInUp} delay={0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl"
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Peak Hours</h3>
                  </div>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  When the taproom comes alive
                </p>
                <ChartContainer config={{ visitors: { label: 'Visitors', color: 'hsl(45, 85%, 60%)' } }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={peakVisitingHours} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(45, 85%, 60%)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(45, 85%, 60%)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="hsl(45, 85%, 60%)"
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </motion.div>
            </MotionInView>

            {/* Card 3: Seasonal Favorites */}
            <MotionInView variants={fadeInUp} delay={0.2}>
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl"
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Seasonal Trends</h3>
                  </div>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Preferences change with the seasons
                </p>
                <ChartContainer config={seasonalConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={seasonalFavorites}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ season, percentage }) => `${season}: ${percentage}%`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="percentage"
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {seasonalFavorites.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </motion.div>
            </MotionInView>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;