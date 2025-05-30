"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";

interface LossFunctionVisualizerProps {
  width?: number;
  height?: number;
  defaultFunction?: 'mse' | 'mae' | 'binaryCrossEntropy' | 'categoricalCrossEntropy' | 'huber';
  interactive?: boolean;
}

export function LossFunctionVisualizer({
  width = 600,
  height = 300,
  defaultFunction = 'mse',
  interactive = true,
}: LossFunctionVisualizerProps) {
  const [activeFunction, setActiveFunction] = useState<'mse' | 'mae' | 'binaryCrossEntropy' | 'categoricalCrossEntropy' | 'huber'>(defaultFunction);
  const [delta, setDelta] = useState(1.0); // For Huber loss
  const [prediction, setPrediction] = useState(0.5); // For interactive visualization
  const [actualValue, setActualValue] = useState(1.0); // Ground truth
  const [hoverPosition, setHoverPosition] = useState<{ x: number, y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Range of prediction values to display
  const predMin = 0;
  const predMax = 1;
  const lossMin = 0;
  const lossMax = 2;
  
  // Calculate SVG coordinates from function coordinates
  const svgX = (x: number) => {
    return ((x - predMin) / (predMax - predMin)) * width;
  };
  
  const svgY = (y: number) => {
    return height - ((y - lossMin) / (lossMax - lossMin)) * height;
  };
  
  // Calculate function coordinates from SVG coordinates
  const functionX = (svgX: number) => {
    return (svgX / width) * (predMax - predMin) + predMin;
  };
  
  // Implementation of loss functions
  const mse = (predicted: number, actual: number) => {
    return Math.pow(predicted - actual, 2);
  };
  
  const mae = (predicted: number, actual: number) => {
    return Math.abs(predicted - actual);
  };
  
  const binaryCrossEntropy = (predicted: number, actual: number) => {
    // Clip predicted value to avoid log(0)
    const p = Math.max(Math.min(predicted, 0.99999), 0.00001);
    return -(actual * Math.log(p) + (1 - actual) * Math.log(1 - p));
  };
  
  const categoricalCrossEntropy = (predicted: number, actual: number) => {
    // Simplified for visualization
    const p = Math.max(Math.min(predicted, 0.99999), 0.00001);
    return -Math.log(p);
  };
  
  const huber = (predicted: number, actual: number, delta: number) => {
    const error = Math.abs(predicted - actual);
    if (error <= delta) {
      return 0.5 * Math.pow(error, 2);
    } else {
      return delta * (error - 0.5 * delta);
    }
  };
  
  // Get the current function
  const getLossFunction = (type: string) => {
    switch (type) {
      case 'mse': return (x: number) => mse(x, actualValue);
      case 'mae': return (x: number) => mae(x, actualValue);
      case 'binaryCrossEntropy': return (x: number) => binaryCrossEntropy(x, actualValue);
      case 'categoricalCrossEntropy': return (x: number) => categoricalCrossEntropy(x, actualValue);
      case 'huber': return (x: number) => huber(x, actualValue, delta);
      default: return (x: number) => mse(x, actualValue);
    }
  };
  
  const currentFunction = getLossFunction(activeFunction);
  
  // Generate path data for the current function
  const generatePath = () => {
    const points = [];
    const steps = 100;
    
    for (let i = 0; i <= steps; i++) {
      const x = predMin + (i / steps) * (predMax - predMin);
      try {
        const y = currentFunction(x);
        // Clip extremely high values
        const clippedY = Math.min(y, lossMax);
        points.push(`${svgX(x)},${svgY(clippedY)}`);
      } catch (e) {
        // Skip points that cause errors (e.g., log(0))
        continue;
      }
    }
    
    return `M ${points.join(" L ")}`;
  };
  
  // Calculate derivative of the function
  const calculateGradient = (pred: number) => {
    const h = 0.0001;
    return (currentFunction(pred + h) - currentFunction(pred)) / h;
  };
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Convert to function coordinates
    const pred = functionX(x);
    try {
      const loss = currentFunction(pred);
      setHoverPosition({ x: pred, y: loss });
    } catch (e) {
      setHoverPosition(null);
    }
  };
  
  const handleMouseLeave = () => {
    setHoverPosition(null);
  };
  
  // Get color for the current function
  const getFunctionColor = () => {
    switch (activeFunction) {
      case 'mse': return "#3B82F6"; // Blue
      case 'mae': return "#F87171";    // Red
      case 'binaryCrossEntropy': return "#8B5CF6"; // Purple
      case 'categoricalCrossEntropy': return "#10B981"; // Green
      case 'huber': return "#F59E0B";  // Amber
      default: return "#3B82F6";
    }
  };
  
  // Get function description
  const getFunctionDescription = () => {
    switch (activeFunction) {
      case 'mse':
        return {
          formula: "MSE = (1/n) Σ(actual - predicted)²",
          description: "Mean Squared Error penalizes larger errors more heavily, commonly used for regression tasks.",
          pros: "Differentiable, heavily penalizes outliers",
          cons: "Very sensitive to outliers"
        };
      case 'mae':
        return {
          formula: "MAE = (1/n) Σ|actual - predicted|",
          description: "Mean Absolute Error treats all errors linearly regardless of magnitude.",
          pros: "More robust to outliers than MSE",
          cons: "Not differentiable at zero, can cause optimization challenges"
        };
      case 'binaryCrossEntropy':
        return {
          formula: "BCE = -Σ[actual·log(pred) + (1-actual)·log(1-pred)]",
          description: "Binary Cross-Entropy is ideal for binary classification problems.",
          pros: "Appropriate for binary classification, penalizes confident wrong predictions",
          cons: "Only suitable for binary problems"
        };
      case 'categoricalCrossEntropy':
        return {
          formula: "CCE = -Σ actual·log(pred)",
          description: "Used for multi-class classification problems.",
          pros: "Appropriate for multi-class problems",
          cons: "Requires one-hot encoded labels"
        };
      case 'huber':
        return {
          formula: `Huber = (1/n) Σ(0.5·error² if |error|≤δ, else δ·|error|-0.5·δ²)`,
          description: "Combines the best properties of MSE and MAE, less sensitive to outliers.",
          pros: "Robust to outliers, differentiable everywhere",
          cons: "Additional hyperparameter (δ) to tune"
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
  const functionColor = getFunctionColor();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="mb-4">
        <Tabs defaultValue={activeFunction} onValueChange={(value: string) => setActiveFunction(value as 'mse' | 'mae' | 'binaryCrossEntropy' | 'categoricalCrossEntropy' | 'huber')}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="mse">MSE</TabsTrigger>
            <TabsTrigger value="mae">MAE</TabsTrigger>
            <TabsTrigger value="binaryCrossEntropy">Binary Cross-Entropy</TabsTrigger>
            <TabsTrigger value="categoricalCrossEntropy">Categorical Cross-Entropy</TabsTrigger>
            <TabsTrigger value="huber">Huber Loss</TabsTrigger>
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
            
            {activeFunction === 'huber' && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm">δ value:</span>
                <Slider 
                  min={0.1}
                  max={2.0}
                  step={0.1}
                  value={[delta]}
                  onValueChange={(value) => setDelta(value[0])}
                  className="w-32"
                />
                <span className="text-sm">{delta.toFixed(1)}</span>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Prediction:</span>
                <Slider 
                  min={0.01}
                  max={0.99}
                  step={0.01}
                  value={[prediction]}
                  onValueChange={(value) => setPrediction(value[0])}
                  className="w-32"
                />
                <span className="text-sm">{prediction.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">Actual value:</span>
                <Slider 
                  min={0}
                  max={1}
                  step={0.1}
                  value={[actualValue]}
                  onValueChange={(value) => setActualValue(value[0])}
                  className="w-32"
                />
                <span className="text-sm">{actualValue === 1 ? '1' : actualValue === 0 ? '0' : actualValue.toFixed(1)}</span>
              </div>
            </div>
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
          {/* Grid lines */}
          <g className="grid-lines">
            {/* Horizontal grid lines */}
            {[0, 0.5, 1, 1.5, 2].map((y) => (
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
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((x) => (
              <line
                key={`v-${x}`}
                x1={svgX(x)}
                y1={0}
                x2={svgX(x)}
                y2={height}
                stroke="#e5e7eb"
                strokeWidth={x === 0 || x === 1 ? 2 : 1}
                strokeDasharray={x === 0 || x === 1 ? "none" : "4"}
              />
            ))}
            
            {/* X-axis labels */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((x) => (
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
            {[0, 0.5, 1, 1.5, 2].map((y) => (
              <text
                key={`y-label-${y}`}
                x={20}
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
          
          {/* Actual value vertical line */}
          <line
            x1={svgX(actualValue)}
            y1={0}
            x2={svgX(actualValue)}
            y2={height}
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="4"
          />
          <text
            x={svgX(actualValue)}
            y={20}
            textAnchor="middle"
            fontSize="12"
            fill="#10B981"
            fontWeight="bold"
          >
            Actual
          </text>
          
          {/* Main function curve */}
          <path
            d={generatePath()}
            stroke={functionColor}
            strokeWidth={3}
            fill="none"
          />
          
          {/* Current prediction point */}
          <circle
            cx={svgX(prediction)}
            cy={svgY(currentFunction(prediction))}
            r={6}
            fill={functionColor}
          />
          
          <line
            x1={svgX(prediction)}
            y1={svgY(currentFunction(prediction))}
            x2={svgX(prediction)}
            y2={svgY(0)}
            stroke={functionColor}
            strokeWidth={2}
            strokeDasharray="4"
          />
          
          <text
            x={svgX(prediction)}
            y={svgY(0) + 35}
            textAnchor="middle"
            fontSize="12"
            fill={functionColor}
            fontWeight="bold"
          >
            Prediction
          </text>
          
          <text
            x={width - 20}
            y={20}
            textAnchor="end"
            fontSize="12"
            fill={functionColor}
          >
            Loss: {currentFunction(prediction).toFixed(4)}
          </text>
          
          <text
            x={width - 20}
            y={40}
            textAnchor="end"
            fontSize="12"
            fill={functionColor}
          >
            Gradient: {calculateGradient(prediction).toFixed(4)}
          </text>
          
          {/* Interactive hover elements */}
          {interactive && hoverPosition && (
            <g className="hover-elements">
              <circle
                cx={svgX(hoverPosition.x)}
                cy={svgY(hoverPosition.y)}
                r={4}
                fill="#94A3B8"
              />
              
              {/* Value labels */}
              <text
                x={svgX(hoverPosition.x)}
                y={height - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#94A3B8"
              >
                {hoverPosition.x.toFixed(2)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
