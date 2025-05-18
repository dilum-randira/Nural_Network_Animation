"use client";

import Link from 'next/link';
import React from 'react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  image?: string;
}

export function CourseCard({ id, title, description, level, duration, image }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group">
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl bg-white dark:bg-gray-800">
        <div className="flex-shrink-0 h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="text-4xl font-bold text-white opacity-30">
              {title.split(' ')[0]}
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {level}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {duration}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}