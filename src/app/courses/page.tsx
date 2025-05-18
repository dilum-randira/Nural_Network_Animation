"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CourseSearch from '@/components/learning/CourseSearch';

// Keep metadata in a separate variable since we're using 'use client'
const pageMetadata = {
  title: 'Courses | Neural Network Explorer',
  description: 'Learn about Neural Networks and Programming Languages',
};

const courses = [
  {
    id: 'neural-networks-fundamentals',
    title: 'Neural Networks Fundamentals',
    description: 'Learn the basics of neural networks, from perceptrons to deep learning architectures.',
    level: 'Beginner',
    duration: '4 weeks',
    image: '/images/courses/neural-fundamentals.svg',
    tags: ['neural networks', 'fundamentals', 'beginner', 'deep learning'],
  },
  {
    id: 'python-for-machine-learning',
    title: 'Python for Machine Learning',
    description: 'Master Python programming specifically for machine learning applications.',
    level: 'Intermediate',
    duration: '6 weeks',
    image: '/images/courses/python-ml.svg',
    tags: ['python', 'programming', 'machine learning', 'intermediate'],
  },
  {
    id: 'advanced-deep-learning',
    title: 'Advanced Deep Learning',
    description: 'Explore advanced concepts in deep learning including CNNs, RNNs, and transformers.',
    level: 'Advanced',
    duration: '8 weeks',
    image: '/images/courses/advanced-dl.svg',
    tags: ['deep learning', 'advanced', 'CNNs', 'RNNs', 'transformers'],
  },
  {
    id: 'javascript-neural-networks',
    title: 'JavaScript Neural Networks',
    description: 'Build neural networks directly in the browser using JavaScript and TensorFlow.js.',
    level: 'Intermediate',
    duration: '5 weeks',
    image: '/images/courses/js-neural.svg',
    tags: ['javascript', 'neural networks', 'browser', 'tensorflowjs', 'intermediate'],
  },
];

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCourses(courses);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const results = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.level.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    setFilteredCourses(results);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Courses
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Expand your knowledge in neural networks and programming languages with our comprehensive courses.
          </p>
        </div>

        <CourseSearch onSearch={handleSearch} />
        
        {filteredCourses.length === 0 ? (
          <div className="mt-16 text-center">
            <h3 className="text-xl text-gray-600 dark:text-gray-400">No courses found matching your search.</h3>
            <button 
              onClick={() => setFilteredCourses(courses)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Courses
            </button>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="group">
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl bg-white dark:bg-gray-800">
                  <div className="flex-shrink-0 h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white opacity-30">
                      {course.title.split(' ')[0]}
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          {course.level}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {course.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}