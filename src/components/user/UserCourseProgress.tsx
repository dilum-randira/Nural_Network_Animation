"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  completedModules: number;
  totalModules: number;
}

export function UserCourseProgress() {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch course progress data from an API
    // For demo purposes, we're using mock data
    const fetchCourseProgress = () => {
      // Simulate API call delay
      setTimeout(() => {
        const mockCourses: CourseProgress[] = [
          {
            id: 'neural-networks-fundamentals',
            title: 'Neural Networks Fundamentals',
            progress: 20,
            lastAccessed: '2025-05-16T14:30:00Z',
            completedModules: 1,
            totalModules: 5,
          },
          {
            id: 'python-for-machine-learning',
            title: 'Python for Machine Learning',
            progress: 45,
            lastAccessed: '2025-05-10T09:15:00Z',
            completedModules: 3,
            totalModules: 6,
          },
          {
            id: 'deep-learning-with-tensorflow',
            title: 'Deep Learning with TensorFlow',
            progress: 10,
            lastAccessed: '2025-05-05T16:20:00Z',
            completedModules: 1,
            totalModules: 8,
          }
        ];
        
        setCourses(mockCourses);
        setIsLoading(false);
      }, 600);
    };
    
    fetchCourseProgress();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't started any courses yet.</p>
        <Link 
          href="/courses" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map(course => (
        <div key={course.id} className="space-y-2">
          <div className="flex justify-between">
            <Link 
              href={`/courses/${course.id}`}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {course.title}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last accessed: {formatDate(course.lastAccessed)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Completed {course.completedModules} of {course.totalModules} modules
          </div>
          
          <div className="pt-2">
            <Link
              href={`/courses/${course.id}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Continue Learning →
            </Link>
          </div>
        </div>
      ))}
      
      <div className="pt-4 text-center">
        <Link 
          href="/courses" 
          className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-800 dark:text-gray-200"
        >
          Browse More Courses
        </Link>
      </div>
    </div>
  );
}