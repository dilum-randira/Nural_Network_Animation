"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

interface CourseSearchProps {
  onSearch: (query: string) => void;
}

export default function CourseSearch({ onSearch }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative max-w-md w-full mx-auto mt-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}