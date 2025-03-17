'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Package, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';
import { services } from '@/lib/services-data';
import { shopBooks } from '@/lib/shop-data';
import { Service } from '@/types';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [relatedBook, setRelatedBook] = useState<any | null>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Find the service by ID
    const foundService = services.find(s => s.id === params.id);
    
    if (!foundService) {
      notFound();
    }
    
    setService(foundService);
    
    // Find related book if available
    if (foundService.relatedBookId) {
      const book = shopBooks.find(b => b.id === foundService.relatedBookId);
      if (book) {
        setRelatedBook(book);
      }
    }
  }, [params.id]);
  
  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/services" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Back to Services' : 'Назад към Услугите'}
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Image/Icon */}
            <div className="p-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
              <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center">
                {service.category === 'individual' 
                  ? <User className="h-24 w-24 text-white" /> 
                  : <Package className="h-24 w-24 text-white" />}
              </div>
            </div>
            
            {/* Service Details */}
            <div className="p-8">
              {/* Category Badge */}
              <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                {service.category === 'individual' 
                  ? (language === 'en' ? 'Individual Service' : 'Индивидуална Услуга') 
                  : (language === 'en' ? 'Service Package' : 'Пакетна Услуга')}
              </Badge>
              
              {/* Title and Price */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">{service.title}</h1>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}
                </div>
              </div>
              
              {/* Duration */}
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <Clock className="h-5 w-5 mr-2" />
                <span>{service.duration}</span>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? 'Description' : 'Описание'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
              
              {/* Includes (for packages) */}
              {service.category === 'package' && service.includes && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {language === 'en' ? 'What\'s Included' : 'Какво Включва'}
                  </h2>
                  <ul className="space-y-2">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Related Book */}
              {relatedBook && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {language === 'en' ? 'Related Book' : 'Свързана Книга'}
                  </h2>
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-24 relative mr-4 flex-shrink-0">
                      <Image 
                        src={relatedBook.coverImage} 
                        alt={relatedBook.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{relatedBook.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{relatedBook.description}</p>
                      <Link 
                        href={`/shop/${relatedBook.id}`}
                        className="text-green-600 dark:text-green-400 text-sm inline-flex items-center mt-2 hover:underline"
                      >
                        {language === 'en' ? 'View Book' : 'Виж Книгата'}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {/* CTA Button */}
              <Button 
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                asChild
              >
                <Link href={`/services/${service.id}/book`}>
                  <Calendar className="h-5 w-5 mr-2" />
                  {language === 'en' ? 'Book This Service' : 'Запази Тази Услуга'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 