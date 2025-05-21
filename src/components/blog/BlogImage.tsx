"use client";

import Image from "next/image";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function BlogImage({
  src,
  alt,
  width = 1200,
  height = 630,
  className = "",
  priority = false
}: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className={`relative overflow-hidden ${className} ${
        isLoading ? "bg-gray-200 dark:bg-gray-700 animate-pulse" : ""
      }`}
      style={{ aspectRatio: width / height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
}
