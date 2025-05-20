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
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
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
            {t('app_title')}
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
              {t('nav_learn')}
            </button>
            <button 
              onClick={() => setActiveTab('explore')} 
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all touch-target ${
                activeTab === 'explore' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-blue-800/50'
              }`}
            >
              {windowWidth < 400 ? t('nav_explore_short') : t('nav_explore')}
            </button>
            <button 
              onClick={() => setActiveTab('play')} 
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all touch-target ${
                activeTab === 'play' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-blue-800/50'
              }`}
            >
              {windowWidth < 400 ? t('nav_play_short') : t('nav_play')}
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
                  {t('hero_title')}
                </h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-gray-700 dark:text-gray-300">
                  {t('hero_description')}
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-8">
                  <Link 
                    href="/courses" 
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md touch-target"
                  >
                    {t('browse_courses')}
                  </Link>
                  <Link 
                    href="/tutorials" 
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 dark:bg-gray-800 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md touch-target"
                  >
                    {t('view_tutorials')}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              { [
                { title: t('stats_courses'), value: '24+', description: t('stats_courses_desc') },
                { title: t('stats_tutorials'), value: '85+', description: t('stats_tutorials_desc') },
                { title: t('stats_community'), value: '10K+', description: t('stats_community_desc') },
                { title: t('stats_languages'), value: '5+', description: t('stats_languages_desc') }
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
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('featured_courses')}</h3>
                <Link href="/courses" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {t('view_all')}
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
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('latest_tutorials')}</h3>
                <Link href="/tutorials" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {t('view_all')}
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
        
        {/* Neural Network Visualization Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('neural_network_title')}</h2>
              <p className="max-w-2xl mx-auto text-sm text-gray-600 dark:text-gray-400">
                {t('neural_network_desc')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-2 sm:p-4 lg:p-6 h-[400px] sm:h-[500px]">
                {isClient && (
                  <NeuralNetwork 
                    width="100%" 
                    height="100%" 
                    neuronCount={getNeuronCount()}
                    connectionCount={getConnectionCount()}
                  />
                )}
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Link 
                href="/courses/neural-networks-fundamentals" 
                className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md touch-target"
              >
                {t('learn_how')}
              </Link>
            </div>
          </div>
        )}
        
        {/* Interactive Tools Tab */}
        {activeTab === 'play' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('advanced_calculator')}</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <Calculator />
                </div>
              </Card>
              
              <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('shooting_game')}</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-[300px]">
                  {isClient && <ShootingGame />}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
