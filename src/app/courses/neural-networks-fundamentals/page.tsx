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
  },
  {
    id: 'loss-functions',
    title: 'Loss Functions',
    content: `
      Loss functions measure how well a neural network performs by quantifying the difference between predicted outputs 
      and actual target values. Different loss functions are suited for different types of tasks, such as regression, 
      binary classification, or multi-class classification.
    `,
    accessLevel: 'basic',
  },
  {
    id: 'optimization',
    title: 'Optimization Techniques',
    content: `
      Training neural networks involves finding the optimal weights that minimize the loss function. Various optimization 
      algorithms like Gradient Descent, Adam, and RMSprop have been developed to make this process more efficient and effective.
    `,
    accessLevel: 'premium',
  },
  {
    id: 'applications',
    title: 'Real-world Applications',
    content: `
      Neural networks power a wide range of applications across different domains. From image recognition and natural language 
      processing to medical diagnosis and autonomous vehicles, neural networks have transformed how we solve complex problems.
    `,
    accessLevel: 'free',
  },
  {
    id: 'practical-example',
    title: 'Practical Example: Digit Recognition',
    content: `
      In this section, we'll build a simple neural network to recognize handwritten digits. This practical example will 
      illustrate how concepts like activation functions, loss functions, and optimization techniques come together in a real application.
    `,
    accessLevel: 'premium',
  },
  {
    id: 'conclusion',
    title: 'Conclusion & Next Steps',
    content: `
      Congratulations on completing the Neural Networks Fundamentals course! In this section, we'll summarize what you've learned
      and suggest ways to continue your neural network journey with more advanced topics and practical applications.
    `,
    accessLevel: 'free',
  },
  {
    id: 'loss-functions',
    title: 'Loss Functions',
    content: `
      Loss functions measure how well a neural network performs by quantifying the difference between predicted outputs 
      and actual target values. Different loss functions are suited for different types of tasks, such as regression, 
      binary classification, or multi-class classification.
    `,
    accessLevel: 'basic',
  },
  {
    id: 'optimization',
    title: 'Optimization Techniques',
    content: `
      Training neural networks involves finding the optimal weights that minimize the loss function. Various optimization 
      algorithms like Gradient Descent, Adam, and RMSprop have been developed to make this process more efficient and effective.
    `,
    accessLevel: 'premium',
  },
  {
    id: 'applications',
    title: 'Real-world Applications',
    content: `
      Neural networks power a wide range of applications across different domains. From image recognition and natural language 
      processing to medical diagnosis and autonomous vehicles, neural networks have transformed how we solve complex problems.
    `,
    accessLevel: 'free',
  },
  {
    id: 'practical-example',
    title: 'Practical Example: Digit Recognition',
    content: `
      In this section, we'll build a simple neural network to recognize handwritten digits. This practical example will 
      illustrate how concepts like activation functions, loss functions, and optimization techniques come together in a real application.
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
                      <h3 className="text-xl font-bold mb-4">Welcome to Neural Networks Fundamentals</h3>
                      <p className="mb-4">
                        Welcome to this comprehensive course on Neural Networks Fundamentals! Whether you're a beginner
                        just starting your journey into machine learning or someone looking to strengthen your understanding
                        of neural networks, this course is designed to provide you with a solid foundation in this exciting field.
                      </p>
                      
                      <p className="mb-4">
                        Throughout this course, you'll learn:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mb-6">
                        <li>The core concepts and architecture of neural networks</li>
                        <li>How neural networks learn from data using backpropagation</li>
                        <li>Different types of activation and loss functions</li>
                        <li>Optimization techniques to train effective models</li>
                        <li>Real-world applications and practical examples</li>
                      </ul>
                      
                      <p className="mb-6">
                        By the end of this course, you'll have both theoretical knowledge and practical skills
                        to build your own neural networks for a variety of applications. Let's begin this exciting journey together!
                      </p>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                        <h4 className="font-medium mb-2">Course Structure</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          This course is organized into progressive modules:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400">
                          <li>We'll start with the basics and history of neural networks</li>
                          <li>Then explore the perceptron as the fundamental building block</li>
                          <li>Move on to multilayer networks and their capabilities</li>
                          <li>Learn how backpropagation enables learning</li>
                          <li>Dive into activation functions, loss functions, and optimization techniques</li>
                          <li>Finally, examine real-world applications and work through practical examples</li>
                        </ol>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">What is a Neural Network?</h3>
                      <p className="mb-4">
                        A neural network is a series of algorithms that endeavors to recognize underlying relationships 
                        in a set of data through a process that mimics the way the human brain operates.
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-2">Historical Context</h4>
                      <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          The journey of neural networks began in the 1940s with the first mathematical model of a neural network
                          by Warren McCulloch and Walter Pitts. Here are some key milestones:
                        </p>                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <li><span className="font-medium">1958:</span> Frank Rosenblatt developed the perceptron, the first neural network implementation.</li>
                          <li><span className="font-medium">1969:</span> Minsky and Papert published "Perceptrons," highlighting limitations of single-layer networks.</li>
                          <li><span className="font-medium">1980s:</span> The backpropagation algorithm was popularized, enabling efficient training of multilayer networks.</li>
                          <li><span className="font-medium">1990s-2000s:</span> Support Vector Machines and other methods overshadowed neural networks.</li>
                          <li><span className="font-medium">2010s:</span> Deep learning revolution began with breakthroughs in computing power, big data, and algorithms.</li>
                          <li><span className="font-medium">Present:</span> Neural networks are foundational to modern AI across virtually all domains.</li>
                        </ul>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">Neural Network Architecture</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Neural networks consist of interconnected layers of artificial neurons. Let's explore the key components:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-medium mb-2">Neurons (Nodes)</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            The basic computational units that:
                          </p>
                          <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400">
                            <li>Receive inputs from previous layers</li>
                            <li>Apply weights to these inputs</li>
                            <li>Sum the weighted inputs plus a bias</li>
                            <li>Pass the result through an activation function</li>
                            <li>Forward the output to the next layer</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-medium mb-2">Layers</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            Neural networks are structured in layers:
                          </p>
                          <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400">
                            <li><strong>Input Layer:</strong> Receives initial data values</li>
                            <li><strong>Hidden Layers:</strong> Process information and extract features</li>
                            <li><strong>Output Layer:</strong> Produces final predictions or decisions</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-medium mb-2">Weights & Biases</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            The adjustable parameters that determine network behavior:
                          </p>
                          <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400">
                            <li><strong>Weights:</strong> Control the strength of connections between neurons</li>
                            <li><strong>Biases:</strong> Allow nodes to shift the activation function</li>
                            <li>Both are adjusted during the learning process</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-medium mb-2">Activation Functions</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            Non-linear functions that determine neuron output:
                          </p>
                          <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400">
                            <li>Introduce non-linearity to handle complex patterns</li>
                            <li>Common functions: ReLU, Sigmoid, Tanh, Softmax</li>
                            <li>Each has specific properties and use cases</li>
                          </ul>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">The Learning Process</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Neural networks "learn" by adjusting their weights and biases through these steps:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <li><strong>Forward Propagation:</strong> Input data passes through the network to produce an output</li>
                        <li><strong>Loss Calculation:</strong> The difference between predicted and actual output is measured</li>
                        <li><strong>Backward Propagation:</strong> The error is propagated backward through the network</li>
                        <li><strong>Weight Updates:</strong> Weights and biases are adjusted to minimize the error</li>
                        <li><strong>Iteration:</strong> The process repeats with more data samples until satisfactory results</li>
                      </ol>
                      
                      <h4 className="text-lg font-semibold mb-2">Core Principles</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Neural networks are built on three fundamental principles:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h5 className="font-medium mb-2">Parallel Processing</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Like the human brain, neural networks process information in parallel rather than sequentially,
                            allowing them to handle complex patterns more efficiently.
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <h5 className="font-medium mb-2">Distributed Representation</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Information is stored across many connections rather than in specific locations,
                            creating a robust and fault-tolerant system.
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h5 className="font-medium mb-2">Learning from Data</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Neural networks improve through exposure to examples, adjusting their internal parameters
                            to minimize errors in predictions.
                          </p>
                        </div>
                      </div>
                      
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
                          </div>                          <ul className="mt-2 text-sm space-y-1">
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
                
                {activeSection === 'loss-functions' && (
                  <AuthenticatedContent requiredLevel="basic">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Loss Functions in Neural Networks</h3>
                      <p className="mb-4">
                        Loss functions are crucial for training neural networks as they quantify the difference between the predicted 
                        output and the actual target values. The choice of loss function can significantly impact the network's performance.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Mean Squared Error (MSE)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            MSE = (1/n) * Σ(actual - predicted)²
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* MSE visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <line x1="0" y1="80" x2="200" y2="20" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="20" x2="200" y2="80" stroke="#F87171" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Commonly used for regression tasks</li>
                            <li>• Sensitive to outliers</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Binary Cross-Entropy Loss</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            BCE = - (1/n) * Σ[actual * log(predicted) + (1 - actual) * log(1 - predicted)]
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* BCE visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,80 Q 50,10 100,10 Q 150,10 200,80" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Ideal for binary classification problems</li>
                            <li>• Outputs a probability value between 0 and 1</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Categorical Cross-Entropy Loss</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            CCE = - (1/n) * Σactual * log(predicted)
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* CCE visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,80 Q 50,10 100,10 Q 150,10 200,80" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Used for multi-class classification tasks</li>
                            <li>• Requires one-hot encoded labels</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Hinge Loss</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Hinge = (1/n) * Σmax(0, 1 - actual * predicted)
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Hinge loss visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 L 100,10 L 200,90" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Commonly used for "maximum-margin" classification, most notably for support vector machines</li>
                            <li>• Not suitable for probabilistic interpretations</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-2">Choosing the Right Loss Function:</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          The choice of loss function depends on the specific task, the output of the neural network, and the desired properties of the solution. Here's a quick guide:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><span className="font-medium">Regression tasks:</span> Use Mean Squared Error (MSE) or Mean Absolute Error (MAE).</li>
                          <li><span className="font-medium">Binary classification:</span> Use Binary Cross-Entropy Loss.</li>
                          <li><span className="font-medium">Multi-class classification:</span> Use Categorical Cross-Entropy Loss.</li>
                          <li><span className="font-medium">Maximum-margin classification:</span> Use Hinge Loss.</li>
                        </ul>
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
                
                {activeSection === 'optimization' && (
                  <AuthenticatedContent requiredLevel="premium">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Optimization Techniques for Neural Networks</h3>
                      <p className="mb-4">
                        Optimization algorithms are essential for training neural networks as they adjust the weights to minimize the loss function. 
                        Several optimization techniques have been developed, each with its own advantages and use cases.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Gradient Descent</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            A first-order iterative optimization algorithm for finding the minimum of a function.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Gradient Descent visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 Q 50,10 100,10 Q 150,10 200,90" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Simple to implement</li>
                            <li>• Can be slow to converge</li>
                            <li>• Prone to getting stuck in local minima</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Stochastic Gradient Descent (SGD)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            A variant of gradient descent where the update is performed for each training example.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* SGD visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 Q 50,10 100,10 Q 150,10 200,90" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Faster convergence than standard gradient descent</li>
                            <li>• More noisy updates can help escape local minima</li>
                            <li>• Requires careful tuning of learning rate</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Adam Optimizer</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            An adaptive learning rate optimization algorithm that's been designed specifically for training deep neural networks.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Adam visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 Q 50,10 100,10 Q 150,10 200,90" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Combines advantages of Adagrad and RMSProp</li>
                            <li>• Well-suited for problems with large data and/or parameters</li>
                            <li>• Generally requires less tuning of hyperparameters</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">RMSprop</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            An adaptive learning rate method designed to tackle the problem of diminishing learning rates in standard gradient descent.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* RMSprop visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <path d="M 0,90 Q 50,10 100,10 Q 150,10 200,90" fill="none" stroke="#3B82F6" strokeWidth="2" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4" />
                            </svg>
                          </div>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• Maintains a moving average of the squared gradients</li>
                            <li>• Effective in dealing with non-stationary objectives</li>
                            <li>• Requires careful tuning of learning rate</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-2">Tips for Choosing an Optimization Algorithm:</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          The choice of optimization algorithm can depend on various factors including the size of the dataset, the complexity of the model, and the available computational resources. Here are some tips:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><span className="font-medium">For small to medium-sized datasets:</span> Standard Gradient Descent or Stochastic Gradient Descent can be effective.</li>
                          <li><span className="font-medium">For large datasets:</span> Consider using mini-batch gradient descent, Adam, or RMSprop.</li>
                          <li><span className="font-medium">For problems with sparse gradients:</span> Adam or RMSprop are generally good choices.</li>
                          <li><span className="font-medium">For beginners:</span> Adam is often a safe default choice as it requires less tuning of hyperparameters.</li>
                        </ul>
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
                
                {activeSection === 'applications' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Real-world Applications of Neural Networks</h3>
                      <p className="mb-4">
                        Neural networks have been successfully applied to a wide range of real-world problems, demonstrating their versatility and power. 
                        Here are some notable applications:
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Image Recognition</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Neural networks, especially convolutional neural networks (CNNs), have achieved state-of-the-art results in image classification tasks.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* Image Recognition visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="#E5E7EB" />
                              <text x="100" y="50" textAnchor="middle" fontSize="14" fill="currentColor">Image Recognition</text>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Natural Language Processing (NLP)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Recurrent neural networks (RNNs) and transformers have revolutionized NLP, enabling tasks like translation, sentiment analysis, and text generation.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            {/* NLP visualization would go here */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="#E5E7EB" />
                              <text x="100" y="50" textAnchor="middle" fontSize="14" fill="currentColor">Natural Language Processing</text>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Healthcare</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Neural networks are used for medical image analysis, disease diagnosis, drug discovery, and patient outcome prediction.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="#E5E7EB" />
                              <text x="100" y="50" textAnchor="middle" fontSize="14" fill="currentColor">Healthcare Applications</text>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Autonomous Vehicles</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Self-driving cars use neural networks for object detection, path planning, and decision making in real-time.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="#E5E7EB" />
                              <text x="100" y="50" textAnchor="middle" fontSize="14" fill="currentColor">Autonomous Vehicles</text>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h4 className="font-semibold mb-2">Financial Industry</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Neural networks are employed for fraud detection, algorithmic trading, credit scoring, and risk assessment.
                          </p>
                          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="#E5E7EB" />
                              <text x="100" y="50" textAnchor="middle" fontSize="14" fill="currentColor">Financial Applications</text>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-2">Case Study: Image Classification with CNNs</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Convolutional Neural Networks (CNNs) have set new records in image classification tasks. Here's a brief overview of how CNNs are applied in this domain:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li><span className="font-medium">Data Collection:</span> Gather a large dataset of labeled images for training and testing.</li>
                          <li><span className="font-medium">Preprocessing:</span> Resize images, normalize pixel values, and augment the dataset to improve generalization.</li>
                          <li><span className="font-medium">Model Selection:</span> Choose a CNN architecture (e.g., LeNet, AlexNet, VGG, ResNet) based on the complexity of the task and available resources.</li>
                          <li><span className="font-medium">Training:</span> Train the model using the training dataset, adjusting the weights to minimize the classification error.</li>
                          <li><span className="font-medium">Evaluation:</span> Test the model on the unseen test dataset to evaluate its performance.</li>
                          <li><span className="font-medium">Deployment:</span> Deploy the trained model to classify new images in real-time applications.</li>
                        </ol>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-2">Case Study: Language Translation with RNNs and Transformers</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Neural networks have transformed language translation, enabling more accurate and context-aware translations. Here's how they're applied:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li><span className="font-medium">Data Preparation:</span> Collect parallel text corpora (same content in different languages) for training translation models.</li>
                          <li><span className="font-medium">Tokenization:</span> Convert text into tokens that can be processed by the neural network.</li>
                          <li><span className="font-medium">Architecture Selection:</span> Choose between RNNs with attention or transformer-based models like BERT or GPT.</li>
                          <li><span className="font-medium">Training:</span> Train the model on parallel texts, teaching it to map sequences from one language to another.</li>
                          <li><span className="font-medium">Fine-tuning:</span> Adjust the model for specific domains or language pairs to improve translation quality.</li>
                          <li><span className="font-medium">Evaluation:</span> Use metrics like BLEU score to evaluate translation quality against human-translated references.</li>
                          <li><span className="font-medium">Deployment:</span> Implement the model in translation services, often with additional features like handling idiomatic expressions.</li>
                        </ol>
                      </div>
                      
                      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Future Trends in Neural Network Applications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          As neural network research continues to advance, several emerging trends are shaping the future of AI applications:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><span className="font-medium">Multimodal Learning:</span> Neural networks that can process and integrate different types of data (text, images, audio) simultaneously.</li>
                          <li><span className="font-medium">Few-shot Learning:</span> Models that can learn from very few examples, reducing the need for massive datasets.</li>
                          <li><span className="font-medium">Explainable AI:</span> Developing neural networks that can explain their decision-making process to improve transparency and trust.</li>
                          <li><span className="font-medium">Neural-Symbolic Integration:</span> Combining neural networks with symbolic reasoning to handle both pattern recognition and logical reasoning.</li>
                          <li><span className="font-medium">Edge AI:</span> Deploying neural networks on edge devices for real-time processing without cloud connectivity.</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                
                {activeSection === 'practical-example' && (
                  <AuthenticatedContent requiredLevel="premium">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Practical Example: Handwritten Digit Recognition</h3>
                      <p className="mb-4">
                        In this practical example, we'll build a neural network to recognize handwritten digits from the MNIST dataset. This example will consolidate your understanding of neural network fundamentals.
                      </p>
                      
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-2">Step 1: Understanding the Data</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          The MNIST dataset consists of 70,000 images of handwritten digits (0-9) divided into a training set (60,000 images) and a test set (10,000 images). Each image is 28x28 pixels, grayscale.
                        </p>
                        
                        <div className="flex justify-center mb-4">
                          {/* MNIST dataset sample images would go here */}
                          <svg className="w-32 h-32" viewBox="0 0 32 32">
                            <rect width="32" height="32" fill="#E5E7EB" />
                            <text x="16" y="16" textAnchor="middle" fontSize="8" fill="currentColor">MNIST Samples</text>
                          </svg>
                        </div>
                        
                        <h4 className="text-lg font-semibold mb-2">Step 2: Building the Neural Network</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          We'll build a simple neural network with one input layer, one hidden layer, and one output layer. The network will be trained to minimize the difference between the predicted and actual digit labels.
                        </p>
                        
                        <CodeExample 
                          code={`
const mnist = require('mnist');
const { NeuralNetwork } = require('brain.js');

// 1. Load and preprocess the MNIST data
const { training, test } = mnist.set(8000, 2000);

// 2. Define the neural network architecture
const net = new NeuralNetwork({
  inputSize: 784, // 28x28 pixels
  hiddenLayers: [128],
  outputSize: 10, // Digits 0-9
});

// 3. Train the neural network
net.train(training, {
  errorThresh: 0.005, // Error threshold to reach
  iterations: 20000, // Maximum number of iterations
  log: true, // Log progress to console
  logPeriod: 1000, // Log every 1000 iterations
});

// 4. Test the neural network
const output = net.run(test[0].input); // Test with the first sample
const predictedDigit = output.indexOf(Math.max(...output)); // Get the predicted digit

console.log('Predicted Digit:', predictedDigit);
`}
                          language="javascript"
                          title="Handwritten Digit Recognition with Neural Networks"
                          runnable={true}
                          explanation="This code demonstrates the complete process of building, training, and testing a neural network for handwritten digit recognition using the MNIST dataset."
                        />
                      </div>
                    </div>
                  </AuthenticatedContent>
                )}
                
                {activeSection === 'conclusion' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Conclusion: Your Neural Network Journey</h3>
                      <p className="mb-4">
                        Congratulations on completing the Neural Networks Fundamentals course! You've now gained a solid 
                        understanding of the core concepts, architecture, and training mechanisms of neural networks.
                      </p>
                      
                      <p className="mb-6">
                        Throughout this course, we've covered:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mb-6">
                        <li>The historical development and basic principles of neural networks</li>
                        <li>Perceptrons as the fundamental building blocks</li>
                        <li>Multilayer networks and their enhanced capabilities</li>
                        <li>The backpropagation algorithm and how neural networks learn</li>
                        <li>Various activation functions and their specific use cases</li>
                        <li>Loss functions that guide the learning process</li>
                        <li>Optimization techniques to train effective models</li>
                        <li>Real-world applications across multiple domains</li>
                        <li>Practical examples that consolidate theoretical knowledge</li>
                      </ul>
                      
                      <h4 className="text-lg font-semibold mb-2">Where to Go from Here</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Your journey in neural networks and deep learning is just beginning. Here are some suggested next steps:
                      </p>
                      <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <li><span className="font-medium">Practice with Projects:</span> Apply what you've learned to small projects like image classification, text analysis, or predictive modeling.</li>
                        <li><span className="font-medium">Explore Advanced Topics:</span> Dive deeper into specialized architectures like CNNs, RNNs, and Transformers.</li>
                        <li><span className="font-medium">Join the Community:</span> Participate in forums, competitions (like Kaggle), and open-source projects.</li>
                        <li><span className="font-medium">Stay Updated:</span> Follow research papers, blogs, and conferences to keep up with the rapidly evolving field.</li>
                        <li><span className="font-medium">Advanced Courses:</span> Consider our advanced courses on specialized topics in deep learning.</li>
                      </ol>
                      
                      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-medium mb-2">Final Thoughts</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Neural networks are at the heart of the current AI revolution, enabling breakthroughs in computer vision, 
                          natural language processing, healthcare, autonomous systems, and many other fields. With the foundation you've 
                          built in this course, you're now equipped to explore these exciting applications and contribute to the 
                          advancing field of artificial intelligence.
                        </p>
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <Link href="/courses" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                          Explore More Courses
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
                      <h3 className="text-xl font-bold mb-4">Certificate of Completion</h3>
                      <p className="mb-6">
                        You've completed the Neural Networks Fundamentals course! Premium members can download their certificate below.
                      </p>
                      
                      <AuthenticatedContent requiredLevel="premium">
                        <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 mb-6">
                          <div className="text-center">
                            <h4 className="text-2xl font-bold mb-2">Certificate of Completion</h4>
                            <p className="text-lg mb-6">This certifies that</p>
                            <p className="text-xl font-medium mb-6">[Your Name]</p>
                            <p className="mb-6">has successfully completed</p>
                            <p className="text-xl font-bold mb-2">Neural Networks Fundamentals</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">May 27, 2025</p>
                            
                            <div className="w-32 h-12 mx-auto border-b-2 border-gray-300 dark:border-gray-600 mb-2"></div>
                            <p className="text-sm">Neural Network Explorer</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Certificate
                          </button>
                        </div>
                      </AuthenticatedContent>
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                        <p className="mb-4">Upgrade to Premium to receive your certificate!</p>
                        <Link href="/pricing" className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium rounded-lg transition-colors inline-block">
                          Upgrade Now
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}