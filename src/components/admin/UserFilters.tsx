"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface UserFiltersProps {
  filters: {
    status: string;
    subscription: string;
    role: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search: searchInput });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchInput, onFilterChange, filters]);
  
  const handleFilterChange = (name: string, value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };
  
  return (
    <Card className="p-4 bg-white dark:bg-gray-800 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Users
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        {/* Status Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            id="status"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        {/* Subscription Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="subscription" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Subscription
          </label>
          <select
            id="subscription"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.subscription}
            onChange={(e) => handleFilterChange('subscription', e.target.value)}
          >
            <option value="all">All</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        
        {/* Role Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            id="role"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
          >
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
      </div>
    </Card>
  );
}