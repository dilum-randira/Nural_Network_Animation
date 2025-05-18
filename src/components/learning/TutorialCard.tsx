"use client";

import Link from 'next/link';
import React from 'react';

interface TutorialCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
}

export function TutorialCard({
  id,
  title,
  description,
  category,
  duration,
  difficulty,
}: TutorialCardProps) {
  return (
    <Link href={`/tutorials/${id}`} className="block group">
      <div className="px-6 py-5 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm mb-1">
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {category}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {difficulty}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {duration}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}