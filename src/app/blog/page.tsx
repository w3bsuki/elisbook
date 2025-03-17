import React from 'react';
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample blog posts data
const blogPosts = [
  {
    id: "the-art-of-storytelling",
    title: "The Art of Storytelling: Crafting Compelling Narratives",
    excerpt: "Discover the essential elements that make a story captivating and how to weave them into your own writing.",
    date: "2023-10-15",
    readTime: 8,
    category: "Writing Tips",
    image: "/images/blog/storytelling.txt"
  },
  {
    id: "finding-your-voice",
    title: "Finding Your Voice: Developing a Unique Writing Style",
    excerpt: "Learn how to develop and refine your distinctive writing voice to stand out in a crowded literary landscape.",
    date: "2023-09-28",
    readTime: 6,
    category: "Writing Tips",
    image: "/images/blog/writing-style.txt"
  },
  {
    id: "publishing-journey",
    title: "The Publishing Journey: From Manuscript to Bookshelf",
    excerpt: "A comprehensive guide to navigating the complex world of publishing and getting your book into readers' hands.",
    date: "2023-08-12",
    readTime: 10,
    category: "Publishing",
    image: "/images/blog/publishing.txt"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thoughts, stories and ideas about writing and literature
          </p>
        </div>
        
        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>November 5, 2023</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>12 min read</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
                  The Evolution of Literature in the Digital Age
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Exploring how technology has transformed storytelling, publishing, and reading habits in the modern era.
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    <span>Digital Literature</span>
                  </div>
                </div>
                <Link href="/blog/digital-literature" className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:underline">
                  Read Article
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-1">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold font-playfair mb-3 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>{post.category}</span>
                  </div>
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium hover:underline">
                    Read More
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 