"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import BlogImage from "./BlogImage";

interface RelatedPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
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

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-40 relative">
              <BlogImage
                src={post.imageUrl}
                alt={post.title}
                className="h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{formatDate(post.date)}</p>
              <Link href={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                {t('blog.read_more')} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
