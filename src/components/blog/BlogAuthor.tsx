"use client";

interface BlogAuthorProps {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
}

export default function BlogAuthor({ name, role = "AI Researcher & Educator", bio, imageUrl }: BlogAuthorProps) {
  return (
    <div className="mt-12 pt-8 border-t dark:border-gray-700">
      <div className="flex items-start">
        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
          {imageUrl && <img src={imageUrl} alt={name} className="w-full h-full object-cover" />}
        </div>
        <div className="ml-4">
          <h3 className="font-medium">{name}</h3>
          {role && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{role}</p>
          )}
          {bio && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">{bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}
