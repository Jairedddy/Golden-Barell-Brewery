import React from 'react';
import { Beer, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    brewery: [
      { name: 'Our Story', href: '#about' },
      { name: 'Brewing Process', href: '#brewing' },
      { name: 'Tours & Tastings', href: '#contact' },
      { name: 'Careers', href: '#' }
    ],
    dining: [
      { name: 'Menu', href: '#menu' },
      { name: 'Private Events', href: '#events' },
      { name: 'Catering', href: '#contact' },
      { name: 'Reservations', href: '#contact' }
    ],
    visit: [
      { name: 'Hours & Location', href: '#contact' },
      { name: 'Parking Info', href: '#' },
      { name: 'Accessibility', href: '#' },
      { name: 'Gift Cards', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="brewing-container py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <Beer className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-bold">Golden Barrel</span>
            </div>
            
            <p className="text-secondary-foreground/80 leading-relaxed">
              Crafting exceptional beers and memorable dining experiences since 2018. 
              Where community, quality, and tradition come together.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>123 Brewery Street, Portland, OR 97201</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>(503) 555-BREW</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>hello@goldenbarrel.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-secondary-foreground/10 hover:bg-primary/20 p-2 rounded-lg transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-8">
            {/* Brewery Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">Brewery</h3>
              <ul className="space-y-3">
                {footerLinks.brewery.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dining Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">Dining</h3>
              <ul className="space-y-3">
                {footerLinks.dining.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">Visit Us</h3>
              <ul className="space-y-3">
                {footerLinks.visit.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-secondary-foreground/20">
        <div className="brewing-container py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Stay Connected</h3>
              <p className="text-secondary-foreground/80 text-sm">
                Get updates on new brews, events, and special offers.
              </p>
            </div>
            
            <div className="flex w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-secondary-foreground placeholder:text-secondary-foreground/60"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-r-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/20">
        <div className="brewing-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>
              © {currentYear} Golden Barrel Brewery & Restaurant. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <button className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </button>
              <button className="hover:text-primary transition-colors duration-200">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;