"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { UserTable } from '@/components/admin/UserTable';
import { UserFilters } from '@/components/admin/UserFilters';
import { UserFormModal } from '@/components/admin/UserFormModal';

// Mock user data for demonstration
const INITIAL_USERS = [
  { 
    id: '1', 
    name: 'Alex Johnson', 
    email: 'alex.j@example.com', 
    subscription: 'Basic',
    status: 'Active',
    role: 'user',
    joinedDate: '2025-01-15',
    lastActive: '2025-05-17'
  },
  { 
    id: '2', 
    name: 'Sarah Wilson', 
    email: 'swilson@example.com', 
    subscription: 'Premium',
    status: 'Active',
    role: 'user',
    joinedDate: '2025-02-20',
    lastActive: '2025-05-18'
  },
  { 
    id: '3', 
    name: 'Miguel Rodriguez', 
    email: 'mrodri@example.com', 
    subscription: 'Basic',
    status: 'Active',
    role: 'user',
    joinedDate: '2025-03-05',
    lastActive: '2025-05-16'
  },
  { 
    id: '4', 
    name: 'Emily Chen', 
    email: 'echen22@example.com', 
    subscription: 'Premium',
    status: 'Inactive',
    role: 'user',
    joinedDate: '2025-03-27',
    lastActive: '2025-04-30'
  },
  { 
    id: '5', 
    name: 'James Miller', 
    email: 'james.m@example.com', 
    subscription: 'Basic',
    status: 'Active',
    role: 'admin',
    joinedDate: '2025-04-10',
    lastActive: '2025-05-17'
  },
  { 
    id: '6', 
    name: 'Olivia Taylor', 
    email: 'otaylor@example.com', 
    subscription: 'Premium',
    status: 'Active',
    role: 'user',
    joinedDate: '2025-04-22',
    lastActive: '2025-05-18'
  },
  { 
    id: '7', 
    name: 'Daniel Brown', 
    email: 'dbrown@example.com', 
    subscription: 'Premium',
    status: 'Inactive',
    role: 'superadmin',
    joinedDate: '2025-01-30',
    lastActive: '2025-03-15'
  }
];

export default function UsersManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [filteredUsers, setFilteredUsers] = useState(INITIAL_USERS);
  const [filters, setFilters] = useState({
    status: 'all',
    subscription: 'all',
    role: 'all',
    search: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Apply filters whenever users or filters change
  useEffect(() => {
    let result = [...users];

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(user => user.status.toLowerCase() === filters.status);
    }

    // Apply subscription filter
    if (filters.subscription !== 'all') {
      result = result.filter(user => user.subscription.toLowerCase() === filters.subscription.toLowerCase());
    }

    // Apply role filter
    if (filters.role !== 'all') {
      result = result.filter(user => user.role.toLowerCase() === filters.role.toLowerCase());
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(searchLower) || 
          user.email.toLowerCase().includes(searchLower)
      );
    }

    setFilteredUsers(result);
  }, [users, filters]);

  const handleAddNewUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    // In a real app, this would make an API call
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSaveUser = (userData) => {
    if (userData.id) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      // Add new user with generated ID
      setUsers([
        ...users, 
        { 
          ...userData, 
          id: String(users.length + 1),
          joinedDate: new Date().toISOString().split('T')[0],
          lastActive: new Date().toISOString().split('T')[0]
        }
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
          <button 
            onClick={handleAddNewUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New User
          </button>
        </div>
        
        {/* User Filters */}
        <UserFilters 
          filters={filters}
          onFilterChange={setFilters}
        />
        
        {/* User Table */}
        <UserTable 
          users={filteredUsers}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
        
        {/* User Form Modal */}
        {isModalOpen && (
          <UserFormModal
            user={currentUser}
            onSave={handleSaveUser}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
}