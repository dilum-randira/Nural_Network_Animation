import type { Metadata } from 'next';

// This is a dynamic metadata function for blog posts
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // You would typically fetch the blog post data here
  // For simplicity, we're using a basic approach
  const id = params.id;
  
  // Convert kebab-case to title case
  const title = id.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${title} | Neural Network Explorer Blog`,
    description: `Read our in-depth article about ${title.toLowerCase()} and expand your knowledge about neural networks and AI.`,
    openGraph: {
      title: `${title} | Neural Network Explorer Blog`,
      description: `Read our in-depth article about ${title.toLowerCase()} and expand your knowledge about neural networks and AI.`,
      type: 'article',
      url: `https://neuralnetworkexplorer.com/blog/${id}`,
      images: [
        {
          url: `https://neuralnetworkexplorer.com/images/blog/${id}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Neural Network Explorer Blog`,
      description: `Read our in-depth article about ${title.toLowerCase()} and expand your knowledge about neural networks and AI.`,
      images: [`https://neuralnetworkexplorer.com/images/blog/${id}.jpg`],
    }
  };
}
