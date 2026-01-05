import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number; // Horizontal drift
}

interface BubblesProps {
  density?: number; // 0-1, controls number of bubbles
  intensity?: number; // 0-1, controls speed and movement
  color?: string;
  className?: string;
  maxBubbles?: number;
}

const Bubbles: React.FC<BubblesProps> = ({
  density = 0.5,
  intensity = 0.5,
  color = 'rgba(245, 158, 11, 0.3)', // Primary gold color with transparency
  className = '',
  maxBubbles = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const bubblesRef = useRef<Bubble[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Initialize bubbles
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial bubbles
    const createBubbles = () => {
      const bubbles: Bubble[] = [];
      const bubbleCount = Math.floor(maxBubbles * density);

      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 2 + Math.random() * 4, // 2-6px radius
          speed: (0.2 + Math.random() * 0.5) * intensity, // Speed based on intensity
          opacity: 0.2 + Math.random() * 0.3, // 0.2-0.5 opacity
          drift: (Math.random() - 0.5) * 0.5 * intensity, // Horizontal drift
        });
      }

      bubblesRef.current = bubbles;
    };

    createBubbles();

    // Animation loop
    const animate = () => {
      if (prefersReducedMotion) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentDensity = isHovered ? Math.min(density * 1.5, 1) : density;
      const currentIntensity = isHovered ? Math.min(intensity * 1.3, 1) : intensity;

      // Adjust bubble count if needed
      const targetCount = Math.floor(maxBubbles * currentDensity);
      if (bubblesRef.current.length < targetCount) {
        // Add more bubbles
        const toAdd = targetCount - bubblesRef.current.length;
        for (let i = 0; i < toAdd; i++) {
          bubblesRef.current.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            radius: 2 + Math.random() * 4,
            speed: (0.2 + Math.random() * 0.5) * currentIntensity,
            opacity: 0.2 + Math.random() * 0.3,
            drift: (Math.random() - 0.5) * 0.5 * currentIntensity,
          });
        }
      } else if (bubblesRef.current.length > targetCount) {
        // Remove excess bubbles
        bubblesRef.current = bubblesRef.current.slice(0, targetCount);
      }

      // Update and draw bubbles
      bubblesRef.current.forEach((bubble, index) => {
        // Update position
        bubble.y -= bubble.speed;
        bubble.x += bubble.drift;

        // Reset bubble if it goes off screen
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (bubble.x < -bubble.radius) {
          bubble.x = canvas.width + bubble.radius;
        } else if (bubble.x > canvas.width + bubble.radius) {
          bubble.x = -bubble.radius;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        
        // Create gradient for bubble effect
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, color.replace('0.3', String(bubble.opacity * 1.2)));
        gradient.addColorStop(0.7, color.replace('0.3', String(bubble.opacity)));
        gradient.addColorStop(1, color.replace('0.3', '0'));

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [density, intensity, color, maxBubbles, isHovered, prefersReducedMotion]);

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    />
  );
};

export default Bubbles;

