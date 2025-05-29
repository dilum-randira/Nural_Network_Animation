"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivationFunctionVisualizer } from "@/components/visualizations/ActivationFunctionVisualizer";
import { LossFunctionVisualizer } from "@/components/visualizations/LossFunctionVisualizer";
import { NeuralNetworkTrainingSimulator } from "@/components/visualizations/NeuralNetworkTrainingSimulator";
import { EnhancedEducationalNeuralNetwork } from "@/components/learning/EnhancedEducationalNeuralNetwork";

export const metadata = {
  title: "Interactive Neural Network Visualizations | Neural Network Explorer",
  description: "Explore neural networks through interactive visualizations. Learn about activation functions, loss functions, and network training."
};

export default function Visualizations() {
  const [activeTab, setActiveTab] = useState("activation");
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Interactive Neural Network Visualizations
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Explore neural networks through interactive visualizations and simulations
          </p>
        </div>
        
        {/* Main content */}
        <div className="mb-12">
          <Tabs defaultValue="activation" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="activation">Activation Functions</TabsTrigger>
              <TabsTrigger value="loss">Loss Functions</TabsTrigger>
              <TabsTrigger value="network">Network Visualization</TabsTrigger>
              <TabsTrigger value="simulator">Training Simulator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activation" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Activation Functions Explorer</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns.
                  Interact with the visualization below to explore different activation functions and their properties.
                </p>
                
                <div className="mt-8 flex justify-center">
                  <ActivationFunctionVisualizer 
                    width={600} 
                    height={300}
                    defaultFunction="sigmoid"
                    interactive={true}
                  />
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">How to use this visualization:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Select different activation functions using the tabs at the top</li>
                    <li>Hover over the graph to see function values at specific points</li>
                    <li>Notice how the derivative (shown by the gradient colors below the curve) changes</li>
                    <li>For Leaky ReLU, adjust the α parameter to see how it affects the negative values</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="loss" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Loss Functions Explorer</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Loss functions measure the difference between a model's predictions and the actual values.
                  They guide the learning process by providing a signal for how to update the model's weights.
                </p>
                
                <div className="mt-8 flex justify-center">
                  <LossFunctionVisualizer 
                    width={600} 
                    height={300}
                    defaultFunction="mse"
                    interactive={true}
                  />
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">How to use this visualization:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Select different loss functions using the tabs</li>
                    <li>Adjust the "Prediction" slider to see how the loss changes as predictions move away from the actual value</li>
                    <li>Change the "Actual value" to see how the loss function responds to different targets</li>
                    <li>For Huber loss, adjust the δ parameter to see how it balances MSE and MAE behaviors</li>
                    <li>Observe the gradient value which indicates the direction and magnitude of weight updates during training</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Neural Network Architecture Explorer</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Visualize how neural networks process information through layers of neurons.
                  This interactive visualization allows you to observe signal propagation and understand 
                  how networks transform inputs into outputs.
                </p>
                
                <div className="mt-8 flex justify-center">
                  <EnhancedEducationalNeuralNetwork 
                    inputCount={4}
                    hiddenLayers={[5, 3]}
                    outputCount={2}
                    interactive={true}
                    showLabels={true}
                    theme="purple"
                    showWeights={true}
                    animateSignals={true}
                  />
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">How to use this visualization:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Click on any neuron to see how activation signals propagate through the network</li>
                    <li>Use the "Randomize Weights" button to generate new random connection weights</li>
                    <li>Adjust the activation threshold to see how it affects signal propagation</li>
                    <li>Switch to "Training Mode" to see how weights change during the learning process</li>
                    <li>Choose different color themes to visualize the network in different styles</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="simulator" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Neural Network Training Simulator</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Watch a neural network learn in real-time with this interactive simulator.
                  Visualize how weights and activations change during training as the network learns to solve
                  classification problems.
                </p>
                
                <div className="mt-8">
                  <NeuralNetworkTrainingSimulator 
                    width={700}
                    height={400}
                    colorScheme="purple"
                    taskType="classification"
                    defaultConfig={{ inputSize: 2, hiddenLayerSizes: [4], outputSize: 1 }}
                  />
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">How to use this simulator:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Choose a dataset (XOR, Circle, or Spiral) to train the network on</li>
                    <li>Click "Start Training" to begin the learning process</li>
                    <li>Observe how connection weights (represented by line thickness and color) change over time</li>
                    <li>Switch to the "Training Progress" tab to see error curves and detailed metrics</li>
                    <li>Adjust the learning rate, training speed, and total epochs to see how they affect learning</li>
                    <li>Watch the decision boundary form on the right-hand visualization as the network learns</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Explore our comprehensive neural networks fundamentals course to build a solid understanding of these concepts.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <a href="/courses/neural-networks-fundamentals">Go to Neural Networks Course</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
