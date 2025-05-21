"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export interface Tag {
  id: string;
  name: string;
  count?: number;
}

interface BlogTagsProps {
  tags: Tag[];
  selectedTag?: string;
  showCount?: boolean;
  className?: string;
}

export default function BlogTags({ 
  tags, 
  selectedTag, 
  showCount = false,
  className = "" 
}: BlogTagsProps) {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog?tag=${tag.id}`}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedTag === tag.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t(`blog.tags.${tag.id}`, { fallback: tag.name })}
          {showCount && tag.count !== undefined && (
            <span className="ml-1 text-xs">({tag.count})</span>
          )}
        </Link>
      ))}
    </div>
  );
}
