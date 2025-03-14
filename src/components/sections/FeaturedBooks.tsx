"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function FeaturedBooks() {
  const [activeTab, setActiveTab] = useState<'poetry' | 'health' | 'selfHelp'>('poetry');
  const { language } = useLanguage();
  
  // Hardcoded featured books data
  const featuredBooks = {
    poetry: [
      {
        id: 'poetry-1',
        title: language === 'bg' ? 'Вдъхновения' : 'Inspirations',
        description: language === 'bg' 
          ? 'Сборник от поетични творби, които ще докоснат душата ви и ще ви накарат да се замислите за красотата на живота.'
          : 'A collection of poetic works that will touch your soul and make you think about the beauty of life.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 19.99 : 24.99,
      },
      {
        id: 'poetry-2',
        title: language === 'bg' ? 'Душевни Пътеки' : 'Soul Paths',
        description: language === 'bg'
          ? 'Поетично пътешествие през емоциите и преживяванията, които формират човешкия опит.'
          : 'A poetic journey through the emotions and experiences that shape the human experience.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 22.99 : 27.99,
      },
      {
        id: 'poetry-3',
        title: language === 'bg' ? 'Моменти на Яснота' : 'Moments of Clarity',
        description: language === 'bg'
          ? 'Стихове, които улавят мигове на прозрение и яснота в хаоса на ежедневието.'
          : 'Verses that capture moments of insight and clarity in the chaos of everyday life.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 18.99 : 23.99,
      },
    ],
    health: [
      {
        id: 'health-1',
        title: language === 'bg' ? 'Балансирано Хранене' : 'Balanced Nutrition',
        description: language === 'bg'
          ? 'Практически съвети за здравословно хранене и поддържане на енергичен начин на живот.'
          : 'Practical advice for healthy eating and maintaining an energetic lifestyle.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 24.99 : 29.99,
      },
      {
        id: 'health-2',
        title: language === 'bg' ? 'Йога за Начинаещи' : 'Yoga for Beginners',
        description: language === 'bg'
          ? 'Въведение в йога практиките, които могат да трансформират тялото и ума ви.'
          : 'An introduction to yoga practices that can transform your body and mind.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 21.99 : 26.99,
      },
      {
        id: 'health-3',
        title: language === 'bg' ? 'Здравословен Сън' : 'Healthy Sleep',
        description: language === 'bg'
          ? 'Разкрийте тайните на качествения сън и как той влияе на цялостното ви здраве.'
          : 'Discover the secrets of quality sleep and how it affects your overall health.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 19.99 : 24.99,
      },
    ],
    selfHelp: [
      {
        id: 'selfHelp-1',
        title: language === 'bg' ? 'Пътят към Себепознанието' : 'The Path to Self-Knowledge',
        description: language === 'bg'
          ? 'Ръководство за откриване на вътрешната мъдрост и разбиране на истинската си същност.'
          : 'A guide to discovering inner wisdom and understanding your true nature.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 26.99 : 31.99,
      },
      {
        id: 'selfHelp-2',
        title: language === 'bg' ? 'Емоционална Интелигентност' : 'Emotional Intelligence',
        description: language === 'bg'
          ? 'Научете се да разпознавате и управлявате емоциите си за по-пълноценни взаимоотношения.'
          : 'Learn to recognize and manage your emotions for more fulfilling relationships.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 23.99 : 28.99,
      },
      {
        id: 'selfHelp-3',
        title: language === 'bg' ? 'Преодоляване на Страховете' : 'Overcoming Fears',
        description: language === 'bg'
          ? 'Практически подход за идентифициране и преодоляване на ограничаващите страхове.'
          : 'A practical approach to identifying and overcoming limiting fears.',
        image: '/images/books/vdahnovenia-kniga-1.png',
        price: language === 'bg' ? 22.99 : 27.99,
      },
    ],
  };
  
  const currentBooks = featuredBooks[activeTab];
  
  const getCategoryTitle = () => {
    switch (activeTab) {
      case 'poetry':
        return language === 'bg' ? 'ПОЕЗИЯ' : 'POETRY';
      case 'health':
        return language === 'bg' ? 'ЗДРАВЕ' : 'HEALTH';
      case 'selfHelp':
        return language === 'bg' ? 'САМОПОМОЩ' : 'SELF-HELP';
      default:
        return '';
    }
  };
  
  const getCategoryIcon = () => {
    switch (activeTab) {
      case 'poetry':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'health':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'selfHelp':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getTabClass = (tab: 'poetry' | 'health' | 'selfHelp') => {
    return `px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === tab
        ? 'bg-green-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative text-center mb-12">
          <div className="flex items-center justify-center">
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <div className="mx-6 flex items-center text-black">
              {getCategoryIcon()}
              <span className="font-normal uppercase text-3xl">
                {getCategoryTitle()}
              </span>
            </div>
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, transparent 50%, transparent 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`${getTabClass('poetry')} rounded-l-md border border-r-0`}
              onClick={() => setActiveTab('poetry')}
            >
              {language === 'bg' ? 'Поезия' : 'Poetry'}
            </button>
            <button
              type="button"
              className={`${getTabClass('health')} border-y border-r-0`}
              onClick={() => setActiveTab('health')}
            >
              {language === 'bg' ? 'Здраве' : 'Health'}
            </button>
            <button
              type="button"
              className={`${getTabClass('selfHelp')} rounded-r-md border`}
              onClick={() => setActiveTab('selfHelp')}
            >
              {language === 'bg' ? 'Самопомощ' : 'Self-Help'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentBooks.map((book) => (
            <div key={book.id} className="group">
              <div className="relative transition-all duration-300 transform group-hover:translate-y-[-5px] group-hover:shadow-xl">
                <div className="bg-white border-2 border-black overflow-hidden rounded-none shadow-md">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {language === 'bg' ? `${book.price.toFixed(2)} лв.` : `$${book.price.toFixed(2)}`}
                      </span>
                      <Button variant="outline" size="sm" className="bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-sm hover:shadow-md transition-all duration-300 rounded-none">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {language === 'bg' ? 'Детайли' : 'Details'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="px-8 py-6 bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1 hover:scale-105" asChild>
            <Link href={`/category/${activeTab}`}>
              <BookOpen className="mr-2 h-5 w-5" />
              {language === 'bg' ? 'Вижте всички книги' : 'View All Books'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 