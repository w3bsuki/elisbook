"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, TrendingUp, Eye, ArrowRight, Calendar, Package, User, BookOpen, Download, FileText, Laptop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types
interface Book {
  id: string;
  title: string;
  description: string;
  category?: string;
  price?: number;
  featured?: boolean;
  image?: string;
  coverImage?: string;
  digital?: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: 'individual' | 'package';
  coverImage: string;
  featured?: boolean;
  includes?: string[];
  relatedBookId?: string;
}

export default function Bestsellers() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'digital' | 'services'>('books');
  const { language } = useLanguage();
  
  // Filter bestsellers - for this example, we'll use the featured books
  // Limit to only 3 books
  const bestsellers = shopBooks
    .filter(book => book.featured)
    .slice(0, 3);
  
  // Filter digital books
  const digitalBooks = shopBooks.filter(book => book.digital).slice(0, 3);
  
  // Filter featured services
  const featuredServices = services.filter(service => service.featured).slice(0, 3);
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  // Helper function to safely format category
  const formatCategory = (category?: string): string => {
    if (!category) return '';
    
    if (language === 'en') {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      switch (category) {
        case 'health': return 'Здраве';
        case 'poetry': return 'Поезия';
        case 'selfHelp': return 'Самопомощ';
        default: return category;
      }
    }
  };
  
  // Helper function to get the display title for each book
  const getDisplayTitle = (book: Book): string => {
    // Map book IDs to their display titles
    switch (book.id) {
      case '1': return 'Осъзнато Хранене';
      case '2': 
      case '3': return 'Вдъхновения';
      case '6': return 'С душа и сърце';
      case '5': return 'Дневник на успеха';
      default: return book.title.split(' - ')[0];
    }
  };
  
  return (
    <section id="books" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background gradient elements similar to hero */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-yellow-200/20 dark:bg-yellow-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] bg-blue-200/10 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Star className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Reader Favorites' : 'Читателски Фаворити'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Bestselling' : 'Бестселъри'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>
            {language === 'en' ? ' Books & Services' : ''}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our most popular books and services that have touched the hearts and minds of readers around the world.'
              : 'Открийте нашите най-популярни книги и услуги, които докоснаха сърцата и умовете на читателите по целия свят.'}
          </p>
        </div>

        {/* Tabs for switching between books and services */}
        <Tabs defaultValue="books" className="w-full" onValueChange={(value) => setActiveTab(value as 'books' | 'digital' | 'services')}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-1.5 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
              <TabsTrigger 
                value="books" 
                className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Books' : 'Книги'}
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <Download className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Digital' : 'Дигитални'}
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Services' : 'Услуги'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Books Content - Completely Redesigned Cards */}
          <TabsContent value="books" className="relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bestsellers.map((book) => (
                  <div 
                    key={book.id} 
                    className="flex flex-col h-full min-h-[600px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)]"
                  >
                    {/* Bestseller badge - improved styling */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
                        <TrendingUp className="h-3 w-3" />
                        {language === 'en' ? 'Bestseller' : 'Бестселър'}
                      </div>
                    </div>
                    
                    {/* Digital badge - if applicable */}
                    {book.digital && (
                      <div className="absolute top-14 right-4 z-30">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
                          <Download className="h-3 w-3" />
                          {language === 'en' ? 'Digital' : 'Дигитална'}
                        </div>
                      </div>
                    )}
                    
                    {/* Category badge - top left */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-full shadow-lg font-medium text-xs">
                        {formatCategory(book.category)}
                      </div>
                    </div>
                    
                    {/* Book cover with hover effect - improved container */}
                    <div className="relative p-8 pt-16 pb-4 h-[350px] flex items-center justify-center">
                      <div 
                        onClick={() => handleBookClick(book)} 
                        className="cursor-pointer transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:rotate-1 w-[180px] mx-auto"
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden p-2">
                          <div className="rounded-md overflow-hidden" style={{ aspectRatio: '3/5' }}>
                            <FlipCard
                              image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                              title={book.title}
                              subtitle={formatCategory(book.category)}
                              description={book.description}
                              category={book.category || 'default'}
                              className="w-full h-full shadow-[0px_10px_20px_rgba(0,0,0,0.2)]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick action button - redesigned */}
                      <div className="absolute top-16 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-10 w-10 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm"
                          onClick={() => handleBookClick(book)}
                          title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                        >
                          <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Book details - redesigned with elegant styling */}
                    <div className="flex flex-col flex-grow p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-b-xl">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{getDisplayTitle(book)}</h3>
                        <span className="font-bold text-lg text-green-600 dark:text-green-400 ml-2">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                        {book.description}
                      </p>
                      
                      {/* Action buttons - refined styling */}
                      <div className="flex gap-3 mt-auto">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md"
                          onClick={() => handleBookClick(book)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          {language === 'en' ? 'Preview' : 'Преглед'}
                        </Button>
                        
                        <Button 
                          size="sm"
                          className={cn(
                            "bg-green-600 hover:bg-green-700 text-white flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
                          )}
                          asChild
                        >
                          <Link href={`/shop/${book.id}`}>
                            {book.digital ? (
                              <>
                                <Download className="h-3.5 w-3.5 mr-1.5" />
                                {language === 'en' ? 'Download' : 'Изтегли'}
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                                {language === 'en' ? 'Buy' : 'Купи'}
                              </>
                            )}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Digital Books Content - Matching redesigned style */}
          <TabsContent value="digital" className="relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {digitalBooks.map((book) => (
                  <div 
                    key={book.id} 
                    className="flex flex-col h-full min-h-[600px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(59,130,246,0.15),_0px_8px_24px_rgba(59,130,246,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)]"
                  >
                    {/* Digital badge - top right */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
                        <Download className="h-3 w-3" />
                        {language === 'en' ? 'Digital' : 'Дигитална'}
                      </div>
                    </div>
                    
                    {/* Category badge - top left */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full shadow-lg font-medium text-xs">
                        {formatCategory(book.category)}
                      </div>
                    </div>
                    
                    {/* Book cover with hover effect */}
                    <div className="relative p-8 pt-16 pb-4 h-[350px] flex items-center justify-center">
                      <div 
                        onClick={() => handleBookClick(book)} 
                        className="cursor-pointer transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:rotate-1 w-[180px] mx-auto"
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden p-2">
                          <div className="rounded-md overflow-hidden" style={{ aspectRatio: '3/5' }}>
                            <FlipCard
                              image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                              title={book.title}
                              subtitle={formatCategory(book.category)}
                              description={book.description}
                              category={book.category || 'default'}
                              className="w-full h-full shadow-[0px_10px_20px_rgba(0,0,0,0.2)]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick action button */}
                      <div className="absolute top-16 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-10 w-10 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm"
                          onClick={() => handleBookClick(book)}
                          title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                        >
                          <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Book details - with blue accent */}
                    <div className="flex flex-col flex-grow p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-b-xl">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{getDisplayTitle(book)}</h3>
                        <span className="font-bold text-lg text-blue-600 dark:text-blue-400 ml-2">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
                      </div>
                      
                      <div className="mb-3 flex gap-2">
                        <Badge variant="secondary" className="bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs flex items-center rounded-full px-3 py-1 shadow-sm">
                          <FileText className="h-3 w-3 mr-1.5" />
                          PDF
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs flex items-center rounded-full px-3 py-1 shadow-sm">
                          <Laptop className="h-3 w-3 mr-1.5" />
                          EPUB
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                        {book.description}
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/30 flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md"
                          onClick={() => handleBookClick(book)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          {language === 'en' ? 'Preview' : 'Преглед'}
                        </Button>
                        
                        <Button 
                          size="sm"
                          className={cn(
                            "bg-blue-600 hover:bg-blue-700 text-white flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
                          )}
                          asChild
                        >
                          <Link href={`/shop/${book.id}`}>
                            <Download className="h-3.5 w-3.5 mr-1.5" />
                            {language === 'en' ? 'Download' : 'Изтегли'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Services Content - matching the new design */}
          <TabsContent value="services" className="relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="flex flex-col h-full min-h-[600px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)]"
                  >
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
                        <Star className="h-3 w-3" />
                        {language === 'en' ? 'Featured' : 'Избрано'}
                      </div>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-full shadow-lg font-medium text-xs">
                        {service.category === 'individual' 
                          ? (language === 'en' ? 'Individual' : 'Индивидуална') 
                          : (language === 'en' ? 'Package' : 'Пакет')}
                      </div>
                    </div>
                    
                    {/* Service image - matching design pattern */}
                    <div className="relative p-8 pt-16 pb-4 h-[350px] flex items-center justify-center">
                      <div className="transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:rotate-1 w-[180px] mx-auto">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden p-2">
                          <div className="rounded-md overflow-hidden" style={{ aspectRatio: '3/5' }}>
                            <div className="w-full h-full overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center rounded-md shadow-[0px_10px_20px_rgba(0,0,0,0.2)]">
                                {service.category === 'individual' 
                                  ? <User className="h-24 w-24 text-white" /> 
                                  : <Package className="h-24 w-24 text-white" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick action button */}
                      <div className="absolute top-16 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <Button 
                          size="icon" 
                          variant="secondary"
                          asChild 
                          className="h-10 w-10 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm"
                          title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                        >
                          <Link href={`/services/${service.id}`}>
                            <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Service details */}
                    <div className="flex flex-col flex-grow p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-b-xl">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{service.title}</h3>
                        <span className="font-bold text-lg text-green-600 dark:text-green-400 ml-2">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <Badge variant="secondary" className="bg-green-50/80 dark:bg-green-900/30 text-green-600 dark:text-green-300 hover:bg-green-100 text-xs flex items-center rounded-full px-3 py-1 shadow-sm">
                          <Clock className="h-3 w-3 mr-1.5" />
                          {service.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                        {service.description}
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md"
                          asChild
                        >
                          <Link href={`/services/${service.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            {language === 'en' ? 'Details' : 'Детайли'}
                          </Link>
                        </Button>
                        
                        <Button 
                          size="sm"
                          className={cn(
                            "bg-green-600 hover:bg-green-700 text-white flex-1 h-10 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
                          )}
                          asChild
                        >
                          <Link href={`/services/${service.id}`}>
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {language === 'en' ? 'Book Now' : 'Запази'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 group border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-6 py-5 h-auto rounded-md"
            asChild
          >
            <Link href={activeTab === 'books' ? "/bestsellers" : activeTab === 'digital' ? "/digital" : "/services"} className="flex items-center">
              {language === 'en' 
                ? `Explore All ${activeTab === 'books' ? 'Bestsellers' : activeTab === 'digital' ? 'Digital Books' : 'Services'}`
                : `Разгледайте всички ${activeTab === 'books' ? 'бестселъри' : activeTab === 'digital' ? 'дигитални книги' : 'услуги'}`}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      {selectedBook && (
        <BookPreviewDialog 
          book={{
            id: selectedBook.id,
            title: selectedBook.title,
            description: selectedBook.description,
            category: selectedBook.category,
            price: selectedBook.price,
            image: selectedBook.coverImage || "/images/books/vdahnovenia-kniga-1.png"
          }}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </section>
  );
} 