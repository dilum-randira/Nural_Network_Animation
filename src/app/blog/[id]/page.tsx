"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlogLayout from "@/components/blog/BlogLayout";
import RelatedPosts from "@/components/blog/RelatedPosts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export default function BlogPostPage() {
  const { t } = useLanguage();
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would typically be an API call to fetch the post data
    // For now, we'll use static data
    const posts: BlogPost[] = [
      {
        id: "introduction-to-neural-networks",
        title: "Introduction to Neural Networks: A Beginner's Guide",
        excerpt: "Learn the basic concepts of neural networks and how they work. This beginner-friendly guide explains neurons, layers, activation functions, and more.",
        content: `
          <h2>What Are Neural Networks?</h2>
          <p>Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. They are a set of algorithms designed to recognize patterns and interpret sensory data through a kind of machine perception, labeling or clustering raw input.</p>
          
          <h2>The Basic Components</h2>
          <p>At their core, neural networks consist of:</p>
          <ul>
            <li><strong>Neurons</strong>: The basic computational units that receive inputs, process them, and deliver outputs.</li>
            <li><strong>Connections</strong>: Pathways for information to flow from one neuron to another, each with an associated weight.</li>
            <li><strong>Layers</strong>: Groups of neurons that process information at the same level of abstraction.</li>
          </ul>
          
          <h2>How Neural Networks Learn</h2>
          <p>Neural networks learn through a process called backpropagation. Here's a simplified explanation of how it works:</p>
          <ol>
            <li>The network makes a prediction based on input data.</li>
            <li>The prediction is compared to the actual target value to calculate the error.</li>
            <li>The error is propagated backward through the network.</li>
            <li>The weights of connections are adjusted to minimize the error.</li>
            <li>This process is repeated for many examples until the network performs well.</li>
          </ol>
          
          <h2>Types of Neural Networks</h2>
          <p>There are many types of neural networks, each designed for specific tasks:</p>
          <ul>
            <li><strong>Feedforward Neural Networks</strong>: The simplest type, where information moves in only one direction.</li>
            <li><strong>Convolutional Neural Networks (CNNs)</strong>: Specialized for processing grid-like data such as images.</li>
            <li><strong>Recurrent Neural Networks (RNNs)</strong>: Designed for sequential data like time series or natural language.</li>
            <li><strong>Long Short-Term Memory Networks (LSTMs)</strong>: A type of RNN that can learn long-term dependencies.</li>
          </ul>
          
          <h2>Applications of Neural Networks</h2>
          <p>Neural networks are used in a wide range of applications, including:</p>
          <ul>
            <li>Image and speech recognition</li>
            <li>Natural language processing</li>
            <li>Medical diagnosis</li>
            <li>Financial forecasting</li>
            <li>Autonomous vehicles</li>
            <li>Game playing</li>
          </ul>
          
          <h2>Getting Started with Neural Networks</h2>
          <p>If you're interested in learning more about neural networks, here are some steps to get started:</p>
          <ol>
            <li>Learn the fundamentals of linear algebra, calculus, and probability.</li>
            <li>Choose a programming language like Python and learn libraries such as TensorFlow or PyTorch.</li>
            <li>Start with simple projects like digit recognition or sentiment analysis.</li>
            <li>Join online communities to learn from others and share your progress.</li>
            <li>Keep up with the latest research by reading papers and blog posts.</li>
          </ol>
          
          <p>Ready to dive deeper? Check out our courses on neural networks to learn hands-on!</p>
        `,
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
        content: `
          <h2>Understanding the Distinction</h2>
          <p>Machine learning and deep learning are terms that are often used interchangeably, but they're not the same thing. Let's clarify the differences between these two AI approaches.</p>
          
          <h2>What is Machine Learning?</h2>
          <p>Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can receive data and use statistical analysis to predict an output.</p>
          
          <p>Key characteristics of traditional machine learning:</p>
          <ul>
            <li>Often requires feature extraction by human experts</li>
            <li>Typically performs well with structured data</li>
            <li>Requires less computational power</li>
            <li>Works effectively with smaller datasets</li>
            <li>More interpretable and explainable results</li>
          </ul>
          
          <h2>What is Deep Learning?</h2>
          <p>Deep learning is a specialized subset of machine learning that uses neural networks with multiple layers (hence "deep") to progressively extract higher-level features from raw input.</p>
          
          <p>Key characteristics of deep learning:</p>
          <ul>
            <li>Automatically discovers relevant features without human intervention</li>
            <li>Excels with unstructured data like images, text, and audio</li>
            <li>Requires significant computational resources</li>
            <li>Generally needs much larger datasets</li>
            <li>Often functions as a "black box" with less interpretability</li>
          </ul>
          
          <h2>When to Use Machine Learning vs. Deep Learning</h2>
          <p>Choose machine learning when:</p>
          <ul>
            <li>You have limited computational resources</li>
            <li>You're working with structured, tabular data</li>
            <li>You have a smaller dataset</li>
            <li>Interpretability and explainability are important</li>
            <li>You need quick model development and deployment</li>
          </ul>
          
          <p>Choose deep learning when:</p>
          <ul>
            <li>You have access to GPUs or specialized hardware</li>
            <li>You're working with unstructured data (images, text, audio)</li>
            <li>You have a large dataset</li>
            <li>You need the highest possible accuracy</li>
            <li>The problem is complex (computer vision, NLP, etc.)</li>
          </ul>
          
          <h2>Practical Examples</h2>
          <p>Machine learning is often used for:</p>
          <ul>
            <li>Credit scoring and fraud detection</li>
            <li>Customer segmentation</li>
            <li>Recommendation systems</li>
            <li>Predictive maintenance</li>
            <li>Spam filtering</li>
          </ul>
          
          <p>Deep learning is preferred for:</p>
          <ul>
            <li>Image recognition and computer vision</li>
            <li>Natural language processing and translation</li>
            <li>Speech recognition</li>
            <li>Autonomous vehicles</li>
            <li>Complex game playing (like AlphaGo)</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>Both machine learning and deep learning have their places in the AI ecosystem. The best approach depends on your specific use case, data, computational resources, and requirements for interpretability. As you continue your journey in AI, understanding these distinctions will help you choose the right tools for the job.</p>
        `,
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

    setLoading(true);
    
    // Find the current post
    const currentPost = posts.find(p => p.id === postId);
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find related posts from the same category
      const related = posts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      
      setRelatedPosts(related);
    }
    
    setLoading(false);
  }, [postId]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog" className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          {/* Article header */}
          <header className="mb-8">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs uppercase font-bold rounded-full">
                {t(`blog.categories.${post.category}`)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="mr-4">{formatDate(post.date)}</span>
              <span>By {post.author}</span>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="mb-8 rounded-xl overflow-hidden bg-gray-200 h-64 md:h-80"></div>
          
          {/* Article content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            ) : (
              <>
                <p className="lead">{post.excerpt}</p>
                <p>Full content for this article is coming soon.</p>
              </>
            )}
          </div>
          
          {/* Author section */}
          <div className="mt-12 pt-8 border-t dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden"></div>
              <div className="ml-4">
                <h3 className="font-medium">{post.author}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI Researcher & Educator
                </p>
              </div>
            </div>
          </div>
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
