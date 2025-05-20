"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calculator } from "@/components/calculator/Calculator";
import { NeuralNetwork } from "@/components/animations/NeuralNetwork";
import { ShootingGame } from "@/components/games/ShootingGame";
import { Card } from "@/components/ui/card";
import { CourseCard } from "@/components/learning/CourseCard";
import { TutorialCard } from "@/components/learning/TutorialCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'learn' | 'explore' | 'play'>('learn');
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  
  // Set up responsive behavior
  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Adjust neural network parameters based on screen size
  const getNeuronCount = () => {
    if (windowWidth < 640) return 50;
    if (windowWidth < 1024) return 75;
    return 100;
  };
  
  const getConnectionCount = () => {
    if (windowWidth < 640) return 100;
    if (windowWidth < 1024) return 150;
    return 220;
  };
  
  // Featured courses data
  const featuredCourses = [
    {
      id: 'neural-networks-fundamentals',
      title: 'Neural Networks Fundamentals',
      description: 'Learn the basics of neural networks, from perceptrons to deep learning architectures.',
      level: 'Beginner',
      duration: '4 weeks',
    },
    {
      id: 'python-for-machine-learning',
      title: 'Python for Machine Learning',
      description: 'Master Python programming specifically for machine learning applications.',
      level: 'Intermediate',
      duration: '6 weeks',
    },
  ];
  
  // Featured tutorials data
  const featuredTutorials = [
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
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header with enhanced styling */}
      <header className="w-full py-4 sm:py-6 px-3 sm:px-4 md:px-8 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Neural Network Explorer
          </h1>
          
          {/* Navigation Tabs - Responsive */}
          <nav className="flex flex-wrap gap-1 sm:gap-2 p-1 rounded-lg bg-blue-800/30 w-full md:w-auto justify-center">
            <button 
              onClick={() => setActiveTab('learn')} 
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all touch-target ${
                activeTab === 'learn' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-blue-800/50'
              }`}
            >
              Learn
            </button>
            <button 
              onClick={() => setActiveTab('explore')} 
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all touch-target ${
                activeTab === 'explore' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-blue-800/50'
              }`}
            >
              {windowWidth < 400 ? 'Explore' : 'Explore Network'}
            </button>
            <button 
              onClick={() => setActiveTab('play')} 
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all touch-target ${
                activeTab === 'play' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-blue-800/50'
              }`}
            >
              {windowWidth < 400 ? 'Games' : 'Tools & Games'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-8 content-container">
        {/* Learning Platform Tab */}
        {activeTab === 'learn' && (
          <div className="space-y-8 sm:space-y-12 animate-fadeIn">
            {/* Hero Section with Background Pattern */}
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-6 sm:py-12 px-4 sm:px-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10 text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                  Master Neural Networks <span className="text-blue-600 dark:text-blue-400">& Programming</span>
                </h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-gray-700 dark:text-gray-300">
                  Interactive courses and tutorials to help you understand neural networks 
                  and master the programming languages that power them.
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-8">
                  <Link 
                    href="/courses" 
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md touch-target"
                  >
                    Browse All Courses
                  </Link>
                  <Link 
                    href="/tutorials" 
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 dark:bg-gray-800 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md touch-target"
                  >
                    View Tutorials
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              { [
                { title: 'Courses', value: '24+', description: 'Comprehensive learning paths' },
                { title: 'Tutorials', value: '85+', description: 'Practical guides' },
                { title: 'Community', value: '10K+', description: 'Active learners' },
                { title: 'Languages', value: '5+', description: 'Programming languages' }
              ].map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{stat.description}</p>
                </div>
              ))}
            </div>
            
            {/* Featured Courses */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Courses</h3>
                <Link href="/courses" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {featuredCourses.map(course => (
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    level={course.level}
                    duration={course.duration}
                  />
                ))}
              </div>
            </div>
            
            {/* Featured Tutorials */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Tutorials</h3>
                <Link href="/tutorials" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {featuredTutorials.map(tutorial => (
                  <TutorialCard 
                    key={tutorial.id}
                    id={tutorial.id}
                    title={tutorial.title}
                    description={tutorial.description}
                    category={tutorial.category}
                    duration={tutorial.duration}
                    difficulty={tutorial.difficulty}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Explore Neural Network Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            <Card className="overflow-hidden shadow-lg border-primary/10 bg-background/70 backdrop-blur-md">
              <div className={`${windowWidth < 640 ? 'aspect-square' : 'aspect-video'}`}>
                {isClient && (
                  <NeuralNetwork 
                    neuronCount={getNeuronCount()}
                    connectionCount={getConnectionCount()}
                    neuronColor="rgba(66, 153, 225, 0.8)"
                    lineColor="rgba(66, 153, 225, 0.4)"
                    cursorInfluenceRadius={windowWidth < 640 ? 300 : 500}
                    cursorInfluenceStrength={windowWidth < 640 ? 5 : 10}
                  />
                )}
              </div>
            </Card>
            
            <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold">Interactive Neural Network Animation</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Move your cursor across the animation to observe how the neural network responds 
                to your movements. The network visualizes the basic concept of interconnected 
                neurons and dynamic information flow.
              </p>
              <Link 
                href="/tutorials/neural-network-visualization" 
                className="inline-block mt-2 sm:mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm touch-target"
              >
                Learn How Neural Networks Work
              </Link>
            </div>
          </div>
        )}
        
        {/* Tools & Games Tab */}
        {activeTab === 'play' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Advanced Calculator</h2>
              <Card className="shadow-lg border-primary/10 overflow-hidden bg-white dark:bg-gray-800 w-full max-w-md">
                <Calculator />
              </Card>
            </div>
            
            <div className="flex flex-col items-center justify-center mt-8 md:mt-0">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Shooting Ball Game</h2>
              <Card className="shadow-lg border-primary/10 overflow-hidden bg-white dark:bg-gray-800 w-full">
                <ShootingGame />
              </Card>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Footer with Navigation - Responsive */}
      <footer className="w-full py-6 sm:py-8 px-4 border-t mt-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">Neural Network Explorer</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                An educational platform dedicated to teaching neural networks and programming concepts through interactive visualizations.
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                { [
                  { title: 'Courses', href: '/courses' },
                  { title: 'Tutorials', href: '/tutorials' },
                  { title: 'Neural Network Explorer', href: '/explore' },
                  { title: 'About Us', href: '/about' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">Account</h3>
              <div className="grid grid-cols-2 sm:block">
                { [
                  { title: 'Login', href: '/auth/login' },
                  { title: 'Sign Up', href: '/auth/signup' },
                  { title: 'My Profile', href: '/user/profile' },
                  { title: 'My Courses', href: '/user/profile' }
                ].map((link, idx) => (
                  <div className="sm:mb-1" key={idx}>
                    <Link href={link.href} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      {link.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Neural Network Explorer
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
              Made in Sri Lanka with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
