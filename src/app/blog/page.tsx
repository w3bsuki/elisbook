"use client";

import React from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import Image from "next/image";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: {
      en: "The Art of Storytelling: Crafting Compelling Narratives",
      bg: "Изкуството на разказването: Създаване на завладяващи истории"
    },
    excerpt: {
      en: "Discover the essential elements that make a story captivating and how to weave them into your own writing.",
      bg: "Открийте основните елементи, които правят една история завладяваща и как да ги вплетете в собственото си писане."
    },
    date: "2023-10-15",
    readTime: 8,
    category: {
      en: "Writing Tips",
      bg: "Съвети за писане"
    },
    image: "/images/blog/storytelling.txt"
  },
  {
    id: 2,
    title: {
      en: "Character Development: Creating Memorable Protagonists",
      bg: "Развитие на персонажи: Създаване на запомнящи се протагонисти"
    },
    excerpt: {
      en: "Learn how to create multi-dimensional characters that readers will connect with and remember long after finishing your book.",
      bg: "Научете как да създавате многоизмерни персонажи, с които читателите ще се свържат и ще запомнят дълго след като приключат книгата ви."
    },
    date: "2023-11-02",
    readTime: 10,
    category: {
      en: "Character Design",
      bg: "Дизайн на персонажи"
    },
    image: "/images/blog/character-development.txt"
  },
  {
    id: 3,
    title: {
      en: "Finding Inspiration: Where Great Ideas Come From",
      bg: "Намиране на вдъхновение: Откъде идват великите идеи"
    },
    excerpt: {
      en: "Explore different sources of inspiration and techniques to overcome writer's block and keep your creative juices flowing.",
      bg: "Изследвайте различни източници на вдъхновение и техники за преодоляване на писателския блок и поддържане на творческия поток."
    },
    date: "2023-12-05",
    readTime: 6,
    category: {
      en: "Creativity",
      bg: "Креативност"
    },
    image: "/images/blog/inspiration.txt"
  }
];

// Format date function
const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(language === 'en' ? 'en-US' : 'bg-BG', options);
};

export default function BlogPage() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Blog Header */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{language === 'en' ? 'Blog' : 'Блог'}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Explore articles about writing, publishing, and the literary world. Get insights and tips to enhance your reading and writing experience.'
            : 'Разгледайте статии за писане, публикуване и литературния свят. Получете прозрения и съвети, за да подобрите вашето четене и писане.'}
        </p>
      </section>
      
      {/* Featured Post */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative h-[400px] md:h-[500px] bg-green-100">
            <Image 
              src="/images/blog/featured-post.txt" 
              alt="Featured Post" 
              fill
              className="object-cover"
              onError={(e) => {
                // Hide the image on error
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                  {language === 'en' ? 'Featured' : 'Препоръчано'}
                </span>
                <span className="text-sm">
                  {language === 'en' ? 'Publishing' : 'Публикуване'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {language === 'en' 
                  ? 'The Future of Publishing: Digital Trends and Opportunities'
                  : 'Бъдещето на публикуването: Дигитални тенденции и възможности'}
              </h2>
              <p className="text-gray-200 mb-4 max-w-2xl">
                {language === 'en'
                  ? 'Explore how digital technologies are transforming the publishing industry and creating new opportunities for authors and readers alike.'
                  : 'Разгледайте как дигиталните технологии трансформират издателската индустрия и създават нови възможности както за авторите, така и за читателите.'}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate('2024-01-10', language)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {language === 'en' ? '12 min read' : '12 мин. четене'}
                  </span>
                </div>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                {language === 'en' ? 'Read Article' : 'Прочети статията'}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {language === 'en' ? 'Recent Articles' : 'Последни статии'}
          </h2>
          <Button variant="outline" className="gap-2">
            {language === 'en' ? 'View All' : 'Виж всички'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-green-100">
                <Image 
                  src={post.image || "/images/placeholder.jpg"} 
                  alt={post.title[language as keyof typeof post.title] || ''} 
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide the image on error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">
                    {post.category[language as keyof typeof post.category]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {post.title[language as keyof typeof post.title]}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt[language as keyof typeof post.excerpt]}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.date, language)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {post.readTime} {language === 'en' ? 'min read' : 'мин. четене'}
                    </span>
                  </div>
                </div>
                <Button variant="link" className="p-0 mt-4 text-green-600 hover:text-green-700">
                  {language === 'en' ? 'Read More' : 'Прочети повече'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="bg-green-50 dark:bg-green-950/20 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'en' ? 'Subscribe to My Newsletter' : 'Абонирайте се за моя бюлетин'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'en'
              ? 'Stay updated with my latest articles, book releases, and exclusive content delivered straight to your inbox.'
              : 'Бъдете в течение с моите най-нови статии, издания на книги и ексклузивно съдържание, доставено директно във вашата пощенска кутия.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={language === 'en' ? 'Your email address' : 'Вашият имейл адрес'} 
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              {language === 'en' ? 'Subscribe' : 'Абонирай се'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 