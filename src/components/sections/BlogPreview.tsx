"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

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
    <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="relative text-center mb-12">
          <div className="flex items-center justify-center">
            <div className="w-1/3 h-px bg-gray-300 dark:bg-gray-700 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <div className="mx-6 flex items-center text-black dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="font-normal uppercase text-3xl">
                {language === 'bg' ? 'БЛОГ ЗА БЛАГОСЪСТОЯНИЕ И ОСЪЗНАТОСТ' : 'WELLNESS & MINDFULNESS BLOG'}
              </span>
            </div>
            <div className="w-1/3 h-px bg-gray-300 dark:bg-gray-700 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, transparent 50%, transparent 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'bg' 
              ? 'Разгледайте статии за здраве, благосъстояние, осъзнатост и личностно развитие, написани от Елис'
              : 'Explore articles on health, wellness, mindfulness, and personal growth written by Elis'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group block"
            >
              <div className="relative transition-all duration-300 transform group-hover:translate-y-[-5px] group-hover:shadow-xl">
                <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 overflow-hidden rounded-none shadow-md">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-none">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
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
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                      {language === 'bg' ? 'Прочетете повече' : 'Read more'}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="px-8 py-6 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1 hover:scale-105" asChild>
            <Link href="/blog">
              <span className="flex items-center">
                {language === 'bg' ? 'Вижте всички статии' : 'View All Articles'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 