"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Neuron {
  x: number;
  y: number;
  radius: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  width: number;
  alpha: number;
}

interface NeuralNetworkProps {
  className?: string;
  neuronCount?: number;
  connectionCount?: number;
  neuronColor?: string;
  lineColor?: string;
  maxSpeed?: number;
  cursorInfluenceRadius?: number;
  cursorInfluenceStrength?: number;
}

export function NeuralNetwork({
  className,
  neuronCount = 40,
  connectionCount = 60,
  neuronColor = "rgba(66, 153, 225, 0.7)",
  lineColor = "rgba(66, 153, 225, 0.5)",
  maxSpeed = 0.4,
  cursorInfluenceRadius = 150,
  cursorInfluenceStrength = 1.0,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const speedsRef = useRef<Array<{ dx: number; dy: number }>>([]);

  // Initialize neurons and connections
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    
    // Create neurons at random positions
    const newNeurons: Neuron[] = [];
    for (let i = 0; i < neuronCount; i++) {
      newNeurons.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 3 + 1,
        connections: []
      });
    }
    
    // Initialize speeds
    speedsRef.current = newNeurons.map(() => ({
      dx: (Math.random() - 0.5) * maxSpeed,
      dy: (Math.random() - 0.5) * maxSpeed
    }));
    
    // Create random connections between neurons
    const newConnections: Connection[] = [];
    for (let i = 0; i < connectionCount; i++) {
      const fromNeuron = Math.floor(Math.random() * neuronCount);
      let toNeuron;
      do {
        toNeuron = Math.floor(Math.random() * neuronCount);
      } while (toNeuron === fromNeuron);
      
      newNeurons[fromNeuron].connections.push(newConnections.length);
      newNeurons[toNeuron].connections.push(newConnections.length);
      
      newConnections.push({
        from: fromNeuron,
        to: toNeuron,
        width: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    setNeurons(newNeurons);
    setConnections(newConnections);
  }, [neuronCount, connectionCount, maxSpeed]);

  // Handle animation with cursor influence
  useEffect(() => {
    if (neurons.length === 0 || !canvasRef.current) return;
    
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw connections
      connections.forEach(conn => {
        const fromNeuron = neurons[conn.from];
        const toNeuron = neurons[conn.to];
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = conn.width;
        ctx.globalAlpha = conn.alpha;
        ctx.moveTo(fromNeuron.x, fromNeuron.y);
        ctx.lineTo(toNeuron.x, toNeuron.y);
        ctx.stroke();
      });
      
      // Draw neurons
      neurons.forEach((neuron, i) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = neuronColor;
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position with cursor influence
        let dx = speedsRef.current[i].dx;
        let dy = speedsRef.current[i].dy;
        
        // Apply cursor influence
        if (mousePosition) {
          const distance = Math.sqrt(
            Math.pow(neuron.x - mousePosition.x, 2) + 
            Math.pow(neuron.y - mousePosition.y, 2)
          );
          
          if (distance < cursorInfluenceRadius) {
            // Calculate repulsion vector
            const angle = Math.atan2(neuron.y - mousePosition.y, neuron.x - mousePosition.x);
            const force = (cursorInfluenceRadius - distance) / cursorInfluenceRadius * cursorInfluenceStrength;
            
            dx += Math.cos(angle) * force * 0.2;
            dy += Math.sin(angle) * force * 0.2;
          }
        }
        
        // Update position
        neuron.x += dx;
        neuron.y += dy;
        
        // Bounce off walls
        if (neuron.x < 0 || neuron.x > dimensions.width) {
          speedsRef.current[i].dx = -dx;
        }
        if (neuron.y < 0 || neuron.y > dimensions.height) {
          speedsRef.current[i].dy = -dy;
        }
        
        // Keep neurons within bounds
        neuron.x = Math.max(0, Math.min(dimensions.width, neuron.x));
        neuron.y = Math.max(0, Math.min(dimensions.height, neuron.y));
      });
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [neurons, connections, dimensions, mousePosition, neuronColor, lineColor, cursorInfluenceRadius, cursorInfluenceStrength]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Update canvas dimensions
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });
        
        // Reposition neurons within new bounds
        setNeurons(prev => 
          prev.map(neuron => ({
            ...neuron,
            x: Math.min(neuron.x, rect.width),
            y: Math.min(neuron.y, rect.height)
          }))
        );
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}