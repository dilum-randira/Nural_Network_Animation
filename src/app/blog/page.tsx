"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t('blog.title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {t('blog.subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Coming soon message */}
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-primary"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <h2 className="text-2xl font-semibold mb-2">{t('blog.coming_soon')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {t('blog.coming_soon_message')}
          </p>
        </div>
      </div>
    </div>
  );
}
