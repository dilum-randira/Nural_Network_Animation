"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AuthNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check user's login status and device size
  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      // Set mobile status
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Run initial check
      checkMobile();

      // Listen for window resize events
      window.addEventListener("resize", checkMobile);

      // For demo, we're just checking local storage, but in a real app
      // you'd use a proper auth provider like NextAuth.js
      const token = localStorage.getItem("auth-token");
      setIsLoggedIn(!!token);

      // Check if the user has admin privileges
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserRole(user.role);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  const handleLogout = () => {
    // Clear auth data for demo purposes
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-email");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.href = "/";
  };

  const isAdmin = userRole === "admin" || userRole === "superadmin";

  // Different layout for mobile vs desktop
  return (
    <div
      className={`flex ${
        isMobile ? "flex-col w-full" : "items-center"
      } gap-4`}
    >
      {isLoggedIn ? (
        <div
          className={`flex ${
            isMobile ? "flex-col w-full" : "items-center"
          } gap-4`}
        >
          {!isMobile && (
            <span className="text-sm hidden md:inline-block">
              Welcome back!
            </span>
          )}

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className={`${
                isMobile ? "w-full text-center" : ""
              } py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors`}
            >
              Admin Dashboard
            </Link>
          )}

          <Link
            href="/user/profile"
            className={`${
              isMobile ? "mx-auto" : ""
            } w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 flex items-center justify-center transition-colors`}
            aria-label="My Profile"
            title="My Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600 dark:text-blue-400"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

          <button
            onClick={handleLogout}
            className={`${
              isMobile ? "w-full" : ""
            } py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors touch-target`}
          >
            Logout
          </button>
        </div>
      ) : (
        <div
          className={`flex ${
            isMobile ? "flex-col w-full" : "items-center"
          } gap-4`}
        >
          <Link
            href="/auth/login"
            className={`${
              isMobile ? "w-full text-center" : ""
            } py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm rounded-md transition-colors touch-target`}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={`${
              isMobile ? "w-full text-center" : ""
            } py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors touch-target`}
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}