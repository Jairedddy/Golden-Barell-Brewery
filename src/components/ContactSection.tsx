import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const headerAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      subject: 'general'
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Brewery Street', 'Downtown District', 'Portland, OR 97201']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(503) 555-1234', '(503) 555-2739']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@goldenbarrel.com', 'events@goldenbarrel.com']
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Thu: 4pm-11pm', 'Fri-Sat: 2pm-12am', 'Sun: 2pm-10pm']
    }
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
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
            Get In Touch
          </h2>
          <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have questions about our beers, 
            want to book an event, or just want to say hello, reach out anytime.
          </p>
        </motion.div>

        <div ref={contactAnimation.ref} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate={contactAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-8">
                Come Visit Our Taproom
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Experience our full range of craft beers and farm-to-table cuisine in our 
                welcoming taproom. Located in the heart of downtown, we're the perfect spot 
                for everything from casual drinks to special celebrations.
              </p>
            </div>

            {/* Contact Info Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              initial="hidden"
              animate={contactAnimation.isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="brew-card cursor-pointer"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              className="brew-card p-0 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-muted h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  </motion.div>
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">123 Brewery Street, Portland, OR</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="brew-card"
            initial="hidden"
            animate={contactAnimation.isVisible ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(503) 555-0123"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="events">Private Events</option>
                    <option value="catering">Catering</option>
                    <option value="tours">Brewery Tours</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="bg-background border-border resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Additional Info */}
            <motion.div 
              className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={contactAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Quick Response Guarantee</p>
                  <p>We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;