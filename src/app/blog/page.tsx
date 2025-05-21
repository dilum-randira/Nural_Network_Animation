"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useSearchParams } from "next/navigation";

// Define blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Set active category from URL param when component mounts
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Sample blog data
  useEffect(() => {
    // In a real application, this data would come from an API
    const posts: BlogPost[] = [
      {
        id: "introduction-to-neural-networks",
        title: "Introduction to Neural Networks: A Beginner's Guide",
        excerpt: "Learn the basic concepts of neural networks and how they work. This beginner-friendly guide explains neurons, layers, activation functions, and more.",
        date: "2025-05-15",
        author: "Dr. Amal Perera",
        category: "tutorials",
        imageUrl: "/images/blog/neural-network-intro.jpg",
        featured: true
      },
      {
        id: "deep-learning-vs-machine-learning",
        title: "Deep Learning vs. Machine Learning: What's the Difference?",
        excerpt: "Understand the key differences between deep learning and traditional machine learning approaches, and when to use each one.",
        date: "2025-05-12",
        author: "Samantha Silva",
        category: "insights",
        imageUrl: "/images/blog/dl-vs-ml.jpg"
      },
      {
        id: "convolutional-neural-networks",
        title: "Convolutional Neural Networks Explained",
        excerpt: "Discover how CNNs work and why they're so effective for image recognition and computer vision tasks.",
        date: "2025-05-08",
        author: "Dr. Amal Perera",
        category: "tutorials",
        imageUrl: "/images/blog/cnn-explained.jpg"
      },
      {
        id: "ai-ethics-challenges",
        title: "Ethical Challenges in Artificial Intelligence",
        excerpt: "Explore the ethical considerations and challenges that arise with the advancement of AI technologies.",
        date: "2025-05-01",
        author: "Nisal Jayawardene",
        category: "insights",
        imageUrl: "/images/blog/ai-ethics.jpg"
      },
      {
        id: "recent-advances-nlp",
        title: "Recent Advances in Natural Language Processing",
        excerpt: "A look at the latest breakthroughs in NLP and how they're transforming the way machines understand human language.",
        date: "2025-04-25",
        author: "Kavindi Fernando",
        category: "research",
        imageUrl: "/images/blog/nlp-advances.jpg"
      },
      {
        id: "ai-job-market-2025",
        title: "The AI Job Market in 2025: Skills You Need",
        excerpt: "Discover which skills are most in-demand for AI professionals and how to prepare for the evolving job market.",
        date: "2025-04-20",
        author: "Samantha Silva",
        category: "news",
        imageUrl: "/images/blog/ai-job-market.jpg"
      }
    ];
    
    setBlogPosts(posts);
    setFilteredPosts(posts);
  }, []);

  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = blogPosts;
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) || 
          post.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery, blogPosts]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('blog.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t('blog.categories.all')}
            </Link>
            <Link
              href="/blog?category=tutorials"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "tutorials" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t('blog.categories.tutorials')}
            </Link>
            <Link
              href="/blog?category=insights"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "insights" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t('blog.categories.insights')}
            </Link>
            <Link
              href="/blog?category=research"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "research" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t('blog.categories.research')}
            </Link>
            <Link
              href="/blog?category=news"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "news" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t('blog.categories.news')}
            </Link>
          </div>
          
          {/* Featured Post */}
          {featuredPost && activeCategory === "all" && searchQuery === "" && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 border-b pb-4">{t('blog.featured')}</h2>
              <BlogPostCard {...featuredPost} featured={true} />
            </div>
          )}
          
          {/* Blog Posts Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 border-b pb-4">{t('blog.more_articles')}</h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg text-gray-600 dark:text-gray-400">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts
                  .filter(post => !post.featured || activeCategory !== "all" || searchQuery !== "")
                  .map(post => (
                    <BlogPostCard key={post.id} {...post} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
