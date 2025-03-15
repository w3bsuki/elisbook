"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, PenTool, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function BlogPreview() {
  const { language } = useLanguage();
  
  // Blog posts data with proper Bulgarian content
  const blogPosts = [
    {
      id: '1',
      title: language === 'bg' ? 'Как да подобрите психическото си здраве чрез медитация' : 'How to Improve Your Mental Health Through Meditation',
      excerpt: language === 'bg' 
        ? 'Открийте как ежедневната медитация може да трансформира вашето психическо здраве и да ви помогне да се справите по-добре със стреса и тревожността.'
        : 'Discover how daily meditation can transform your mental health and help you better cope with stress and anxiety.',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2070&auto=format&fit=crop',
      date: '2023-10-15',
      readTime: language === 'bg' ? '5 мин. четене' : '5 min read',
      category: language === 'bg' ? 'Психическо здраве' : 'Mental Health',
    },
    {
      id: '2',
      title: language === 'bg' ? 'Балансирано хранене за енергично тяло и ум' : 'Balanced Nutrition for an Energetic Body and Mind',
      excerpt: language === 'bg'
        ? 'Научете как правилното хранене влияе не само на физическото, но и на психическото ви състояние, и как да създадете хранителен план.'
        : 'Learn how proper nutrition affects not only your physical but also your mental state, and how to create a nutritional plan.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
      date: '2023-11-02',
      readTime: language === 'bg' ? '7 мин. четене' : '7 min read',
      category: language === 'bg' ? 'Хранене' : 'Nutrition',
    },
    {
      id: '3',
      title: language === 'bg' ? 'Връзката между тялото и душата: Холистичен подход към здравето' : 'The Body-Soul Connection: A Holistic Approach to Health',
      excerpt: language === 'bg'
        ? 'Изследвайте дълбоката връзка между физическото и духовното благосъстояние и как холистичният подход към здравето може да доведе до по-пълноценен живот.'
        : 'Explore the deep connection between physical and spiritual well-being and how a holistic approach to health can lead to a more fulfilling life.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop',
      date: '2023-12-05',
      readTime: language === 'bg' ? '6 мин. четене' : '6 min read',
      category: language === 'bg' ? 'Холистично здраве' : 'Holistic Health',
    },
  ];
  
  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'bg') {
      return new Intl.DateTimeFormat('bg-BG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20 rounded-br-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20 rounded-tl-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 mb-4">
            <PenTool className="h-3.5 w-3.5 mr-1" />
            {language === 'bg' ? 'Вдъхновяващи Статии' : 'Inspiring Articles'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'bg' ? 'Блог за' : 'Wellness &'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-amber-300 dark:bg-amber-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>{" "}
            {language === 'bg' ? 'Благосъстояние' : 'Mindfulness Blog'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'bg' 
              ? 'Разгледайте статии за здраве, благосъстояние, осъзнатост и личностно развитие, написани от Елис'
              : 'Explore articles on health, wellness, mindfulness, and personal growth written by Elis'}
          </p>
        </div>
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="flex flex-col h-full group relative overflow-hidden border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,0.5)] dark:hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,0.3)]"
            >
              {/* Category badge - top left */}
              <div className="absolute top-0 left-0 z-30">
                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-br-lg border-r-2 border-b-2 border-black dark:border-gray-700 shadow-md transform rotate-0 font-medium text-xs">
                  {post.category}
                </div>
              </div>
              
              {/* Image container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Post details with amber accent border */}
              <div className="flex flex-col flex-grow p-5 pt-4 border-t-2 border-amber-600/20 dark:border-amber-600/10 bg-gray-50 dark:bg-gray-800/80">
                <div className="flex justify-between items-center mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Action button */}
                <div className="mt-auto">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-950/30 w-full h-9 text-xs group border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
                    asChild
                  >
                    <Link href={`/blog/${post.id}`} className="flex items-center justify-center">
                      <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                      {language === 'bg' ? 'Прочетете статията' : 'Read Article'}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-950/30 group border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-6 py-5 h-auto rounded-md"
            asChild
          >
            <Link href="/blog" className="flex items-center">
              {language === 'bg' ? 'Вижте всички статии' : 'View All Articles'}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 