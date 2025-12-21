import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  showAccent?: boolean;
}

/**
 * SectionHeader - Reusable section header component with consistent styling
 * 
 * Features:
 * - Consistent typography and spacing
 * - Optional gold accent underline that matches text width
 * - Responsive alignment
 * - Scroll-triggered animations
 * - Premium visual hierarchy
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
  showAccent = true,
}) => {
  const { ref, isVisible } = useScrollAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  useEffect(() => {
    if (titleRef.current && showAccent) {
      // Measure the actual text width
      const textWidth = titleRef.current.offsetWidth;
      setUnderlineWidth(textWidth);
    }
  }, [title, showAccent, isVisible]);

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={`max-w-4xl ${alignmentClasses[align]} ${className}`}
    >
      {/* Subtitle (optional) */}
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-sm md:text-base font-medium text-primary uppercase tracking-wider mb-2"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Main Title */}
      <motion.h2
        variants={fadeInUp}
        className="heading-section text-foreground mb-4 relative pb-6"
      >
        <span ref={titleRef} className="inline-block relative">
          {title}
          {/* Gold Accent Underline - Matches text width */}
          {showAccent && underlineWidth > 0 && (
            <motion.span
              className="absolute left-0 h-1 bg-gradient-to-r from-primary via-amber-500 to-primary"
              initial={{ width: 0 }}
              animate={isVisible ? { width: underlineWidth } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                bottom: '-1.5rem',
                boxShadow: '0 0 20px hsl(45, 85%, 60% / 0.5)',
              }}
            />
          )}
        </span>
      </motion.h2>

      {/* Description (optional) */}
      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-elegant text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

