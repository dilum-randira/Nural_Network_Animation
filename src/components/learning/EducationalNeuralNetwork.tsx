"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NeuronProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  label?: string;
  value?: number;
  isActive?: boolean;
  onClick?: (id: string) => void;
}

interface ConnectionProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  weight: number;
  isActive?: boolean;
}

interface LayerConfig {
  neurons: NeuronProps[];
}

interface EducationalNeuralNetworkProps {
  inputCount?: number;
  hiddenLayers?: number[];
  outputCount?: number;
  interactive?: boolean;
  showLabels?: boolean;
  width?: number;
  height?: number;
}

export function EducationalNeuralNetwork({
  inputCount = 2,
  hiddenLayers = [3],
  outputCount = 1,
  interactive = true,
  showLabels = false,
  width = 800,
  height = 400,
}: EducationalNeuralNetworkProps) {
  const [neurons, setNeurons] = useState<NeuronProps[]>([]);
  const [connections, setConnections] = useState<ConnectionProps[]>([]);
  const [activeNeuron, setActiveNeuron] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Create network structure on mount
  useEffect(() => {
    const layerCounts = [inputCount, ...hiddenLayers, outputCount];
    const newNeurons: NeuronProps[] = [];
    const newConnections: ConnectionProps[] = [];
    
    // Calculate horizontal spacing
    const horizontalSpacing = width / (layerCounts.length + 1);
    
    // Create neurons for each layer
    let neuronId = 0;
    for (let layerIdx = 0; layerIdx < layerCounts.length; layerIdx++) {
      const neuronCount = layerCounts[layerIdx];
      const verticalSpacing = height / (neuronCount + 1);
      
      for (let i = 0; i < neuronCount; i++) {
        const x = horizontalSpacing * (layerIdx + 1);
        const y = verticalSpacing * (i + 1);
        const isInput = layerIdx === 0;
        const isOutput = layerIdx === layerCounts.length - 1;
        
        let label;
        if (showLabels) {
          if (isInput) label = `Input ${i + 1}`;
          else if (isOutput) label = `Output ${i + 1}`;
          else label = `H${layerIdx}_${i + 1}`;
        }
        
        newNeurons.push({
          id: `neuron-${neuronId}`,
          x,
          y,
          radius: 12,
          color: isInput ? '#60A5FA' : isOutput ? '#F87171' : '#A78BFA',
          label,
          value: Math.random(), // Initialize with random value
          isActive: false,
        });
        
        neuronId++;
      }
    }
    
    // Create connections between layers
    let prevLayerStartIdx = 0;
    let currentLayerStartIdx = inputCount;
    
    for (let layerIdx = 1; layerIdx < layerCounts.length; layerIdx++) {
      const prevNeuronCount = layerCounts[layerIdx - 1];
      const currentNeuronCount = layerCounts[layerIdx];
      
      // Connect each neuron in current layer to all neurons in previous layer
      for (let i = 0; i < currentNeuronCount; i++) {
        const targetNeuron = newNeurons[currentLayerStartIdx + i];
        
        for (let j = 0; j < prevNeuronCount; j++) {
          const sourceNeuron = newNeurons[prevLayerStartIdx + j];
          
          newConnections.push({
            sourceX: sourceNeuron.x,
            sourceY: sourceNeuron.y,
            targetX: targetNeuron.x,
            targetY: targetNeuron.y,
            weight: Math.random() * 2 - 1, // Random weight between -1 and 1
            isActive: false,
          });
        }
      }
      
      prevLayerStartIdx += prevNeuronCount;
      currentLayerStartIdx += currentNeuronCount;
    }
    
    setNeurons(newNeurons);
    setConnections(newConnections);
  }, [inputCount, hiddenLayers, outputCount, width, height, showLabels]);
  
  // Handle neuron click
  const handleNeuronClick = (id: string) => {
    if (!interactive) return;
    
    // Deactivate all neurons and connections
    setNeurons(prev => prev.map(n => ({ ...n, isActive: n.id === id })));
    
    // Find connections associated with this neuron
    const newActiveConnections = new Set<string>();
    let foundNeuron = neurons.find(n => n.id === id);
    
    if (foundNeuron) {
      // Activate forward connections (outgoing)
      connections.forEach((conn, idx) => {
        if (Math.abs(conn.sourceX - foundNeuron!.x) < 1 && Math.abs(conn.sourceY - foundNeuron!.y) < 1) {
          newActiveConnections.add(`conn-${idx}`);
          
          // Find target neuron
          const targetNeuron = neurons.find(
            n => Math.abs(n.x - conn.targetX) < 1 && Math.abs(n.y - conn.targetY) < 1
          );
          
          if (targetNeuron) {
            setNeurons(prev => 
              prev.map(n => n.id === targetNeuron.id ? { ...n, isActive: true } : n)
            );
          }
        }
      });
    }
    
    setActiveConnections(newActiveConnections);
    setActiveNeuron(id);
  };
  
  return (
    <svg 
      ref={svgRef}
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`} 
      style={{ background: 'transparent' }}
    >
      {/* Connections */}
      {connections.map((connection, idx) => (
        <line
          key={`conn-${idx}`}
          x1={connection.sourceX}
          y1={connection.sourceY}
          x2={connection.targetX}
          y2={connection.targetY}
          stroke={activeConnections.has(`conn-${idx}`) ? "#3B82F6" : "#94A3B8"}
          strokeWidth={activeConnections.has(`conn-${idx}`) ? 3 : 1.5}
          strokeOpacity={activeConnections.has(`conn-${idx}`) ? 0.9 : 0.5}
        />
      ))}
      
      {/* Neurons */}
      {neurons.map(neuron => (
        <g key={neuron.id} onClick={() => handleNeuronClick(neuron.id)}>
          <circle
            cx={neuron.x}
            cy={neuron.y}
            r={neuron.radius}
            fill={neuron.isActive ? "#3B82F6" : neuron.color}
            opacity={neuron.isActive ? 1 : 0.7}
            stroke={neuron.isActive ? "#1E40AF" : "none"}
            strokeWidth={2}
            className={interactive ? "cursor-pointer hover:opacity-100" : ""}
          />
          {neuron.label && showLabels && (
            <text
              x={neuron.x}
              y={neuron.y - neuron.radius - 5}
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              className="select-none"
            >
              {neuron.label}
            </text>
          )}
        </g>
      ))}
      
      {/* Network Labels */}
      <text
        x={width / 2}
        y={20}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
        className="select-none"
      >
        Neural Network Architecture
      </text>
      
      {showLabels && (
        <>
          <text
            x={neurons[0]?.x || 0}
            y={height - 10}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            className="select-none"
          >
            Input Layer
          </text>
          
          {hiddenLayers.map((_, idx) => {
            const layerStartIdx = inputCount + idx * hiddenLayers[idx - 1 >= 0 ? idx - 1 : 0];
            return (
              <text
                key={`hidden-layer-${idx}`}
                x={neurons[layerStartIdx]?.x || 0}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
                className="select-none"
              >
                Hidden Layer {idx + 1}
              </text>
            );
          })}
          
          <text
            x={neurons[neurons.length - 1]?.x || 0}
            y={height - 10}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            className="select-none"
          >
            Output Layer
          </text>
        </>
      )}
    </svg>
  );
}