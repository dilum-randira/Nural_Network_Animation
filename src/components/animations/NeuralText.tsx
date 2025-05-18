"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  targetTextIndex: number;
}

interface Connection {
  from: number;
  to: number;
}

interface NeuralTextProps {
  texts: string[];
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleColor?: string;
  lineColor?: string;
}

export const NeuralText: React.FC<NeuralTextProps> = ({
  texts,
  className = "",
  particleCount = 80,
  connectionDistance = 100,
  particleColor = "rgba(66, 153, 225, 0.8)",
  lineColor = "rgba(66, 153, 225, 0.4)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textElements = useRef<HTMLSpanElement[]>([]);
  const particles = useRef<Particle[]>([]);
  const connections = useRef<Connection[]>([]);
  const animationFrame = useRef<number>(0);
  const [textPositions, setTextPositions] = useState<{left: number, top: number, width: number, height: number}[]>([]);

  // Initialize animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    // Store all text element references
    textElements.current = Array.from(containerRef.current.querySelectorAll('.neural-text'));
    
    const calculateTextPositions = () => {
      // Calculate positions of all text elements
      return textElements.current.map((el) => {
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        return {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height
        };
      });
    };

    const handleResize = () => {
      const container = containerRef.current!;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      setTextPositions(calculateTextPositions());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // Initialize particles and connections when text positions are available
  useEffect(() => {
    if (textPositions.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    // Create particles
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      // Randomly assign a text to orbit around
      const targetTextIndex = Math.floor(Math.random() * textPositions.length);
      const targetText = textPositions[targetTextIndex];
      
      // Start particles near their target text
      const offsetX = (Math.random() - 0.5) * 200;
      const offsetY = (Math.random() - 0.5) * 200;
      
      const x = targetText.left + targetText.width / 2 + offsetX;
      const y = targetText.top + targetText.height / 2 + offsetY;
      
      particles.current.push({
        x: Math.max(0, Math.min(x, width)),
        y: Math.max(0, Math.min(y, height)),
        radius: Math.random() * 3 + 1,
        color: particleColor,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        targetTextIndex
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update particles
      particles.current.forEach((particle, index) => {
        // Get target text
        const targetText = textPositions[particle.targetTextIndex];
        const targetX = targetText.left + targetText.width / 2;
        const targetY = targetText.top + targetText.height / 2;
        
        // Calculate direction to target
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force towards target
        if (distance > 100) {
          particle.velocity.x += dx * 0.0005;
          particle.velocity.y += dy * 0.0005;
        }
        
        // Apply some randomness
        particle.velocity.x += (Math.random() - 0.5) * 0.1;
        particle.velocity.y += (Math.random() - 0.5) * 0.1;
        
        // Limit velocity
        const maxVelocity = 1;
        const velocityMagnitude = Math.sqrt(
          particle.velocity.x * particle.velocity.x + 
          particle.velocity.y * particle.velocity.y
        );
        
        if (velocityMagnitude > maxVelocity) {
          particle.velocity.x = (particle.velocity.x / velocityMagnitude) * maxVelocity;
          particle.velocity.y = (particle.velocity.y / velocityMagnitude) * maxVelocity;
        }
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Keep particles inside bounds
        if (particle.x < 0) particle.x = 0;
        if (particle.x > width) particle.x = width;
        if (particle.y < 0) particle.y = 0;
        if (particle.y > height) particle.y = height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particles.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrame.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [textPositions, particleCount, connectionDistance, particleColor, lineColor]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      {texts.map((text, index) => (
        <span 
          key={index} 
          className="neural-text px-3 py-1.5 rounded-lg bg-black/5 backdrop-blur-sm border border-primary/10 shadow-sm relative z-10 inline-block"
        >
          {text}
        </span>
      ))}
    </div>
  );
};