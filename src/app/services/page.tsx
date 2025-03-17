'use client';

import { useState, Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Package, User, Search, SlidersHorizontal, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { services, filterServicesByCategory, searchServices, sortServices } from '@/lib/services-data';
import { Service } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/LanguageContext';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { language } = useLanguage();
  
  // Apply filters and sorting
  let filteredServices = activeTab === "all" 
    ? services 
    : filterServicesByCategory(services, activeTab);
  
  // Apply search
  if (searchTerm) {
    filteredServices = searchServices(filteredServices, searchTerm);
  }
  
  // Apply sorting
  filteredServices = sortServices(filteredServices, sortBy);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Exclusive Services' : 'Ексклузивни Услуги'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Our Services' : 'Нашите Услуги'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Discover our personalized services designed to help you achieve your health and wellness goals.'
              : 'Открийте нашите персонализирани услуги, създадени да ви помогнат да постигнете вашите цели за здраве и благополучие.'}
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] p-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder={language === 'en' ? "Search services..." : "Търсене на услуги..."}
                  className="pl-10 border border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="w-full md:w-44">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 h-9">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={language === 'en' ? "Sort by" : "Сортирай по"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{language === 'en' ? "Featured" : "Препоръчани"}</SelectItem>
                    <SelectItem value="price-low">{language === 'en' ? "Price: Low to High" : "Цена: Ниска към Висока"}</SelectItem>
                    <SelectItem value="price-high">{language === 'en' ? "Price: High to Low" : "Цена: Висока към Ниска"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for filtering */}
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                <TabsTrigger 
                  value="all" 
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  {language === 'en' ? 'All Services' : 'Всички Услуги'}
                </TabsTrigger>
                <TabsTrigger 
                  value="individual" 
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <User className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Individual' : 'Индивидуални'}
                </TabsTrigger>
                <TabsTrigger 
                  value="package" 
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <Package className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Packages' : 'Пакети'}
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Services grid */}
            <TabsContent value={activeTab} className="mt-6">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' 
                      ? 'No services found matching your criteria.' 
                      : 'Не са намерени услуги, отговарящи на вашите критерии.'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: Service }) {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col h-full group relative overflow-hidden border border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-md transition-all duration-300 hover:shadow-[3px_3px_0px_0px_rgba(22,163,74,0.5)] dark:hover:shadow-[3px_3px_0px_0px_rgba(22,163,74,0.3)] w-full">
      {/* Service image with proper positioning */}
      <div className="relative">
        <AspectRatio ratio={16/9} className="bg-gradient-to-br from-green-400 to-green-600">
          <div className="w-full h-full flex items-center justify-center">
            {service.category === 'individual' 
              ? <User className="h-12 w-12 text-white" /> 
              : <Package className="h-12 w-12 text-white" />}
          </div>
        </AspectRatio>
        
        {/* Category badge - positioned on top of image */}
        <div className="absolute top-2 left-2 z-30">
          <div className="bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-md border border-black dark:border-gray-700 shadow-sm font-medium text-[10px]">
            {service.category === 'individual' 
              ? (language === 'en' ? 'Individual' : 'Индивидуална') 
              : (language === 'en' ? 'Package' : 'Пакет')}
          </div>
        </div>
      </div>
      
      {/* Service details */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{service.title}</h3>
          <span className="font-bold text-sm text-green-600 dark:text-green-400 ml-1 whitespace-nowrap">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{service.duration}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex-grow line-clamp-3">
          {service.description}
        </p>
        
        {/* Includes list for packages - show up to 2 items */}
        {service.category === 'package' && service.includes && (
          <div className="mb-2">
            <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-300 mb-1">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </h4>
            <ul className="text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
              {service.includes.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {service.includes.length > 2 && (
                <li className="text-green-600 dark:text-green-400 italic text-[9px]">
                  +{service.includes.length - 2} {language === 'en' ? 'more' : 'още'}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
            asChild
          >
            <Link href={`/services/${service.id}/book`}>
              <Calendar className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Book Now' : 'Запази'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 