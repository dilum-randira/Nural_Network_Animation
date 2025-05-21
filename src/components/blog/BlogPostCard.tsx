"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export default function BlogPostCard({
  id,
  title,
  excerpt,
  date,
  author,
  category,
  imageUrl,
  featured = false
}: BlogPostCardProps) {
  const { t } = useLanguage();

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (featured) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto bg-gray-300 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
            <div className="absolute top-0 left-0 m-4 px-3 py-1 bg-blue-600 text-white text-xs uppercase font-bold rounded-full">
              {t(`blog.categories.${category}`)}
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              {formatDate(date)} • {author}
            </p>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{excerpt}</p>
            <Link 
              href={`/blog/${id}`} 
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('blog.read_more')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 bg-gray-300 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 m-4 px-3 py-1 bg-blue-600 text-white text-xs uppercase font-bold rounded-full">
          {t(`blog.categories.${category}`)}
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          {formatDate(date)} • {author}
        </p>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/blog/${id}`} 
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          {t('blog.read_more')} →
        </Link>
      </div>
    </div>
  );
}
