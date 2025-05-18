"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AuthNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example: Check if user is logged in (you would typically use a real auth solution)
  useEffect(() => {
    // For demo, we're just checking local storage, but in a real app
    // you'd use a proper auth provider like NextAuth.js
    const token = localStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear auth token for demo purposes
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:inline-block">Welcome back!</span>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm rounded-md transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}