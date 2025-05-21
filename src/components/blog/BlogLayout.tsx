"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import NewsletterSubscription from "./NewsletterSubscription";

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
          <NewsletterSubscription />
        </div>
      </div>
    </div>
  );
}
