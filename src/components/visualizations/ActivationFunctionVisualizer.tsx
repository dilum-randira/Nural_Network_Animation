"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";

interface ActivationFunctionVisualizerProps {
  width?: number;
  height?: number;
  defaultFunction?: 'sigmoid' | 'relu' | 'tanh' | 'leakyRelu' | 'softmax';
  interactive?: boolean;
}

export function ActivationFunctionVisualizer({
  width = 600,
  height = 300,
  defaultFunction = 'sigmoid',
  interactive = true,
}: ActivationFunctionVisualizerProps) {  const [activeFunction, setActiveFunction] = useState<'sigmoid' | 'relu' | 'tanh' | 'leakyRelu' | 'softmax'>(defaultFunction);
  const [parameter, setParameter] = useState(0.1);
  const [hoverPosition, setHoverPosition] = useState<{ x: number, y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Range of x values to display
  const xMin = -5;
  const xMax = 5;
  const yMin = -1.5;
  const yMax = 1.5;
  
  // Calculate SVG coordinates from function coordinates
  const svgX = (x: number) => {
    return ((x - xMin) / (xMax - xMin)) * width;
  };
  
  const svgY = (y: number) => {
    return height - ((y - yMin) / (yMax - yMin)) * height;
  };
  
  // Calculate function coordinates from SVG coordinates
  const functionX = (svgX: number) => {
    return (svgX / width) * (xMax - xMin) + xMin;
  };
  
  // Implementation of activation functions
  const sigmoid = (x: number) => {
    return 1 / (1 + Math.exp(-x));
  };
  
  const relu = (x: number) => {
    return Math.max(0, x);
  };
  
  const leakyRelu = (x: number) => {
    return x > 0 ? x : x * parameter;
  };
  
  const tanh = (x: number) => {
    return Math.tanh(x);
  };
  
  // Softmax is simplified here (just showing a smooth curve)
  const softmax = (x: number) => {
    return 1 / (1 + Math.exp(-x * 2)) * 0.8;
  };
  
  // Get the current function
  const getFunction = (type: string) => {
    switch (type) {
      case 'sigmoid': return sigmoid;
      case 'relu': return relu;
      case 'tanh': return tanh;
      case 'leakyRelu': return leakyRelu;
      case 'softmax': return softmax;
      default: return sigmoid;
    }
  };
  
  const currentFunction = getFunction(activeFunction);
  
  // Generate path data for the current function
  const generatePath = () => {
    const points = [];
    const steps = 100;
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = currentFunction(x);
      points.push(`${svgX(x)},${svgY(y)}`);
    }
    
    return `M ${points.join(" L ")}`;
  };
  
  // Calculate derivative of the function
  const calculateDerivative = (x: number) => {
    const h = 0.0001;
    return (currentFunction(x + h) - currentFunction(x)) / h;
  };
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to function coordinates
    const funcX = functionX(x);
    const funcY = currentFunction(funcX);
    
    setHoverPosition({ x: funcX, y: funcY });
  };
  
  const handleMouseLeave = () => {
    setHoverPosition(null);
  };
  
  // Get color for the current function
  const getFunctionColor = () => {
    switch (activeFunction) {
      case 'sigmoid': return "#3B82F6"; // Blue
      case 'relu': return "#F87171";    // Red
      case 'tanh': return "#A78BFA";    // Purple
      case 'leakyRelu': return "#10B981"; // Green
      case 'softmax': return "#F59E0B";  // Amber
      default: return "#3B82F6";
    }
  };
  
  // Get function description
  const getFunctionDescription = () => {
    switch (activeFunction) {
      case 'sigmoid':
        return {
          formula: "σ(x) = 1 / (1 + e^(-x))",
          description: "Squashes values between 0 and 1, useful for binary classification and output layers.",
          pros: "Smooth gradient, bounded output",
          cons: "Prone to vanishing gradient problem"
        };
      case 'relu':
        return {
          formula: "ReLU(x) = max(0, x)",
          description: "Outputs the input directly if positive, otherwise outputs zero.",
          pros: "Computationally efficient, helps avoid vanishing gradient",
          cons: "Can cause 'dying ReLU' problem (neurons get stuck)"
        };
      case 'tanh':
        return {
          formula: "tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))",
          description: "Squashes values between -1 and 1, similar to sigmoid but zero-centered.",
          pros: "Zero-centered outputs, stronger gradients than sigmoid",
          cons: "Still suffers from vanishing gradient"
        };
      case 'leakyRelu':
        return {
          formula: `LeakyReLU(x) = x if x > 0, ${parameter}x otherwise`,
          description: "Similar to ReLU, but allows small negative values to pass through.",
          pros: "Prevents 'dying ReLU' problem, maintains negative information",
          cons: "Additional hyperparameter to tune"
        };
      case 'softmax':
        return {
          formula: "softmax(x_i) = e^x_i / Σ(e^x_j)",
          description: "Converts a vector of values to a probability distribution.",
          pros: "Useful for multi-class classification output layers",
          cons: "Only makes sense when applied to a vector of values"
        };
      default:
        return {
          formula: "",
          description: "",
          pros: "",
          cons: ""
        };
    }
  };
  
  const description = getFunctionDescription();
  
  // Create gradient for derivative shading
  const createDerivativeGradient = () => {
    const steps = 20;
    const gradientStops = [];
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const derivative = calculateDerivative(x);
      // Normalize derivative to a color intensity
      const intensity = Math.min(Math.abs(derivative) * 1.5, 1);
      const offset = (i / steps) * 100;
      const color = derivative > 0 ? `rgba(52, 211, 153, ${intensity})` : `rgba(248, 113, 113, ${intensity})`;
      gradientStops.push(<stop key={i} offset={`${offset}%`} stopColor={color} />);
    }
    
    return gradientStops;
  };
  
  const functionColor = getFunctionColor();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="mb-4">
        <Tabs defaultValue={activeFunction} onValueChange={(value: string) => setActiveFunction(value as 'sigmoid' | 'relu' | 'tanh' | 'leakyRelu' | 'softmax')}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="sigmoid">Sigmoid</TabsTrigger>
            <TabsTrigger value="relu">ReLU</TabsTrigger>
            <TabsTrigger value="tanh">Tanh</TabsTrigger>
            <TabsTrigger value="leakyRelu">Leaky ReLU</TabsTrigger>
            <TabsTrigger value="softmax">Softmax</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeFunction} className="mt-0">
            <div className="text-sm mb-2">
              <div className="font-mono text-center mb-2">{description.formula}</div>
              <p className="text-gray-600 dark:text-gray-400">{description.description}</p>
              <div className="flex mt-2 gap-4 text-xs">
                <div className="flex-1">
                  <span className="font-semibold text-green-600 dark:text-green-500">Pros:</span> {description.pros}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-red-600 dark:text-red-500">Cons:</span> {description.cons}
                </div>
              </div>
            </div>
            
            {activeFunction === 'leakyRelu' && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm">α value:</span>
                <Slider 
                  min={0.01}
                  max={0.3}
                  step={0.01}
                  value={[parameter]}
                  onValueChange={(value) => setParameter(value[0])}
                  className="w-32"
                />
                <span className="text-sm">{parameter.toFixed(2)}</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="bg-gray-50 dark:bg-gray-900"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="derivativeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {createDerivativeGradient()}
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <g className="grid-lines">
            {/* Horizontal grid lines */}
            {[-1, -0.5, 0, 0.5, 1].map((y) => (
              <line
                key={`h-${y}`}
                x1={0}
                y1={svgY(y)}
                x2={width}
                y2={svgY(y)}
                stroke="#e5e7eb"
                strokeWidth={y === 0 ? 2 : 1}
                strokeDasharray={y === 0 ? "none" : "4"}
              />
            ))}
            
            {/* Vertical grid lines */}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => (
              <line
                key={`v-${x}`}
                x1={svgX(x)}
                y1={0}
                x2={svgX(x)}
                y2={height}
                stroke="#e5e7eb"
                strokeWidth={x === 0 ? 2 : 1}
                strokeDasharray={x === 0 ? "none" : "4"}
              />
            ))}
            
            {/* X-axis labels */}
            {[-4, -2, 0, 2, 4].map((x) => (
              <text
                key={`x-label-${x}`}
                x={svgX(x)}
                y={svgY(0) + 20}
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
              >
                {x}
              </text>
            ))}
            
            {/* Y-axis labels */}
            {[-1, -0.5, 0, 0.5, 1].map((y) => (
              <text
                key={`y-label-${y}`}
                x={svgX(0) - 20}
                y={svgY(y)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12"
                fill="currentColor"
              >
                {y}
              </text>
            ))}
          </g>
          
          {/* Derivative visualization (gradient under the curve) */}
          <path
            d={generatePath()}
            stroke="url(#derivativeGradient)"
            strokeWidth={8}
            strokeOpacity={0.5}
            fill="none"
          />
          
          {/* Main function curve */}
          <path
            d={generatePath()}
            stroke={functionColor}
            strokeWidth={3}
            fill="none"
          />
          
          {/* Interactive hover elements */}
          {interactive && hoverPosition && (
            <g className="hover-elements">
              <circle
                cx={svgX(hoverPosition.x)}
                cy={svgY(hoverPosition.y)}
                r={6}
                fill={functionColor}
              />
              
              {/* Horizontal and vertical lines */}
              <line
                x1={svgX(hoverPosition.x)}
                y1={svgY(hoverPosition.y)}
                x2={svgX(hoverPosition.x)}
                y2={svgY(0)}
                stroke={functionColor}
                strokeWidth={1}
                strokeDasharray="4"
              />
              
              <line
                x1={svgX(0)}
                y1={svgY(hoverPosition.y)}
                x2={svgX(hoverPosition.x)}
                y2={svgY(hoverPosition.y)}
                stroke={functionColor}
                strokeWidth={1}
                strokeDasharray="4"
              />
              
              {/* Value labels */}
              <text
                x={svgX(hoverPosition.x)}
                y={svgY(0) + 35}
                textAnchor="middle"
                fontSize="12"
                fill={functionColor}
              >
                x: {hoverPosition.x.toFixed(2)}
              </text>
              
              <text
                x={svgX(0) - 40}
                y={svgY(hoverPosition.y)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12"
                fill={functionColor}
              >
                y: {hoverPosition.y.toFixed(3)}
              </text>
              
              {/* Derivative */}
              <text
                x={width - 20}
                y={20}
                textAnchor="end"
                fontSize="12"
                fill={functionColor}
              >
                Derivative: {calculateDerivative(hoverPosition.x).toFixed(3)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
