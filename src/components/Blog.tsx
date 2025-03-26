'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  externalUrl: string;
  featured?: boolean;
}

// Blog categories with their respective colors
const categories = [
  { name: 'Program Management', color: 'bg-blue-600' },
  { name: 'Cybersecurity Trends', color: 'bg-teal-600' },
  { name: 'Leadership & Strategy', color: 'bg-navy-600' },
  { name: 'Data-Driven Decision-Making', color: 'bg-purple-600' },
  { name: 'Personal Growth & Career Advice', color: 'bg-green-600' },
];

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Data Visualization Transforms Decision-Making in Program Management',
    category: 'Data-Driven Decision-Making',
    date: 'March 15, 2024',
    excerpt: 'Explore how modern data visualization tools are revolutionizing program management decision-making processes...',
    imageUrl: '/blog/data-visualization.jpg',
    externalUrl: 'https://www.linkedin.com/pulse/how-data-visualization-transforms-decision-making-bala-karumanchi-fjumc?trackingId=3E%2FVDoJAQD6UANqKxXnIjg%3D%3D&lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BxD%2Fr9FBORU2sfMP1ZdzFSw%3D%3D',
    featured: true,
  },
  {
    id: '2',
    title: 'Lessons Learned from Leading Cross-Cultural Teams Across Four Continents',
    category: 'Leadership & Strategy',
    date: 'Coming Soon...',
    excerpt: 'Insights and strategies for effectively managing diverse, global teams in today\'s interconnected world...',
    imageUrl: '/blog/global-teams.jpg',
    externalUrl: 'https://medium.com/@balakarumanchi/cross-cultural-team-leadership',
    featured: true,
  },
  {
    id: '3',
    title: 'The Future of Cybersecurity: Quantum Technology & Its Implications',
    category: 'Cybersecurity Trends',
    date: 'Coming Soon...',
    excerpt: 'Understanding the revolutionary impact of quantum computing on enterprise security...',
    imageUrl: '/blog/quantum-security.jpg',
    externalUrl: 'https://medium.com/@balakarumanchi/quantum-cybersecurity-future',
    featured: true,
  },
  {
    id: '4',
    title: 'Driving Change Management: Strategies for Successful Transitions',
    category: 'Program Management',
    date: 'Coming Soon...',
    excerpt: 'Key strategies and frameworks for implementing successful organizational change...',
    imageUrl: '/blog/change-management.jpg',
    externalUrl: 'https://medium.com/@balakarumanchi/change-management-strategies',
  },
  {
    id: '5',
    title: 'My Journey from Embedded Systems to Program Leadership',
    category: 'Personal Growth & Career Advice',
    date: 'Coming Soon...',
    excerpt: 'Personal insights and lessons learned from transitioning to program management...',
    imageUrl: '/blog/career-journey.jpg',
    externalUrl: 'https://medium.com/@balakarumanchi/career-transition-journey',
  },
];

const FeaturedPostsCarousel = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl mb-12">
      <motion.div
        className="flex"
        animate={{ x: `-${currentSlide * 100}%` }}
        transition={{ duration: 0.5 }}
      >
        {featuredPosts.map((post) => (
          <div key={post.id} className="w-full flex-shrink-0 relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-200">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

const BlogImagePlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
    <span className="text-blue-600 text-sm font-medium text-center px-4">
      {title}
    </span>
  </div>
);

const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <BlogImagePlaceholder title="Loading..." />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10">
          <BlogImagePlaceholder title="Failed to load image" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

const BlogGrid = ({ selectedCategory }: { selectedCategory: string }) => {
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredPosts.map((post) => (
        <motion.div
          key={post.id}
          className="bg-white border border-gray-100 overflow-hidden group cursor-pointer"
          whileHover={{ y: -5 }}
          onClick={() => window.open(post.externalUrl, '_blank')}
        >
          <div className="relative h-56">
            <BlogImage src={post.imageUrl} alt={post.title} />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>
          <div className="p-6">
            <span className="text-sm text-blue-600 font-medium mb-2 block">
              {post.category}
            </span>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{post.date}</span>
              <Link 
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform"
              >
                Read More 
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Subscribe to Newsletter</h3>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="flex space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h4 className="font-medium hover:text-blue-600 transition-colors">
                  {post.title}
                </h4>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Insights & Perspectives: Navigating the World of Program Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my views on program management, cybersecurity trends, leadership strategies, and impactful change management.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              selectedCategory === '' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-600'
            }`}
            onClick={() => setSelectedCategory('')}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-600'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12">
          <BlogGrid selectedCategory={selectedCategory} />
        </div>

        <div className="mt-12 text-center">
          <form className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">Subscribe to Newsletter</h3>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Blog; 