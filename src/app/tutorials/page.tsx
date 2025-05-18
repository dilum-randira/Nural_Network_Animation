import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Tutorials | Neural Network Explorer',
  description: 'Step-by-step tutorials for neural networks and programming languages',
};

const tutorials = [
  {
    id: 'building-first-neural-network',
    title: 'Building Your First Neural Network',
    description: 'A step-by-step guide to building a simple neural network from scratch.',
    category: 'Neural Networks',
    duration: '30 min',
    difficulty: 'Beginner',
  },
  {
    id: 'intro-to-python-ml-libraries',
    title: 'Introduction to Python ML Libraries',
    description: 'Learn how to use popular Python libraries for machine learning.',
    category: 'Python',
    duration: '45 min',
    difficulty: 'Beginner',
  },
  {
    id: 'cnn-image-classification',
    title: 'Image Classification with CNNs',
    description: 'Build a convolutional neural network to classify images.',
    category: 'Deep Learning',
    duration: '60 min',
    difficulty: 'Intermediate',
  },
  {
    id: 'javascript-tensors',
    title: 'Working with Tensors in JavaScript',
    description: 'Learn how to manipulate tensors using TensorFlow.js.',
    category: 'JavaScript',
    duration: '40 min',
    difficulty: 'Intermediate',
  },
  {
    id: 'lstm-text-generation',
    title: 'Text Generation with LSTMs',
    description: 'Create a recurrent neural network that can generate text.',
    category: 'Deep Learning',
    duration: '90 min',
    difficulty: 'Advanced',
  },
  {
    id: 'reinforcement-learning-basics',
    title: 'Reinforcement Learning Basics',
    description: 'Learn the fundamentals of reinforcement learning algorithms.',
    category: 'Machine Learning',
    duration: '75 min',
    difficulty: 'Intermediate',
  },
];

export default function TutorialsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Tutorials
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Practical step-by-step tutorials to guide your learning journey.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="space-y-6">
            {tutorials.map((tutorial) => (
              <Link href={`/tutorials/${tutorial.id}`} key={tutorial.id} className="block group">
                <div className="px-6 py-5 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm mb-1">
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          {tutorial.category}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {tutorial.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {tutorial.title}
                      </h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {tutorial.description}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.duration}
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}