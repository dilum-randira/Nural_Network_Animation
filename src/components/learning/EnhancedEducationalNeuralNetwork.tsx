"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface NeuronProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  label?: string;
  value: number;
  isActive: boolean;
  animationProgress?: number;
}

interface ConnectionProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  weight: number;
  isActive: boolean;
  animationProgress?: number;
}

interface EnhancedEducationalNeuralNetworkProps {
  inputCount?: number;
  hiddenLayers?: number[];
  outputCount?: number;
  interactive?: boolean;
  showLabels?: boolean;
  width?: number;
  height?: number;
  theme?: 'blue' | 'green' | 'purple' | 'gradient';
  showWeights?: boolean;
  animateSignals?: boolean;
}

export function EnhancedEducationalNeuralNetwork({
  inputCount = 2,
  hiddenLayers = [3],
  outputCount = 1,
  interactive = true,
  showLabels = false,
  width = 800,
  height = 400,
  theme = 'blue',
  showWeights = false,
  animateSignals = true,
}: EnhancedEducationalNeuralNetworkProps) {
  const [neurons, setNeurons] = useState<NeuronProps[]>([]);
  const [connections, setConnections] = useState<ConnectionProps[]>([]);
  const [activeNeuron, setActiveNeuron] = useState<string | null>(null);
  const [activationThreshold, setActivationThreshold] = useState(0.5);
  const [showControls, setShowControls] = useState(true);
  const [animation, setAnimation] = useState<any>(null);
  const [networkMode, setNetworkMode] = useState<'forward' | 'training'>('forward');
  const [learningRate, setLearningRate] = useState(0.01);
  const [trainIteration, setTrainIteration] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Color themes
  const colorThemes = {
    blue: {
      input: '#60A5FA',
      hidden: '#93C5FD',
      output: '#3B82F6',
      activeNeuron: '#1D4ED8',
      connection: '#94A3B8',
      activeConnection: '#2563EB',
      activationPath: 'rgba(59, 130, 246, 0.7)',
    },
    green: {
      input: '#10B981',
      hidden: '#34D399',
      output: '#059669',
      activeNeuron: '#047857',
      connection: '#94A3B8',
      activeConnection: '#059669',
      activationPath: 'rgba(16, 185, 129, 0.7)',
    },
    purple: {
      input: '#8B5CF6',
      hidden: '#A78BFA',
      output: '#7C3AED',
      activeNeuron: '#6D28D9',
      connection: '#94A3B8',
      activeConnection: '#7C3AED',
      activationPath: 'rgba(139, 92, 246, 0.7)',
    },
    gradient: {
      input: '#60A5FA',
      hidden: '#8B5CF6',
      output: '#EC4899',
      activeNeuron: '#8B5CF6',
      connection: '#94A3B8',
      activeConnection: '#8B5CF6',
      activationPath: 'url(#gradient)',
    }
  };
  
  const currentTheme = colorThemes[theme];
  
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
        
        let neuronColor;
        if (isInput) neuronColor = currentTheme.input;
        else if (isOutput) neuronColor = currentTheme.output;
        else neuronColor = currentTheme.hidden;
        
        newNeurons.push({
          id: `neuron-${neuronId}`,
          x,
          y,
          radius: 12,
          color: neuronColor,
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
  }, [inputCount, hiddenLayers, outputCount, width, height, showLabels, theme, currentTheme]);
  
  // Handle neuron click - propagate activation through the network
  const handleNeuronClick = (id: string) => {
    if (!interactive) return;
    
    // Clear any ongoing animation
    if (animation) {
      clearTimeout(animation);
    }
    
    // Reset activations
    setNeurons(prev => prev.map(n => ({ ...n, isActive: false, animationProgress: 0 })));
    setConnections(prev => prev.map(c => ({ ...c, isActive: false, animationProgress: 0 })));
    
    // Find clicked neuron
    const clickedNeuronIndex = neurons.findIndex(n => n.id === id);
    if (clickedNeuronIndex < 0) return;
    
    const clickedNeuron = neurons[clickedNeuronIndex];
    
    // Activate the clicked neuron
    setNeurons(prev => {
      const updated = [...prev];
      updated[clickedNeuronIndex] = { ...clickedNeuron, isActive: true };
      return updated;
    });
    
    setActiveNeuron(id);
    
    if (animateSignals) {
      // Start propagating signal through network
      propagateSignal([clickedNeuronIndex], 0);
    } else {
      // Instant propagation
      const updatedNetwork = simulateForwardPass(clickedNeuronIndex);
      setNeurons(updatedNetwork.neurons);
      setConnections(updatedNetwork.connections);
    }
  };
  
  // Simulate forward pass through the network
  const simulateForwardPass = (startNeuronIndex: number) => {
    const updatedNeurons = [...neurons];
    const updatedConnections = [...connections];
    const activatedNeurons = new Set<number>();
    
    // Mark starting neuron as activated
    activatedNeurons.add(startNeuronIndex);
    updatedNeurons[startNeuronIndex].isActive = true;
    
    // Find outgoing connections from this neuron
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      const sourceNeuron = updatedNeurons.find(
        n => Math.abs(n.x - conn.sourceX) < 1 && Math.abs(n.y - conn.sourceY) < 1
      );
      const targetNeuron = updatedNeurons.find(
        n => Math.abs(n.x - conn.targetX) < 1 && Math.abs(n.y - conn.targetY) < 1
      );
      
      if (sourceNeuron && targetNeuron) {
        const sourceIndex = updatedNeurons.indexOf(sourceNeuron);
        const targetIndex = updatedNeurons.indexOf(targetNeuron);
        
        if (activatedNeurons.has(sourceIndex)) {
          // Activate this connection
          updatedConnections[i].isActive = true;
          
          // Calculate target neuron activation based on weight and source value
          const activation = sourceNeuron.value * conn.weight;
          if (activation > activationThreshold) {
            updatedNeurons[targetIndex].isActive = true;
            activatedNeurons.add(targetIndex);
          }
        }
      }
    }
    
    return { neurons: updatedNeurons, connections: updatedConnections };
  };
  
  // Propagate signal through the network with animation
  const propagateSignal = (activeNeuronIndices: number[], currentLayer: number) => {
    if (currentLayer >= hiddenLayers.length + 1) return; // All layers processed
    
    const updatedNeurons = [...neurons];
    const updatedConnections = [...connections];
    const nextLayerNeurons: number[] = [];
    
    // Process current active neurons
    for (const neuronIdx of activeNeuronIndices) {
      const sourceNeuron = neurons[neuronIdx];
      
      // Find all connections from this neuron
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        
        // Check if this connection comes from the current neuron
        if (Math.abs(conn.sourceX - sourceNeuron.x) < 1 && Math.abs(conn.sourceY - sourceNeuron.y) < 1) {
          // Find target neuron
          const targetNeuronIdx = neurons.findIndex(
            n => Math.abs(n.x - conn.targetX) < 1 && Math.abs(n.y - conn.targetY) < 1
          );
          
          if (targetNeuronIdx >= 0) {
            // Update connection state
            updatedConnections[i] = { ...conn, isActive: true, animationProgress: 0 };
            
            // Animate signal along connection
            animateConnection(i, targetNeuronIdx, neuronIdx);
            
            nextLayerNeurons.push(targetNeuronIdx);
          }
        }
      }
    }
    
    // Schedule next layer activation
    if (nextLayerNeurons.length > 0) {
      const timer = setTimeout(() => {
        propagateSignal(nextLayerNeurons, currentLayer + 1);
      }, 700);
      
      setAnimation(timer);
    }
  };
  
  // Animate signal along a connection
  const animateConnection = (connectionIdx: number, targetNeuronIdx: number, sourceNeuronIdx: number) => {
    let progress = 0;
    const animationDuration = 600; // ms
    const startTime = Date.now();
    
    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / animationDuration, 1);
      
      setConnections(prev => {
        const updated = [...prev];
        updated[connectionIdx] = { ...updated[connectionIdx], animationProgress: progress };
        return updated;
      });
      
      // If animation completed, activate target neuron
      if (progress >= 1) {
        // Calculate activation based on weight and source value
        const activation = neurons[sourceNeuronIdx].value * connections[connectionIdx].weight;
        const shouldActivate = activation > activationThreshold;
        
        setNeurons(prev => {
          const updated = [...prev];
          updated[targetNeuronIdx] = { 
            ...updated[targetNeuronIdx], 
            isActive: shouldActivate,
            value: Math.max(0, Math.min(1, activation))
          };
          return updated;
        });
        return;
      }
      
      // Continue animation
      requestAnimationFrame(animateFrame);
    };
    
    requestAnimationFrame(animateFrame);
  };
  
  // Reset network activations
  const resetNetwork = () => {
    if (animation) {
      clearTimeout(animation);
    }
    
    setNeurons(prev => prev.map(n => ({ ...n, isActive: false, animationProgress: 0 })));
    setConnections(prev => prev.map(c => ({ ...c, isActive: false, animationProgress: 0 })));
    setActiveNeuron(null);
  };
  
  // Randomize network weights
  const randomizeWeights = () => {
    setConnections(prev => 
      prev.map(conn => ({
        ...conn,
        weight: Math.random() * 2 - 1, // Random weight between -1 and 1
      }))
    );
  };
  
  // Simulate one step of training
  const trainStep = () => {
    setTrainIteration(prev => prev + 1);
    
    // In a real network, here we would backpropagate errors and update weights
    // For demonstration, we'll just slightly adjust weights randomly
    setConnections(prev => 
      prev.map(conn => ({
        ...conn,
        weight: conn.weight + (Math.random() * 2 - 1) * learningRate
      }))
    );
    
    // Visualize the new weights with a propagation animation
    const randomInputNeuronIndex = Math.floor(Math.random() * inputCount);
    handleNeuronClick(neurons[randomInputNeuronIndex].id);
  };
  
  return (
    <div className="relative">
      {showControls && (
        <div className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-lg shadow-md space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={resetNetwork}
              className="text-xs h-7"
            >
              Reset
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={randomizeWeights}
              className="text-xs h-7"
            >
              Randomize Weights
            </Button>
            <Button 
              size="sm" 
              variant={networkMode === 'forward' ? 'default' : 'outline'} 
              onClick={() => setNetworkMode('forward')}
              className="text-xs h-7"
            >
              Forward Pass
            </Button>
            <Button 
              size="sm" 
              variant={networkMode === 'training' ? 'default' : 'outline'} 
              onClick={() => setNetworkMode('training')}
              className="text-xs h-7"
            >
              Training Mode
            </Button>
          </div>
          
          {networkMode === 'training' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs w-24">Learning Rate:</span>
                <Slider 
                  min={0.001}
                  max={0.1}
                  step={0.001}
                  value={[learningRate]}
                  onValueChange={(value) => setLearningRate(value[0])}
                  className="w-32"
                />
                <span className="text-xs">{learningRate.toFixed(3)}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={trainStep}
                  className="text-xs h-7"
                >
                  Train Step
                </Button>
                <Badge variant="outline">Iteration: {trainIteration}</Badge>
              </div>
            </>
          )}
          
          {networkMode === 'forward' && (
            <div className="flex items-center gap-2">
              <span className="text-xs w-24">Activation Threshold:</span>
              <Slider 
                min={0}
                max={1}
                step={0.05}
                value={[activationThreshold]}
                onValueChange={(value) => setActivationThreshold(value[0])}
                className="w-32"
              />
              <span className="text-xs">{activationThreshold.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute top-2 left-2 z-10 opacity-60 hover:opacity-100"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? '❌ Hide Controls' : '⚙️ Show Controls'}
        </Button>
        
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`} 
          className="bg-white dark:bg-gray-800"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            
            {/* Signal marker */}
            <marker 
              id="arrow" 
              viewBox="0 0 10 10" 
              refX="5" 
              refY="5"
              markerWidth="4" 
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={currentTheme.activeConnection} />
            </marker>
          </defs>
          
          {/* Connections */}
          {connections.map((connection, idx) => (
            <g key={`conn-${idx}`}>
              <line
                x1={connection.sourceX}
                y1={connection.sourceY}
                x2={connection.targetX}
                y2={connection.targetY}
                stroke={connection.isActive ? currentTheme.activeConnection : currentTheme.connection}
                strokeWidth={connection.isActive ? 2 : 1}
                strokeOpacity={connection.isActive ? 0.9 : 0.5}
              />
              
              {/* Signal animation along connection */}
              {connection.isActive && connection.animationProgress !== undefined && (
                <>
                  {/* Animated signal pulse */}
                  <circle
                    cx={connection.sourceX + (connection.targetX - connection.sourceX) * connection.animationProgress}
                    cy={connection.sourceY + (connection.targetY - connection.sourceY) * connection.animationProgress}
                    r={5}
                    fill={currentTheme.activationPath}
                  />
                </>
              )}
              
              {/* Weight label */}
              {showWeights && (
                <text
                  x={connection.sourceX + (connection.targetX - connection.sourceX) * 0.5}
                  y={connection.sourceY + (connection.targetY - connection.sourceY) * 0.5 - 5}
                  textAnchor="middle"
                  fontSize="8"
                  fill="currentColor"
                  className="select-none"
                >
                  {connection.weight.toFixed(2)}
                </text>
              )}
            </g>
          ))}
          
          {/* Neurons */}
          {neurons.map((neuron) => (
            <g key={neuron.id} onClick={() => handleNeuronClick(neuron.id)}>
              {/* Pulse animation for active neurons */}
              {neuron.isActive && (
                <circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={neuron.radius * 1.5}
                  fill="none"
                  stroke={currentTheme.activeNeuron}
                  strokeWidth={2}
                  strokeOpacity={0.5}
                  className="animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              )}
              
              {/* Main neuron circle */}
              <circle
                cx={neuron.x}
                cy={neuron.y}
                r={neuron.radius}
                fill={neuron.isActive ? currentTheme.activeNeuron : neuron.color}
                opacity={neuron.isActive ? 1 : 0.8}
                stroke={neuron.isActive ? currentTheme.activeNeuron : "none"}
                strokeWidth={2}
                className={interactive ? "cursor-pointer hover:opacity-100 transition-opacity" : ""}
              />
              
              {/* Value indicator inside neuron */}
              <circle
                cx={neuron.x}
                cy={neuron.y}
                r={neuron.radius * 0.6 * neuron.value}
                fill={neuron.isActive ? "white" : "rgba(255,255,255,0.6)"}
              />
              
              {/* Neuron label */}
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
              
              {/* Show neuron value */}
              {neuron.isActive && (
                <text
                  x={neuron.x}
                  y={neuron.y + neuron.radius + 15}
                  textAnchor="middle"
                  fontSize="9"
                  fill="currentColor"
                  className="select-none font-medium"
                >
                  {neuron.value.toFixed(2)}
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
      </div>
    </div>
  );
}
