"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Define color schemes
const colorSchemes = {
  blue: {
    neuron: "#60A5FA",
    activeNeuron: "#3B82F6",
    connection: "#94A3B8",
    activeConnection: "#2563EB",
    positive: "#10B981",
    negative: "#F87171"
  },
  purple: {
    neuron: "#A78BFA",
    activeNeuron: "#7C3AED",
    connection: "#94A3B8",
    activeConnection: "#7C3AED",
    positive: "#10B981",
    negative: "#F87171"
  }
};

// Simple dataset types for visualization
interface DataPoint {
  x: number;
  y: number;
  class: 0 | 1;
}

interface NetworkConfig {
  inputSize: number;
  hiddenLayerSizes: number[];
  outputSize: number;
}

interface NetworkTrainingProps {
  width?: number;
  height?: number;
  colorScheme?: 'blue' | 'purple';
  taskType?: 'classification' | 'regression';
  defaultConfig?: NetworkConfig;
}

interface Neuron {
  id: string;
  layer: number; // 0 = input, 1 = hidden, 2 = output, etc.
  index: number; // Position in layer
  x: number;
  y: number;
  value: number;
  activationValue: number;
  delta: number; // For backpropagation
  isActive: boolean;
}

interface Connection {
  id: string;
  fromId: string;
  toId: string;
  weight: number;
  prevWeight: number; // For animation
  gradientMagnitude: number;
  isActive: boolean;
}

interface Layer {
  neurons: Neuron[];
}

export function NeuralNetworkTrainingSimulator({
  width = 700,
  height = 400,
  colorScheme = 'blue',
  taskType = 'classification',
  defaultConfig = { inputSize: 2, hiddenLayerSizes: [4], outputSize: 1 }
}: NetworkTrainingProps) {
  const [networkLayers, setNetworkLayers] = useState<Layer[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [totalEpochs, setTotalEpochs] = useState(100);
  const [learningRate, setLearningRate] = useState(0.1);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [trainingInterval, setTrainingInterval] = useState<NodeJS.Timeout | null>(null);
  const [trainingSpeed, setTrainingSpeed] = useState(500); // ms between epochs
  const [trainingError, setTrainingError] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('network');
  const [datasetType, setDatasetType] = useState<'xor' | 'circle' | 'spiral'>('xor');
  
  const svgRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  
  // Colors for the current theme
  const colors = colorSchemes[colorScheme];
  
  // Initialize network
  useEffect(() => {
    createNetwork(defaultConfig);
    generateDataset(datasetType, 100);
  }, []);
  
  // Create network structure
  const createNetwork = (config: NetworkConfig) => {
    const { inputSize, hiddenLayerSizes, outputSize } = config;
    const layerSizes = [inputSize, ...hiddenLayerSizes, outputSize];
    
    // Calculate layout parameters
    const horizontalSpacing = width / (layerSizes.length + 1);
    
    const newLayers: Layer[] = [];
    const newConnections: Connection[] = [];
    let neuronIdCounter = 0;
    
    // Create neurons for each layer
    for (let layerIdx = 0; layerIdx < layerSizes.length; layerIdx++) {
      const layerSize = layerSizes[layerIdx];
      const verticalSpacing = height / (layerSize + 1);
      
      const neurons: Neuron[] = [];
      
      for (let i = 0; i < layerSize; i++) {
        const neuronId = `neuron-${neuronIdCounter++}`;
        
        neurons.push({
          id: neuronId,
          layer: layerIdx,
          index: i,
          x: horizontalSpacing * (layerIdx + 1),
          y: verticalSpacing * (i + 1),
          value: 0,
          activationValue: 0,
          delta: 0,
          isActive: false
        });
      }
      
      newLayers.push({ neurons });
      
      // Create connections to previous layer
      if (layerIdx > 0) {
        const prevLayer = newLayers[layerIdx - 1].neurons;
        
        for (const toNeuron of neurons) {
          for (const fromNeuron of prevLayer) {
            const connId = `conn-${fromNeuron.id}-${toNeuron.id}`;
            const initialWeight = (Math.random() * 2 - 1) * 0.5; // Random between -0.5 and 0.5
            
            newConnections.push({
              id: connId,
              fromId: fromNeuron.id,
              toId: toNeuron.id,
              weight: initialWeight,
              prevWeight: initialWeight,
              gradientMagnitude: 0,
              isActive: false
            });
          }
        }
      }
    }
    
    setNetworkLayers(newLayers);
    setConnections(newConnections);
    setTrainingError([]);
    setCurrentEpoch(0);
  };
  
  // Generate synthetic dataset
  const generateDataset = (type: string, size: number = 100) => {
    const newDataset: DataPoint[] = [];
    
    switch (type) {
      case 'xor':
        // XOR dataset
        newDataset.push({ x: 0, y: 0, class: 0 });
        newDataset.push({ x: 0, y: 1, class: 1 });
        newDataset.push({ x: 1, y: 0, class: 1 });
        newDataset.push({ x: 1, y: 1, class: 0 });
        break;
        
      case 'circle':
        // Circle dataset (points inside/outside a circle)
        for (let i = 0; i < size; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random();
          const x = 0.5 + Math.cos(angle) * radius;
          const y = 0.5 + Math.sin(angle) * radius;
          const isInCircle = radius < 0.5 ? 1 : 0;
          newDataset.push({ x, y, class: isInCircle as 0 | 1 });
        }
        break;
        
      case 'spiral':
        // Spiral dataset (two interleaving spirals)
        const n = size / 2;
        for (let i = 0; i < n; i++) {
          // First spiral (class 0)
          const angle0 = Math.PI * 4 * i / n;
          const radius0 = 0.5 * i / n;
          const x0 = 0.5 + Math.cos(angle0) * radius0;
          const y0 = 0.5 + Math.sin(angle0) * radius0;
          newDataset.push({ x: x0, y: y0, class: 0 });
          
          // Second spiral (class 1)
          const angle1 = Math.PI * 4 * i / n + Math.PI;
          const radius1 = 0.5 * i / n;
          const x1 = 0.5 + Math.cos(angle1) * radius1;
          const y1 = 0.5 + Math.sin(angle1) * radius1;
          newDataset.push({ x: x1, y: y1, class: 1 });
        }
        break;
        
      default:
        // Random dataset (fallback)
        for (let i = 0; i < size; i++) {
          const x = Math.random();
          const y = Math.random();
          const cls = (x > 0.5 && y > 0.5) || (x < 0.5 && y < 0.5) ? 1 : 0;
          newDataset.push({ x, y, class: cls as 0 | 1 });
        }
    }
    
    setDataset(newDataset);
    setTrainingError([]);
    setCurrentEpoch(0);
    
    // Reset network for new dataset
    resetNetwork();
  };
  
  // Reset network weights and activation values
  const resetNetwork = () => {
    setConnections(prev => prev.map(conn => ({
      ...conn,
      weight: (Math.random() * 2 - 1) * 0.5,
      prevWeight: 0,
      gradientMagnitude: 0,
      isActive: false
    })));
    
    setNetworkLayers(prev => prev.map(layer => ({
      neurons: layer.neurons.map(neuron => ({
        ...neuron,
        value: 0,
        activationValue: 0,
        delta: 0,
        isActive: false
      }))
    })));
    
    setTrainingError([]);
    setCurrentEpoch(0);
  };
  
  // Activation functions
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
  const sigmoidDerivative = (x: number) => {
    const sigX = sigmoid(x);
    return sigX * (1 - sigX);
  };
  
  // Forward pass through the network
  const forwardPass = (inputs: number[]) => {
    // Clone current state to make updates
    const newLayers = [...networkLayers];
    const newConnections = [...connections];
    
    // Reset network activation states
    for (const layer of newLayers) {
      for (const neuron of layer.neurons) {
        neuron.isActive = false;
      }
    }
    
    for (const conn of newConnections) {
      conn.isActive = false;
    }
    
    // Set input values
    for (let i = 0; i < inputs.length && i < newLayers[0].neurons.length; i++) {
      const inputNeuron = newLayers[0].neurons[i];
      inputNeuron.value = inputs[i];
      inputNeuron.activationValue = inputs[i];
      inputNeuron.isActive = true;
    }
    
    // Process each layer after input
    for (let layerIdx = 1; layerIdx < newLayers.length; layerIdx++) {
      const currentLayer = newLayers[layerIdx];
      const prevLayer = newLayers[layerIdx - 1];
      
      // For each neuron in the current layer
      for (const neuron of currentLayer.neurons) {
        // Find all incoming connections to this neuron
        const incomingConnections = newConnections.filter(conn => conn.toId === neuron.id);
        
        // Calculate weighted sum
        let weightedSum = 0;
        for (const conn of incomingConnections) {
          const fromNeuron = findNeuronById(conn.fromId, newLayers);
          if (fromNeuron) {
            weightedSum += fromNeuron.activationValue * conn.weight;
            // Activate this connection
            conn.isActive = true;
          }
        }
        
        // Apply activation function
        neuron.value = weightedSum;
        neuron.activationValue = sigmoid(weightedSum);
        neuron.isActive = true;
      }
    }
    
    // Return the output layer's activation values
    const outputLayer = newLayers[newLayers.length - 1];
    const outputs = outputLayer.neurons.map(n => n.activationValue);
    
    // Update state
    setNetworkLayers(newLayers);
    setConnections(newConnections);
    
    return outputs;
  };
  
  // Backpropagation
  const backpropagate = (inputs: number[], targetOutputs: number[]) => {
    // First, perform a forward pass to get all activation values
    const outputs = forwardPass(inputs);
    
    // Clone current state to make updates
    const newLayers = [...networkLayers];
    const newConnections = [...connections];
    
    // Calculate output layer error
    const outputLayer = newLayers[newLayers.length - 1];
    for (let i = 0; i < outputLayer.neurons.length; i++) {
      const neuron = outputLayer.neurons[i];
      const targetOutput = i < targetOutputs.length ? targetOutputs[i] : 0;
      const error = targetOutput - neuron.activationValue;
      neuron.delta = error * sigmoidDerivative(neuron.value);
    }
    
    // Calculate hidden layer errors (backpropagate)
    for (let layerIdx = newLayers.length - 2; layerIdx > 0; layerIdx--) {
      const currentLayer = newLayers[layerIdx];
      const nextLayer = newLayers[layerIdx + 1];
      
      for (const neuron of currentLayer.neurons) {
        // Find all connections from this neuron to the next layer
        const outgoingConnections = newConnections.filter(conn => conn.fromId === neuron.id);
        
        // Calculate weighted sum of deltas from next layer
        let errorSum = 0;
        for (const conn of outgoingConnections) {
          const toNeuron = findNeuronById(conn.toId, newLayers);
          if (toNeuron) {
            errorSum += toNeuron.delta * conn.weight;
          }
        }
        
        neuron.delta = errorSum * sigmoidDerivative(neuron.value);
      }
    }
    
    // Update weights
    for (const conn of newConnections) {
      const fromNeuron = findNeuronById(conn.fromId, newLayers);
      const toNeuron = findNeuronById(conn.toId, newLayers);
      
      if (fromNeuron && toNeuron) {
        const gradientDelta = toNeuron.delta * fromNeuron.activationValue;
        conn.prevWeight = conn.weight;
        conn.weight += learningRate * gradientDelta;
        conn.gradientMagnitude = Math.abs(gradientDelta);
      }
    }
    
    // Calculate total error
    let totalError = 0;
    for (let i = 0; i < outputLayer.neurons.length; i++) {
      const targetOutput = i < targetOutputs.length ? targetOutputs[i] : 0;
      totalError += Math.pow(targetOutput - outputLayer.neurons[i].activationValue, 2);
    }
    totalError /= outputLayer.neurons.length;
    
    // Update state
    setNetworkLayers(newLayers);
    setConnections(newConnections);
    
    return totalError;
  };
  
  // Helper function to find a neuron by ID
  const findNeuronById = (id: string, layers: Layer[]) => {
    for (const layer of layers) {
      const found = layer.neurons.find(n => n.id === id);
      if (found) return found;
    }
    return null;
  };
  
  // Perform one epoch of training
  const trainEpoch = () => {
    let epochError = 0;
    
    // Train on each data point
    for (const dataPoint of dataset) {
      const inputs = [dataPoint.x, dataPoint.y];
      const targets = [dataPoint.class];
      
      const error = backpropagate(inputs, targets);
      epochError += error;
    }
    
    epochError /= dataset.length;
    
    // Update error history
    setTrainingError(prev => [...prev, epochError]);
    setCurrentEpoch(prev => prev + 1);
    
    return epochError;
  };
  
  // Start/stop training process
  const toggleTraining = () => {
    if (trainingInProgress) {
      // Stop training
      if (trainingInterval) {
        clearInterval(trainingInterval);
        setTrainingInterval(null);
      }
      setTrainingInProgress(false);
    } else {
      // Start training
      setTrainingInProgress(true);
      const interval = setInterval(() => {
        if (currentEpoch >= totalEpochs) {
          clearInterval(interval);
          setTrainingInProgress(false);
          setTrainingInterval(null);
          return;
        }
        
        trainEpoch();
      }, trainingSpeed);
      
      setTrainingInterval(interval);
    }
  };
  
  // Test the current network on a specific input
  const testInput = (x: number, y: number) => {
    const outputs = forwardPass([x, y]);
    return outputs[0] > 0.5 ? 1 : 0;
  };
  
  // Generate decision boundary plot
  const generateDecisionBoundary = () => {
    const gridSize = 20;
    const boundary: { x: number, y: number, cls: number }[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i / (gridSize - 1);
        const y = j / (gridSize - 1);
        const cls = testInput(x, y);
        boundary.push({ x, y, cls });
      }
    }
    
    return boundary;
  };
  
  // Draw error plot
  const drawErrorPlot = () => {
    if (trainingError.length === 0) return null;
    
    const chartWidth = width;
    const chartHeight = 200;
    const padding = 30;
    
    const xScale = (chartWidth - padding * 2) / Math.max(trainingError.length - 1, 1);
    const yMax = Math.max(...trainingError) * 1.1;
    const yScale = (chartHeight - padding * 2) / yMax;
    
    let pathData = "";
    
    trainingError.forEach((error, i) => {
      const x = padding + i * xScale;
      const y = chartHeight - padding - (error * yScale);
      if (i === 0) {
        pathData += `M ${x},${y} `;
      } else {
        pathData += `L ${x},${y} `;
      }
    });
    
    return (
      <svg ref={chartRef} width={chartWidth} height={chartHeight} className="bg-white dark:bg-gray-800 rounded-lg mt-4">
        {/* X and Y axis */}
        <line 
          x1={padding} 
          y1={chartHeight - padding} 
          x2={chartWidth - padding} 
          y2={chartHeight - padding} 
          stroke="currentColor" 
          strokeWidth={1} 
        />
        <line 
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={chartHeight - padding} 
          stroke="currentColor" 
          strokeWidth={1} 
        />
        
        {/* Y axis labels */}
        <text x={padding - 10} y={padding} textAnchor="end" fontSize={10} fill="currentColor">
          {yMax.toFixed(2)}
        </text>
        <text x={padding - 10} y={chartHeight - padding} textAnchor="end" fontSize={10} fill="currentColor">
          0
        </text>
        
        {/* X axis labels */}
        <text x={padding} y={chartHeight - padding + 15} textAnchor="middle" fontSize={10} fill="currentColor">
          0
        </text>
        <text 
          x={chartWidth - padding} 
          y={chartHeight - padding + 15} 
          textAnchor="middle" 
          fontSize={10} 
          fill="currentColor"
        >
          {trainingError.length}
        </text>
        
        {/* Axis titles */}
        <text 
          x={chartWidth / 2} 
          y={chartHeight - 5} 
          textAnchor="middle" 
          fontSize={12}
          fill="currentColor"
        >
          Epochs
        </text>
        <text 
          x={10} 
          y={chartHeight / 2} 
          textAnchor="middle" 
          fontSize={12} 
          fill="currentColor"
          transform={`rotate(-90, 10, ${chartHeight / 2})`}
        >
          Error
        </text>
        
        {/* Error curve */}
        <path 
          d={pathData} 
          fill="none" 
          stroke={colors.activeNeuron} 
          strokeWidth={2} 
        />
        
        {/* Current epoch marker */}
        {currentEpoch > 0 && currentEpoch <= trainingError.length && (
          <circle 
            cx={padding + (currentEpoch - 1) * xScale} 
            cy={chartHeight - padding - (trainingError[currentEpoch - 1] * yScale)} 
            r={4} 
            fill={colors.activeNeuron} 
          />
        )}
      </svg>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <Tabs defaultValue="network" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="network">Network Visualization</TabsTrigger>
          <TabsTrigger value="training">Training Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="network">
          <div className="mb-4 flex flex-wrap gap-2">
            <Button 
              size="sm" 
              onClick={resetNetwork}
              variant="outline"
              disabled={trainingInProgress}
            >
              Reset Network
            </Button>
            
            <Button 
              size="sm" 
              onClick={toggleTraining}
              variant={trainingInProgress ? "destructive" : "default"}
            >
              {trainingInProgress ? "Stop Training" : "Start Training"}
            </Button>
            
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm">Dataset:</span>
              <Button 
                size="sm" 
                variant={datasetType === 'xor' ? "default" : "outline"}
                onClick={() => generateDataset('xor')}
                disabled={trainingInProgress}
              >
                XOR
              </Button>
              <Button 
                size="sm" 
                variant={datasetType === 'circle' ? "default" : "outline"}
                onClick={() => generateDataset('circle')}
                disabled={trainingInProgress}
              >
                Circle
              </Button>
              <Button 
                size="sm" 
                variant={datasetType === 'spiral' ? "default" : "outline"}
                onClick={() => generateDataset('spiral')}
                disabled={trainingInProgress}
              >
                Spiral
              </Button>
            </div>
          </div>
          
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Learning Rate:</span>
              <Slider 
                min={0.01}
                max={0.5}
                step={0.01}
                value={[learningRate]}
                onValueChange={(value) => setLearningRate(value[0])}
                className="w-32"
                disabled={trainingInProgress}
              />
              <span className="text-sm">{learningRate.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Total Epochs:</span>
              <Slider 
                min={10}
                max={500}
                step={10}
                value={[totalEpochs]}
                onValueChange={(value) => setTotalEpochs(value[0])}
                className="w-32"
                disabled={trainingInProgress}
              />
              <span className="text-sm">{totalEpochs}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Training Speed:</span>
              <Slider 
                min={50}
                max={1000}
                step={50}
                value={[trainingSpeed]}
                onValueChange={(value) => setTrainingSpeed(value[0])}
                className="w-32"
                disabled={trainingInProgress}
              />
              <span className="text-sm">{trainingSpeed}ms</span>
            </div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Network visualization */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <svg 
                ref={svgRef}
                width={width} 
                height={height} 
                viewBox={`0 0 ${width} ${height}`} 
                className="bg-gray-50 dark:bg-gray-900"
              >
                {/* Connections */}
                {connections.map((conn) => {
                  const fromNeuron = findNeuronById(conn.fromId, networkLayers);
                  const toNeuron = findNeuronById(conn.toId, networkLayers);
                  
                  if (!fromNeuron || !toNeuron) return null;
                  
                  // Determine connection color based on weight
                  const opacity = Math.min(Math.abs(conn.weight) * 2, 1);
                  const strokeColor = conn.weight > 0 
                    ? `rgba(16, 185, 129, ${opacity})` // Green for positive
                    : `rgba(248, 113, 113, ${opacity})`; // Red for negative
                  
                  return (
                    <g key={conn.id}>
                      <line
                        x1={fromNeuron.x}
                        y1={fromNeuron.y}
                        x2={toNeuron.x}
                        y2={toNeuron.y}
                        stroke={conn.isActive ? colors.activeConnection : strokeColor}
                        strokeWidth={conn.isActive ? 3 : Math.max(Math.abs(conn.weight) * 4, 1)}
                        strokeOpacity={conn.isActive ? 1 : 0.7}
                      />
                      
                      {/* Weight label */}
                      <text
                        x={(fromNeuron.x + toNeuron.x) / 2}
                        y={(fromNeuron.y + toNeuron.y) / 2 - 5}
                        textAnchor="middle"
                        fontSize="9"
                        fill="currentColor"
                        className="select-none"
                      >
                        {conn.weight.toFixed(2)}
                      </text>
                    </g>
                  );
                })}
                
                {/* Neurons */}
                {networkLayers.map((layer, layerIdx) =>
                  layer.neurons.map((neuron) => (
                    <g key={neuron.id}>
                      <circle
                        cx={neuron.x}
                        cy={neuron.y}
                        r={12}
                        fill={neuron.isActive ? colors.activeNeuron : colors.neuron}
                        strokeWidth={2}
                        stroke={neuron.isActive ? colors.activeNeuron : "none"}
                        opacity={neuron.isActive ? 1 : 0.7}
                      />
                      
                      {/* Inner circle showing activation value */}
                      {layerIdx > 0 && (
                        <circle
                          cx={neuron.x}
                          cy={neuron.y}
                          r={neuron.activationValue * 10}
                          fill={neuron.isActive ? "white" : "rgba(255,255,255,0.6)"}
                        />
                      )}
                      
                      {/* Value label */}
                      <text
                        x={neuron.x}
                        y={neuron.y + 25}
                        textAnchor="middle"
                        fontSize="10"
                        fill="currentColor"
                        className="select-none"
                      >
                        {neuron.activationValue.toFixed(2)}
                      </text>
                      
                      {/* Layer label */}
                      {neuron.index === 0 && (
                        <text
                          x={neuron.x}
                          y={15}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill="currentColor"
                          className="select-none"
                        >
                          {layerIdx === 0 
                            ? 'Input Layer' 
                            : layerIdx === networkLayers.length - 1 
                              ? 'Output Layer' 
                              : `Hidden Layer ${layerIdx}`
                          }
                        </text>
                      )}
                    </g>
                  ))
                )}
                
                {/* Epoch counter */}
                <text
                  x={width - 10}
                  y={20}
                  textAnchor="end"
                  fontSize="14"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  Epoch: {currentEpoch} / {totalEpochs}
                </text>
                
                {trainingError.length > 0 && (
                  <text
                    x={width - 10}
                    y={40}
                    textAnchor="end"
                    fontSize="12"
                    fill="currentColor"
                  >
                    Error: {trainingError[trainingError.length - 1].toFixed(4)}
                  </text>
                )}
              </svg>
            </div>
            
            {/* Dataset visualization and decision boundary */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <svg 
                width={width} 
                height={height} 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                className="bg-gray-50 dark:bg-gray-900"
              >
                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((pos) => (
                  <line 
                    key={`vline-${pos}`}
                    x1={pos} 
                    y1={0} 
                    x2={pos} 
                    y2={100} 
                    stroke="#e5e7eb" 
                    strokeWidth={0.5} 
                    strokeDasharray="2" 
                  />
                ))}
                {[0, 20, 40, 60, 80, 100].map((pos) => (
                  <line 
                    key={`hline-${pos}`}
                    x1={0} 
                    y1={pos} 
                    x2={100} 
                    y2={pos} 
                    stroke="#e5e7eb" 
                    strokeWidth={0.5} 
                    strokeDasharray="2" 
                  />
                ))}
                
                {/* Decision boundary visualization */}
                {currentEpoch > 0 && generateDecisionBoundary().map((point, i) => (
                  <rect
                    key={`boundary-${i}`}
                    x={point.x * 100 - 2.5}
                    y={point.y * 100 - 2.5}
                    width={5}
                    height={5}
                    fill={point.cls === 1 ? "rgba(16, 185, 129, 0.2)" : "rgba(248, 113, 113, 0.2)"}
                  />
                ))}
                
                {/* Dataset points */}
                {dataset.map((point, i) => (
                  <circle
                    key={`point-${i}`}
                    cx={point.x * 100}
                    cy={point.y * 100}
                    r={3}
                    fill={point.class === 1 ? colors.positive : colors.negative}
                    stroke="white"
                    strokeWidth={1}
                  />
                ))}
                
                {/* Axis labels */}
                <text x={50} y={98} textAnchor="middle" fontSize={4} fill="currentColor">X</text>
                <text x={2} y={50} textAnchor="middle" fontSize={4} fill="currentColor">Y</text>
                
                {/* Dataset type label */}
                <text x={50} y={10} textAnchor="middle" fontSize={6} fontWeight="bold" fill="currentColor">
                  Dataset: {datasetType.charAt(0).toUpperCase() + datasetType.slice(1)}
                </text>
              </svg>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Training Progress</h3>
              <Badge variant={trainingInProgress ? "default" : "outline"}>
                {trainingInProgress ? "Training..." : "Idle"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold">{currentEpoch}</div>
                <div className="text-xs text-gray-500">Current Epoch</div>
              </Card>
              
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold">{totalEpochs}</div>
                <div className="text-xs text-gray-500">Total Epochs</div>
              </Card>
              
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold">
                  {trainingError.length > 0 
                    ? trainingError[trainingError.length - 1].toFixed(4) 
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-500">Current Error</div>
              </Card>
            </div>
            
            {/* Error plot */}
            {drawErrorPlot()}
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Learning Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Learning Rate:</span>
                  <Slider 
                    min={0.01}
                    max={0.5}
                    step={0.01}
                    value={[learningRate]}
                    onValueChange={(value) => setLearningRate(value[0])}
                    className="w-32"
                    disabled={trainingInProgress}
                  />
                  <span className="text-sm">{learningRate.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Total Epochs:</span>
                  <Slider 
                    min={10}
                    max={500}
                    step={10}
                    value={[totalEpochs]}
                    onValueChange={(value) => setTotalEpochs(value[0])}
                    className="w-32"
                    disabled={trainingInProgress}
                  />
                  <span className="text-sm">{totalEpochs}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={toggleTraining}
                    variant={trainingInProgress ? "destructive" : "default"}
                    className="w-full"
                  >
                    {trainingInProgress ? "Stop Training" : "Start Training"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
