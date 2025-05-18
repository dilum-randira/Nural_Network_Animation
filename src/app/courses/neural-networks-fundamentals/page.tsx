"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CodeExample } from '@/components/learning/CodeExample';
import { EducationalNeuralNetwork } from '@/components/learning/EducationalNeuralNetwork';
import { AuthenticatedContent } from '@/components/learning/AuthenticatedContent';

// Demo course content
const courseContent = [
  {
    id: 'introduction',
    title: 'Introduction to Neural Networks',
    content: `
      Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. 
      They are a fundamental component of machine learning and are behind many recent advances in artificial intelligence.
    `,
    accessLevel: 'free',
  },
  {
    id: 'perceptron',
    title: 'The Perceptron',
    content: `
      The perceptron is the simplest form of a neural network, consisting of a single neuron. It takes multiple 
      binary inputs and produces a single binary output. Despite its simplicity, this model is the foundation for 
      understanding more complex neural networks.
    `,
    accessLevel: 'free',
  },
  {
    id: 'multilayer',
    title: 'Multilayer Networks',
    content: `
      When we connect multiple perceptrons in layers, we create a multilayer network. These networks can model 
      complex relationships between inputs and outputs, making them powerful tools for classification and prediction tasks.
    `,
    accessLevel: 'basic',
  },
  {
    id: 'backpropagation',
    title: 'Backpropagation',
    content: `
      Backpropagation is the key algorithm for training neural networks. It calculates the gradient of the loss 
      function with respect to the weights of the network, allowing the network to learn from its errors.
    `,
    accessLevel: 'basic',
  },
  {
    id: 'activation-functions',
    title: 'Activation Functions',
    content: `
      Activation functions determine the output of a neural network. They introduce non-linear properties to the network, 
      enabling it to learn complex patterns and make sophisticated decisions.
    `,
    accessLevel: 'premium',
  }
];

const perceptronExample = `
// Simple perceptron implementation in JavaScript
class Perceptron {
  constructor(inputSize, learningRate = 0.1) {
    // Initialize weights with random values
    this.weights = Array(inputSize).fill().map(() => Math.random() * 2 - 1);
    this.bias = Math.random() * 2 - 1;
    this.learningRate = learningRate;
  }

  // Activation function (step function)
  activate(sum) {
    return sum > 0 ? 1 : 0;
  }

  // Forward pass
  predict(inputs) {
    // Calculate weighted sum
    const sum = inputs.reduce(
      (sum, input, i) => sum + input * this.weights[i], 
      this.bias
    );
    
    // Apply activation function
    return this.activate(sum);
  }

  // Train the perceptron
  train(inputs, target) {
    // Make prediction
    const prediction = this.predict(inputs);
    
    // Calculate error
    const error = target - prediction;
    
    // Update weights and bias
    this.weights = this.weights.map(
      (weight, i) => weight + this.learningRate * error * inputs[i]
    );
    this.bias = this.bias + this.learningRate * error;
    
    return error;
  }
}

// Example usage:
const perceptron = new Perceptron(2);
console.log("Initial weights:", perceptron.weights);

// Training data for AND gate
const trainingData = [
  { inputs: [0, 0], target: 0 },
  { inputs: [0, 1], target: 0 },
  { inputs: [1, 0], target: 0 },
  { inputs: [1, 1], target: 1 }
];

// Train for multiple epochs
for (let epoch = 0; epoch < 100; epoch++) {
  let totalError = 0;
  
  for (const data of trainingData) {
    const error = perceptron.train(data.inputs, data.target);
    totalError += Math.abs(error);
  }
  
  if (totalError === 0) {
    console.log("Converged at epoch", epoch);
    break;
  }
}

// Test the trained perceptron
console.log("Final weights:", perceptron.weights);
console.log("Final bias:", perceptron.bias);
console.log("Prediction [0, 0]:", perceptron.predict([0, 0]));
console.log("Prediction [0, 1]:", perceptron.predict([0, 1]));
console.log("Prediction [1, 0]:", perceptron.predict([1, 0]));
console.log("Prediction [1, 1]:", perceptron.predict([1, 1]));
`;

export default function NeuralNetworkFundamentals() {
  const [activeSection, setActiveSection] = useState('introduction');
  const activeContent = courseContent.find(section => section.id === activeSection);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="mb-12">
          <Link href="/courses" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
            ← Back to All Courses
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Neural Networks Fundamentals
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              Beginner
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              4 Weeks • 12 Lessons • 4 Exercises
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Course Content
              </h3>
              <nav className="space-y-2">
                {courseContent.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{section.title}</span>
                      {section.accessLevel !== 'free' && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                          {section.accessLevel === 'premium' ? (
                            <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                              Premium
                            </span>
                          ) : (
                            <span className="text-blue-500 dark:text-blue-400">
                              Basic
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Course Progress</h4>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-green-500" style={{ width: '20%' }}></div>
                </div>
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">20% Complete</p>
              </div>
            </div>
          </div>

          {/* Main Course Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeContent && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {activeContent.title}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{activeContent.content}</p>
                  </div>
                </div>

                {/* Section-specific content with authentication */}
                {activeSection === 'introduction' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">What is a Neural Network?</h3>
                      <p className="mb-4">
                        A neural network is a series of algorithms that endeavors to recognize underlying relationships 
                        in a set of data through a process that mimics the way the human brain operates.
                      </p>
                      
                      {/* Educational Neural Network Visualization - available to all */}
                      <div className="mt-8 h-80 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <EducationalNeuralNetwork 
                          inputCount={3}
                          hiddenLayers={[4, 4]}
                          outputCount={2}
                          interactive={true}
                          showLabels={true}
                        />
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        Click on neurons to see how activations flow through the network
                      </div>
                    </div>
                  </>
                )}
                
                {activeSection === 'perceptron' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Perceptron Structure</h3>
                      <p className="mb-6">
                        A perceptron takes multiple inputs, applies weights to them, sums them up, and then applies 
                        an activation function to produce an output.
                      </p>
                      
                      <div className="flex justify-center mb-8">
                        <svg className="w-64 h-48" viewBox="0 0 240 180">
                          {/* Input Neurons */}
                          <circle cx="40" cy="60" r="12" fill="#60A5FA" />
                          <circle cx="40" cy="120" r="12" fill="#60A5FA" />
                          
                          {/* Output Neuron */}
                          <circle cx="200" cy="90" r="12" fill="#F87171" />
                          
                          {/* Connections */}
                          <line x1="52" y1="60" x2="188" y2="90" stroke="#94A3B8" strokeWidth="2" />
                          <line x1="52" y1="120" x2="188" y2="90" stroke="#94A3B8" strokeWidth="2" />
                          
                          {/* Labels */}
                          <text x="40" y="40" textAnchor="middle" fontSize="12" fill="currentColor">Input 1</text>
                          <text x="40" y="150" textAnchor="middle" fontSize="12" fill="currentColor">Input 2</text>
                          <text x="200" y="70" textAnchor="middle" fontSize="12" fill="currentColor">Output</text>
                        </svg>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">Perceptron Implementation</h3>
                      <CodeExample 
                        code={perceptronExample}
                        language="javascript"
                        title="Perceptron Implementation"
                        runnable={true}
                        explanation="This code implements a perceptron that can learn the logical AND operation. The perceptron adjusts its weights through training until it can correctly classify all inputs."
                      />
                    </div>
                  </>
                )}
                
                {activeSection === 'multilayer' && (
                  <AuthenticatedContent requiredLevel="basic">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Multilayer Neural Networks</h3>
                      <p className="mb-4">
                        Multilayer networks, also known as multilayer perceptrons (MLPs), consist of at least three layers:
                        an input layer, one or more hidden layers, and an output layer.
                      </p>
                      
                      <div className="mt-8 h-80 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <EducationalNeuralNetwork 
                          inputCount={4}
                          hiddenLayers={[6, 5]}
                          outputCount={3}
                          interactive={true}
                          showLabels={true}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-2">Key Features of Multilayer Networks:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Multiple layers allow representation of non-linear decision boundaries</li>
                          <li>Hidden layers extract hierarchical features from the input data</li>
                          <li>Each additional layer increases the network's capacity to model complex patterns</li>
                          <li>Trained with backpropagation algorithm</li>
                        </ul>
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
                
                {activeSection === 'backpropagation' && (
                  <AuthenticatedContent requiredLevel="basic">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Backpropagation Algorithm</h3>
                      <p className="mb-4">
                        Backpropagation is a supervised learning algorithm that allows neural networks to learn from their mistakes.
                        It works by calculating the gradient of the loss function with respect to each weight in the network.
                      </p>
                      
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Backpropagation Steps:</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Forward propagation to compute prediction</li>
                          <li>Calculate error/loss at the output</li>
                          <li>Compute gradients from output to input layer</li>
                          <li>Update weights based on gradients and learning rate</li>
                          <li>Repeat for all training examples</li>
                        </ol>
                      </div>
                      
                      <div className="mt-6">
                        <CodeExample 
                          code={`// Simplified backpropagation pseudocode
function backpropagation(network, input, target, learningRate) {
  // 1. Forward pass - compute outputs
  const outputs = forwardPass(network, input);
  
  // 2. Compute output layer error
  const outputErrors = outputs.map((output, i) => 
    output * (1 - output) * (target[i] - output)
  );
  
  // 3. Backpropagate errors to hidden layers
  const hiddenErrors = computeHiddenErrors(network, outputErrors);
  
  // 4. Update weights using calculated errors
  updateWeights(network, learningRate, outputErrors, hiddenErrors);
  
  return computeTotalError(outputs, target);
}`}
                          language="javascript"
                          title="Backpropagation Algorithm"
                          explanation="This pseudocode illustrates the key steps of the backpropagation algorithm. In practice, frameworks like TensorFlow or PyTorch handle these computations efficiently using automatic differentiation."
                        />
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
                
                {activeSection === 'activation-functions' && (
                  <AuthenticatedContent requiredLevel="premium">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Activation Functions in Deep Learning</h3>
                      <p className="mb-4">
                        Activation functions introduce non-linearity into neural networks, allowing them to learn 
                        complex patterns. Different activation functions have distinct properties that make them 
                        suitable for different applications.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Sigmoid Function</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            σ(x) = 1 / (1 + e^(-x))
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Sigmoid function visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,50 Q 50,50 100,10 Q 150,0 200,0" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                              <line x1="100" y1="0" x2="100" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Range: (0, 1)</li>
                            <li>• Smooth gradient</li>
                            <li>• Prone to vanishing gradient</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">ReLU Function</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            ReLU(x) = max(0, x)
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* ReLU visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,50 L 100,50 L 200,0" fill="none" stroke="#F87171" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                              <line x1="100" y1="0" x2="100" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Range: [0, ∞)</li>
                            <li>• Simple computation</li>
                            <li>• Mitigates vanishing gradient</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Tanh Function</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Tanh visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 Q 50,80 100,50 Q 150,20 200,10" fill="none" stroke="#A855F7" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                              <line x1="100" y1="0" x2="100" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Range: (-1, 1)</li>
                            <li>• Zero-centered</li>
                            <li>• Still faces vanishing gradient</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Leaky ReLU</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            LeakyReLU(x) = max(αx, x) where α is small
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Leaky ReLU visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,55 L 100,50 L 200,0" fill="none" stroke="#10B981" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                              <line x1="100" y1="0" x2="100" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Range: (-∞, ∞)</li>
                            <li>• Prevents dying ReLU</li>
                            <li>• α typically set to 0.01</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-2">Activation Function Selection Guide:</h4>
                        <table className="min-w-full border border-gray-200 dark:border-gray-700">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                              <th className="px-4 py-2 border">Function</th>
                              <th className="px-4 py-2 border">Best For</th>
                              <th className="px-4 py-2 border">Considerations</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">ReLU</td>
                              <td className="px-4 py-2 border">Hidden layers in CNNs</td>
                              <td className="px-4 py-2 border">Watch for dead neurons</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">Sigmoid</td>
                              <td className="px-4 py-2 border">Binary classification</td>
                              <td className="px-4 py-2 border">Output layer only</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">Tanh</td>
                              <td className="px-4 py-2 border">RNNs</td>
                              <td className="px-4 py-2 border">Better than sigmoid for hidden layers</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">Softmax</td>
                              <td className="px-4 py-2 border">Multiclass output</td>
                              <td className="px-4 py-2 border">Output layer only</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}