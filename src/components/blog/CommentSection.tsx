"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface Comment {
  id: string;
  author: string;
  authorEmail: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    author: "",
    authorEmail: "",
    content: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    author?: string;
    authorEmail?: string;
    content?: string;
  }>({});

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const validateForm = () => {
    const errors: {
      author?: string;
      authorEmail?: string;
      content?: string;
    } = {};
    
    if (!newComment.author.trim()) {
      errors.author = t('blog.comments.error_name_required');
    }
    
    if (!newComment.authorEmail.trim()) {
      errors.authorEmail = t('blog.comments.error_email_required');
    } else if (!/\S+@\S+\.\S+/.test(newComment.authorEmail)) {
      errors.authorEmail = t('blog.comments.error_email_invalid');
    }
    
    if (!newComment.content.trim()) {
      errors.content = t('blog.comments.error_content_required');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would be an API call
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      author: newComment.author,
      authorEmail: newComment.authorEmail,
      content: newComment.content,
      date: new Date().toISOString(),
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment({
      author: "",
      authorEmail: "",
      content: ""
    });
    setShowForm(false);
  };

  return (
    <div className="mt-16 pt-8 border-t dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">{t('blog.comments.title')}</h2>
      
      {comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t('blog.comments.no_comments')}</p>
      ) : (
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{comment.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.date)}</div>
              </div>
              <div className="text-gray-700 dark:text-gray-300 mb-4">{comment.content}</div>
              <button
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                {t('blog.comments.reply')}
              </button>
            </div>
          ))}
        </div>
      )}
      
      {showForm ? (
        <form onSubmit={handleSubmitComment} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">{t('blog.comments.leave_comment')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1">
                {t('blog.comments.name')}
              </label>
              <input
                type="text"
                id="author"
                className={`w-full px-3 py-2 border ${formErrors.author ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700`}
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
              />
              {formErrors.author && (
                <p className="mt-1 text-sm text-red-500">{formErrors.author}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="authorEmail" className="block text-sm font-medium mb-1">
                {t('blog.comments.email')}
              </label>
              <input
                type="email"
                id="authorEmail"
                className={`w-full px-3 py-2 border ${formErrors.authorEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700`}
                value={newComment.authorEmail}
                onChange={(e) => setNewComment({...newComment, authorEmail: e.target.value})}
              />
              {formErrors.authorEmail && (
                <p className="mt-1 text-sm text-red-500">{formErrors.authorEmail}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              {t('blog.comments.comment')}
            </label>
            <textarea
              id="content"
              rows={4}
              className={`w-full px-3 py-2 border ${formErrors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700`}
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            ></textarea>
            {formErrors.content && (
              <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowForm(false)}
            >
              {t('blog.comments.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('blog.comments.submit')}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('blog.comments.add_comment')}
        </button>
      )}
    </div>
  );
}
