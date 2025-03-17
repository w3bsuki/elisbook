"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Package, User, ChevronRight, Eye, Star, Shield, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Service } from "@/types";

// Import services directly to avoid potential issues with dynamic imports
import { services as allServices, filterServicesByCategory } from "@/data/services";

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const { language } = useLanguage();
  
  // Use useEffect to handle the filtering after component mount
  useEffect(() => {
    // Filter services based on active tab
    const services = activeTab === "all" 
      ? allServices 
      : filterServicesByCategory(allServices, activeTab);
    
    setFilteredServices(services || []);
  }, [activeTab]);

  // Get featured services for the hero section
  const featuredServices = allServices.filter(service => service.featured).slice(0, 1);
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-br-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-tl-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Exclusive Services' : 'Ексклузивни Услуги'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'All' : 'Всички'}
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

        {/* Featured Service Hero Section */}
        {featuredServices.length > 0 && (
          <div className="mb-16 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.3)] bg-white dark:bg-gray-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <div className="relative z-10 p-8 text-center">
                      <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                        {featuredServices[0].category === 'individual' 
                          ? <User className="h-12 w-12 text-white" /> 
                          : <Package className="h-12 w-12 text-white" />}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{featuredServices[0].title}</h3>
                      <Badge className="bg-yellow-400 text-black border-0">
                        <Star className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Featured Service' : 'Препоръчана Услуга'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col">
                  <div className="mb-4 flex items-center">
                    <Badge className="mr-2 bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                      {featuredServices[0].category === 'individual' 
                        ? (language === 'en' ? 'Individual' : 'Индивидуална') 
                        : (language === 'en' ? 'Package' : 'Пакет')}
                    </Badge>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredServices[0].duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{featuredServices[0].title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredServices[0].description}</p>
                  
                  {featuredServices[0].category === 'package' && featuredServices[0].includes && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'en' ? 'What\'s Included:' : 'Какво включва:'}
                      </h4>
                      <ul className="space-y-2">
                        {featuredServices[0].includes.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {featuredServices[0].includes.length > 3 && (
                          <li className="text-green-600 dark:text-green-400 italic text-sm">
                            +{featuredServices[0].includes.length - 3} {language === 'en' ? 'more benefits' : 'още ползи'}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {featuredServices[0].price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}
                    </span>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                        asChild
                      >
                        <Link href={`/services/${featuredServices[0].id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Details' : 'Детайли'}
                        </Link>
                      </Button>
                      
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                        asChild
                      >
                        <Link href={`/services/${featuredServices[0].id}/book`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Book Now' : 'Запази'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Benefits */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Expert Guidance' : 'Експертно Ръководство'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Personalized advice from certified professionals with years of experience.'
                  : 'Персонализирани съвети от сертифицирани професионалисти с дългогодишен опит.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Tailored Approach' : 'Индивидуален Подход'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Services customized to your unique needs, goals, and lifestyle.'
                  : 'Услуги, персонализирани според вашите уникални нужди, цели и начин на живот.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Exclusive Resources' : 'Ексклузивни Ресурси'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Access to premium materials, tools, and support not available elsewhere.'
                  : 'Достъп до премиум материали, инструменти и подкрепа, които не са достъпни другаде.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs for filtering */}
        <div className="mb-10">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-1.5 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                <TabsTrigger 
                  value="all" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  {language === 'en' ? 'All Services' : 'Всички Услуги'}
                </TabsTrigger>
                <TabsTrigger 
                  value="individual" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <User className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Individual' : 'Индивидуални'}
                </TabsTrigger>
                <TabsTrigger 
                  value="package" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <Package className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Packages' : 'Пакети'}
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Services grid */}
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {Array.isArray(filteredServices) && filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'No services found.' : 'Не са намерени услуги.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-8 py-6 h-auto rounded-xl"
            asChild
          >
            <Link href="/services" className="flex items-center text-lg">
              {language === 'en' ? 'View All Services' : 'Вижте Всички Услуги'}
              <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col h-full group relative overflow-hidden border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:hover:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.3)] w-full transform hover:-translate-y-1">
      {/* Service image with proper positioning */}
      <div className="relative">
        <AspectRatio ratio={16/9} className="bg-gradient-to-br from-green-400 to-green-600">
          <div className="w-full h-full flex items-center justify-center">
            {service.category === 'individual' 
              ? <User className="h-16 w-16 text-white" /> 
              : <Package className="h-16 w-16 text-white" />}
          </div>
        </AspectRatio>
        
        {/* Category badge - positioned on top of image */}
        <div className="absolute top-3 left-3 z-30">
          <div className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 px-3 py-1 rounded-full border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] font-medium text-xs flex items-center">
            {service.category === 'individual' 
              ? (
                <>
                  <User className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Individual' : 'Индивидуална'}
                </>
              ) 
              : (
                <>
                  <Package className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Package' : 'Пакет'}
                </>
              )}
          </div>
        </div>
        
        {/* Featured badge if applicable */}
        {service.featured && (
          <div className="absolute top-3 right-3 z-30">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] font-medium text-xs flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Featured' : 'Препоръчана'}
            </div>
          </div>
        )}
      </div>
      
      {/* Service details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2">{service.title}</h3>
          <span className="font-bold text-lg text-green-600 dark:text-green-400 ml-2 whitespace-nowrap">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{service.duration}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
          {service.description}
        </p>
        
        {/* Includes list for packages - show up to 3 items */}
        {service.category === 'package' && service.includes && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
              {service.includes.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1.5 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {service.includes.length > 3 && (
                <li className="text-green-600 dark:text-green-400 italic text-xs">
                  +{service.includes.length - 3} {language === 'en' ? 'more' : 'още'}
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
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 flex-1 h-10 text-xs border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-lg"
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className={cn(
              "bg-green-600 hover:bg-green-700 text-white flex-1 h-10 text-xs border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-lg",
              "transition-transform duration-200 hover:scale-105"
            )}
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