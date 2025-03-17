"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Package, User, ChevronRight, Eye, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { services, filterServicesByCategory } from "@/lib/services-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Service } from "@/types";

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { language } = useLanguage();
  
  // Filter services based on active tab
  const filteredServices = activeTab === "all" 
    ? services 
    : filterServicesByCategory(services, activeTab);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-br-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-tl-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Exclusive Services' : 'Ексклузивни Услуги'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Our' : 'Нашите'}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 dark:bg-green-700/50 -z-10 transform -rotate-1"></span>
            </span>{" "}
            {language === 'en' ? 'Services' : 'Услуги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our personalized services designed to help you achieve your health and wellness goals.'
              : 'Открийте нашите персонализирани услуги, създадени да ви помогнат да постигнете вашите цели за здраве и благополучие.'}
          </p>
        </div>
        
        {/* Tabs for filtering */}
        <div className="mb-10">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-10">
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
            asChild
          >
            <Link href="/services">
              {language === 'en' ? 'View All Services' : 'Вижте Всички Услуги'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: Service }) {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col h-full group relative overflow-hidden border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.5)] dark:hover:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)]">
      {/* Category badge - top left */}
      <div className="absolute top-0 left-0 z-30">
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-br-lg border-r-2 border-b-2 border-black dark:border-gray-700 shadow-md transform rotate-0 font-medium text-[10px]">
          {service.category === 'individual' 
            ? (language === 'en' ? 'Individual' : 'Индивидуална') 
            : (language === 'en' ? 'Package' : 'Пакет')}
        </div>
      </div>
      
      {/* Service image */}
      <div className="p-3 pb-0">
        <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2 border border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            {service.category === 'individual' 
              ? <User className="h-12 w-12 text-white" /> 
              : <Package className="h-12 w-12 text-white" />}
          </div>
        </AspectRatio>
      </div>
      
      {/* Service details */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{service.title}</h3>
          <span className="font-bold text-sm text-green-600 dark:text-green-400">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{service.duration}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex-grow line-clamp-3">
          {service.description}
        </p>
        
        {/* Includes list for packages - only show for packages and limit to 2 items */}
        {service.category === 'package' && service.includes && (
          <div className="mb-2">
            <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-300 mb-1">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </h4>
            <ul className="text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
              {service.includes.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {service.includes.length > 2 && (
                <li className="text-green-600 dark:text-green-400 italic">
                  +{service.includes.length - 2} {language === 'en' ? 'more' : 'още'}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-1 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 flex-1 h-7 text-[10px] border border-black dark:border-gray-700 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className={cn(
              "bg-green-600 hover:bg-green-700 text-white flex-1 h-7 text-[10px] border border-black dark:border-gray-700 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm",
              "transition-transform duration-200 hover:scale-105"
            )}
            asChild
          >
            <Link href={`/services/${service.id}/book`}>
              <Calendar className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Book Now' : 'Запази'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 