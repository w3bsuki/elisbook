"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
}

export default function BlogSection() {
  const { t, language } = useLanguage();
  
  // Blog data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: language === 'bg' ? 'Как да подобрите психическото си здраве чрез медитация' : 'How to Improve Your Mental Health Through Meditation',
      excerpt: language === 'bg' 
        ? 'Открийте как ежедневната медитация може да трансформира вашето психическо здраве и да ви помогне да се справите по-добре със стреса и тревожността в забързаното ежедневие.'
        : 'Discover how daily meditation can transform your mental health and help you better cope with stress and anxiety in your busy daily life.',
      coverImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2070&auto=format&fit=crop',
      category: language === 'bg' ? 'Психическо здраве' : 'Mental Health',
      date: '2023-10-15',
      readTime: language === 'bg' ? '5 мин. четене' : '5 min read'
    },
    {
      id: '2',
      title: language === 'bg' ? 'Балансирано хранене за енергично тяло и ум' : 'Balanced Nutrition for an Energetic Body and Mind',
      excerpt: language === 'bg'
        ? 'Научете как правилното хранене влияе не само на физическото, но и на психическото ви състояние, и как да създадете хранителен план, който поддържа цялостното ви здраве.'
        : 'Learn how proper nutrition affects not only your physical but also your mental state, and how to create a nutritional plan that supports your overall health.',
      coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
      category: language === 'bg' ? 'Хранене' : 'Nutrition',
      date: '2023-11-02',
      readTime: language === 'bg' ? '7 мин. четене' : '7 min read'
    },
    {
      id: '3',
      title: language === 'bg' ? 'Връзката между тялото и душата: Холистичен подход към здравето' : 'The Body-Soul Connection: A Holistic Approach to Health',
      excerpt: language === 'bg'
        ? 'Изследвайте дълбоката връзка между физическото и духовното благосъстояние и как холистичният подход към здравето може да доведе до по-пълноценен и балансиран живот.'
        : 'Explore the deep connection between physical and spiritual well-being and how a holistic approach to health can lead to a more fulfilling and balanced life.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop',
      category: language === 'bg' ? 'Холистично здраве' : 'Holistic Health',
      date: '2023-12-05',
      readTime: language === 'bg' ? '6 мин. четене' : '6 min read'
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'bg' ? 'bg-BG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {ensureString(t("blog.title"))}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {ensureString(t("blog.subtitle"))}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </AspectRatio>
                <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">
                  {post.category}
                </Badge>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-xs text-muted-foreground mb-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div>
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.id}`}>
                  <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700 font-medium">
                    {language === 'bg' ? 'Прочетете повече' : 'Read more'} 
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200">
              {language === 'bg' ? 'Вижте всички статии' : 'View all articles'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 