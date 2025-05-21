"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Blog header with categories */}
        <div className="border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center py-4 space-x-1 md:space-x-4 overflow-x-auto">
              <Link 
                href="/blog" 
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('blog.categories.all')}
              </Link>
              <Link 
                href="/blog?category=tutorials" 
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('blog.categories.tutorials')}
              </Link>
              <Link 
                href="/blog?category=insights" 
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('blog.categories.insights')}
              </Link>
              <Link 
                href="/blog?category=research" 
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('blog.categories.research')}
              </Link>
              <Link 
                href="/blog?category=news" 
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('blog.categories.news')}
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main>{children}</main>

        {/* Blog footer with newsletter */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">{t('blog.subscribe')}</h3>
              <p className="mb-6 text-blue-100">
                Get the latest articles, tutorials, and updates from Neural Network Explorer.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('blog.email_placeholder')}
                  className="flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors">
                  {t('blog.subscribe_button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
