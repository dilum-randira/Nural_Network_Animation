import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Neural Network Explorer',
  description: 'Articles, tutorials, and insights about neural networks, AI trends, and learning resources.',
  keywords: 'neural networks, AI tutorials, deep learning articles, machine learning blog, AI research, neural network education',
  openGraph: {
    title: 'Neural Network Explorer Blog',
    description: 'Discover the latest articles, tutorials, and insights about neural networks, AI trends, and more.',
    type: 'website',
    url: 'https://neuralnetworkexplorer.com/blog',
    images: [
      {
        url: 'https://neuralnetworkexplorer.com/images/blog/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neural Network Explorer Blog',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Network Explorer Blog',
    description: 'Discover the latest articles, tutorials, and insights about neural networks, AI trends, and more.',
    images: ['https://neuralnetworkexplorer.com/images/blog/blog-twitter-image.jpg'],
  }
};
