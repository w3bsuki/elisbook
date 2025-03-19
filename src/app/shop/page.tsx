'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Filter, X, ChevronDown, BookOpen, Star, Eye, Heart, Sparkles, RefreshCcw, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ShopBanner } from '@/components/ui/shop-banner';
import { ShopFilters } from '@/components/ui/shop-filters';
import { CategorySidebar } from '@/components/ui/category-sidebar';
import { ProductCard } from '@/components/ui/product-card';
import { ServiceCard } from '@/components/ui/service-card';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { shopBooks, filterBooksByCategory, sortBooks, searchBooks, applyFilters } from '@/lib/shop-data';
import { services, filterServicesByCategory, sortServices, searchServices } from '@/data/services';
import { Book, Service } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { useLanguage } from "@/lib/LanguageContext";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="space-y-8 animate-in fade-in duration-300">
    {/* Skeleton for top filter section */}
    <div className="w-full flex flex-wrap gap-4 mb-8">
      <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
    </div>
    
    {/* Skeleton for content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse"></div>
            <div className="mt-6 flex gap-2">
              <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded flex-1 animate-pulse"></div>
              <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded flex-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ShopPage() {
  const { language, translations } = useLanguage();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [activeBookCategory, setActiveBookCategory] = useState('all');
  const [activeServiceCategory, setActiveServiceCategory] = useState('all');
  const [activeContentType, setActiveContentType] = useState<'books' | 'services'>('books');
  const [activeSort, setActiveSort] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({
    featured: false,
    newReleases: false,
    bestsellers: false,
    digital: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeBookmarks, setActiveBookmarks] = useState<string[]>([]);
  const [showBothTypes, setShowBothTypes] = useState(true);
  const booksPerPage = 8;
  
  // Create a local translation function
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Apply all filters and sorting
  useEffect(() => {
    // Only set loading if there's been significant changes
    const shouldShowLoadingUI = initialLoad || (searchTerm !== '');
    if (shouldShowLoadingUI) {
      setIsLoading(true);
    }
    
    try {
      // Get filtered books and services
      let processedBooks = filterBooksByCategory([...shopBooks], activeBookCategory);
      let processedServices = filterServicesByCategory([...services], activeServiceCategory === 'all' ? 'all' : activeServiceCategory);
      
      // Apply search
      if (searchTerm) {
        processedBooks = searchBooks(processedBooks, searchTerm);
        processedServices = searchServices(processedServices, searchTerm);
      }
      
      // Apply custom filters
      processedBooks = applyFilters(processedBooks, activeFilters);
      
      // Apply sorting
      processedBooks = sortBooks(processedBooks, activeSort);
      processedServices = sortServices(processedServices, activeSort === 'newest' ? 'featured' : activeSort);
      
      // Update state
      setFilteredBooks(processedBooks);
      setFilteredServices(processedServices);
      
      // Reset pagination
      setCurrentPage(1);
      
      // Clear loading state with a very small delay to prevent jarring UI shifts
      if (shouldShowLoadingUI) {
        setTimeout(() => {
          setIsLoading(false);
          setInitialLoad(false);
        }, 100);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error filtering content:", error);
      setFilteredBooks(shopBooks);
      setFilteredServices(services);
      setIsLoading(false);
      setInitialLoad(false);
    }
  }, [activeBookCategory, activeServiceCategory, activeSort, activeFilters, searchTerm, initialLoad]);

  // Paginate the results
  useEffect(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
    setDisplayedServices(filteredServices.slice(startIndex, endIndex));
  }, [filteredBooks, filteredServices, currentPage]);

  // Handle book category change
  const handleBookCategoryChange = (category: string) => {
    setActiveBookCategory(category);
    setMobileFiltersOpen(false); // Close mobile filters after selection
  };
  
  // Handle service category change
  const handleServiceCategoryChange = (category: string) => {
    setActiveServiceCategory(category);
    setMobileFiltersOpen(false); // Close mobile filters after selection
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
  };

  // Handle filter change
  const handleFilterChange = (filter: string, value: boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: value,
    }));
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle bookmarks
  const toggleBookmark = (bookId: string) => {
    setActiveBookmarks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId) 
        : [...prev, bookId]
    );
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveBookCategory('all');
    setActiveServiceCategory('all');
    setActiveSort('newest');
    setActiveFilters({
      featured: false,
      newReleases: false,
      bestsellers: false,
      digital: false,
    });
    setSearchTerm('');
  };

  // Handle content type change
  const handleContentTypeChange = (type: 'books' | 'services') => {
    setActiveContentType(type);
    setCurrentPage(1); // Reset to first page
  };

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!showBothTypes) {
      // If showing only books or only services
      return Math.ceil(
        activeContentType === 'books' 
          ? filteredBooks.length / booksPerPage
          : filteredServices.length / booksPerPage
      );
    } else {
      // If showing both, calculate based on the larger of the two
      const combinedItems = Math.max(filteredBooks.length, filteredServices.length);
      return Math.ceil(combinedItems / booksPerPage);
    }
  }, [filteredBooks.length, filteredServices.length, activeContentType, showBothTypes, booksPerPage]);
  
  // Check if any filters are active
  const hasActiveFilters = 
    activeBookCategory !== 'all' || 
    activeServiceCategory !== 'all' ||
    activeSort !== 'newest' || 
    Object.values(activeFilters).some(value => value) ||
    searchTerm !== '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Banner */}
        <ShopBanner />
        
        {/* Content Type Switcher */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex border-2 border-black dark:border-gray-700 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
            <button
              onClick={() => {
                setShowBothTypes(true);
                setActiveContentType('books');
              }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                showBothTypes
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpen className="h-4 w-4 inline-block mr-2" />
              {language === 'en' ? 'All Products' : 'Всички Продукти'}
            </button>
            <button
              onClick={() => {
                setShowBothTypes(false);
                setActiveContentType('books');
              }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                !showBothTypes && activeContentType === 'books'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpen className="h-4 w-4 inline-block mr-2" />
              {language === 'en' ? 'Books Only' : 'Само Книги'}
            </button>
            <button
              onClick={() => {
                setShowBothTypes(false);
                setActiveContentType('services');
              }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                !showBothTypes && activeContentType === 'services'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Clock className="h-4 w-4 inline-block mr-2" />
              {language === 'en' ? 'Services Only' : 'Само Услуги'}
            </button>
          </div>
        </div>
        
        {/* Mobile Filter Button */}
        <div 
          className="lg:hidden mt-6"
        >
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between border-2 border-black">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {ensureString(getTranslation("shop.filtersAndCategories"))}
                </div>
                {hasActiveFilters && (
                  <span className="inline-flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 px-1.5">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[350px] p-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <SheetHeader className="mb-4">
                    <SheetTitle>{ensureString(getTranslation("shop.filtersAndCategories"))}</SheetTitle>
                    <SheetDescription>
                      {ensureString(getTranslation("shop.filterDescription"))}
                    </SheetDescription>
                  </SheetHeader>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mb-4 text-primary flex items-center"
                      onClick={clearAllFilters}
                    >
                      <X className="mr-1 h-3 w-3" />
                      {ensureString(getTranslation("shop.clearAll"))}
                    </Button>
                  )}
                  
                  <Separator className="mb-4" />
                  
                  {/* Mobile Filters */}
                  <div className="mb-6">
                    <ShopFilters 
                      onSearch={handleSearch}
                      onSortChange={handleSortChange}
                      onFilterChange={handleFilterChange}
                      activeSort={activeSort}
                      activeFilters={activeFilters}
                      searchTerm={searchTerm}
                    />
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  {/* Mobile Categories */}
                  <CategorySidebar 
                    activeCategory={activeBookCategory} 
                    onCategoryChange={handleBookCategoryChange} 
                  />
                  
                  <div className="mt-6 flex justify-end">
                    <SheetClose asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        {ensureString(getTranslation("shop.applyFilters"))}
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Main Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only */}
          <div 
            className="hidden lg:block w-full lg:w-1/4"
          >
            <div className="sticky top-20">
              <CategorySidebar 
                activeCategory={activeBookCategory} 
                onCategoryChange={handleBookCategoryChange} 
              />
            </div>
          </div>
          
          {/* Products and Services */}
          <div className="w-full lg:w-3/4">
            {/* Show loading skeleton when loading */}
            {isLoading && initialLoad ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Filters */}
                <div className="hidden lg:block">
                  <ShopFilters 
                    onSearch={handleSearch}
                    onSortChange={handleSortChange}
                    onFilterChange={handleFilterChange}
                    activeSort={activeSort}
                    activeFilters={activeFilters}
                    searchTerm={searchTerm}
                  />
                </div>
            
                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mt-4 py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">
                      {ensureString(getTranslation("shop.activeFilters"))}:
                    </span>
                    
                    {activeBookCategory !== 'all' && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => setActiveBookCategory('all')}
                      >
                        {activeBookCategory === 'health' ? ensureString(getTranslation("categories.health")) : 
                         activeBookCategory === 'poetry' ? ensureString(getTranslation("categories.poetry")) : 
                         activeBookCategory === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) : 
                         activeBookCategory}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    
                    {Object.entries(activeFilters).map(([key, value]) => (
                      value && (
                        <Button 
                          key={key} 
                          variant="secondary" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => handleFilterChange(key, false)}
                        >
                          {key === 'featured' ? ensureString(getTranslation("shop.featured")) : 
                           key === 'newReleases' ? ensureString(getTranslation("shop.newReleases")) : 
                           key === 'bestsellers' ? ensureString(getTranslation("shop.bestsellers")) :
                           key === 'digital' ? ensureString(getTranslation("productDetail.digital")) : 
                           key}
                          <X className="ml-1 h-3 w-3" />
                        </Button>
                      )
                    ))}
                    
                    {searchTerm && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => setSearchTerm('')}
                      >
                        "{searchTerm}"
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs text-primary ml-auto"
                      onClick={clearAllFilters}
                    >
                      {ensureString(getTranslation("shop.clearAll"))}
                    </Button>
                  </div>
                )}
                
                {/* Show Books Section */}
                {(showBothTypes || (!showBothTypes && activeContentType === 'books')) && (
                  <div className="mt-8">
                    {/* Books Header with Decorative Elements */}
                    <div className="relative flex items-center mb-6">
                      <div className="h-0.5 flex-grow bg-gradient-to-r from-green-200 to-green-500"></div>
                      <div className="mx-4 flex items-center space-x-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border-2 border-green-500 dark:border-green-700 shadow-[2px_2px_0px_0px_rgba(34,197,94,0.6)]">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-500" />
                        <h2 className="text-xl font-bold text-green-800 dark:text-green-400">
                          {language === 'en' ? 'Books Collection' : 'Колекция Книги'}
                        </h2>
                      </div>
                      <div className="h-0.5 flex-grow bg-gradient-to-l from-green-200 to-green-500"></div>
                    </div>

                    {/* Category Tabs for Books */}
                    <Tabs defaultValue="all" value={activeBookCategory} className="w-full" onValueChange={handleBookCategoryChange}>
                      <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
                        <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-6 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                          <TabsTrigger 
                            value="all" 
                            className="tab-trigger rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <BookOpen className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'All Books' : 'Всички Книги'}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="poetry" 
                            className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Star className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'Poetry' : 'Поезия'}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="health" 
                            className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Heart className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'Health' : 'Здраве'}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="selfHelp" 
                            className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Sparkles className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'Psychology' : 'Психология'}
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </Tabs>
                    
                    {/* Books Results info */}
                    <div className="mt-4 mb-6 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {isLoading 
                          ? ensureString(getTranslation("shop.loading")) 
                          : `${ensureString(getTranslation("shop.showing"))} ${displayedBooks.length} ${ensureString(getTranslation("shop.of"))} ${filteredBooks.length} ${ensureString(getTranslation("shop.books"))}`
                        }
                      </p>
                      
                      {isLoading && (
                        <Button variant="ghost" size="sm" disabled className="h-8 animate-pulse">
                          <RefreshCcw className="mr-1 h-3 w-3 animate-spin" />
                          {ensureString(getTranslation("shop.loading"))}
                        </Button>
                      )}
                    </div>
                    
                    {/* Books Grid with min-height to prevent layout shifts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-300 min-h-[500px]">
                      {isLoading ? (
                        <>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800/20 h-[500px] animate-pulse"></div>
                          ))}
                        </>
                      ) : displayedBooks.length > 0 ? (
                        displayedBooks.map((book) => (
                          <ProductCard
                            key={book.id}
                            book={book}
                            className="h-full transform transition-all duration-300 ease-out hover:-translate-y-1"
                            isBookmarked={activeBookmarks.includes(book.id)}
                            onBookmarkToggle={() => toggleBookmark(book.id)}
                          />
                        ))
                      ) : (
                        <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 col-span-full">
                          <h3 className="text-lg font-medium">{ensureString(getTranslation("shop.noBooks"))}</h3>
                          <p className="mt-2 text-muted-foreground">
                            {ensureString(getTranslation("shop.tryAdjusting"))}
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={clearAllFilters}
                          >
                            {ensureString(getTranslation("shop.resetFilters"))}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Books Pagination */}
                    {!isLoading && !showBothTypes && filteredBooks.length > booksPerPage && (
                      <div className="mt-8 flex justify-center">
                        <PaginationControls 
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Separator between Books and Services */}
                {showBothTypes && (
                  <div className="my-16 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white dark:bg-gray-900 px-8 py-3 text-sm text-gray-500 dark:text-gray-400 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                        <Clock className="h-4 w-4 inline-block mr-2 text-blue-500" />
                        {language === 'en' ? 'Explore Our Professional Services' : 'Разгледайте Нашите Професионални Услуги'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Show Services Section */}
                {(showBothTypes || (!showBothTypes && activeContentType === 'services')) && (
                  <div className={`${showBothTypes ? 'mt-8' : 'mt-8'}`}>
                    {/* Services Header with Decorative Elements */}
                    <div className="relative flex items-center mb-6">
                      <div className="h-0.5 flex-grow bg-gradient-to-r from-blue-200 to-blue-500"></div>
                      <div className="mx-4 flex items-center space-x-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border-2 border-blue-500 dark:border-blue-700 shadow-[2px_2px_0px_0px_rgba(59,130,246,0.6)]">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">
                          {language === 'en' ? 'Professional Services' : 'Професионални Услуги'}
                        </h2>
                      </div>
                      <div className="h-0.5 flex-grow bg-gradient-to-l from-blue-200 to-blue-500"></div>
                    </div>

                    {/* Category Tabs for Services */}
                    <Tabs defaultValue="all" value={activeServiceCategory} className="w-full" onValueChange={handleServiceCategoryChange}>
                      <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
                        <TabsList className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-6 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                          <TabsTrigger 
                            value="all" 
                            className="tab-trigger rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Clock className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'All Services' : 'Всички Услуги'}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="individual" 
                            className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Clock className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'Individual' : 'Индивидуални'}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="package" 
                            className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
                          >
                            <Package className="h-5 w-5 mr-2" />
                            {language === 'en' ? 'Packages' : 'Пакети'}
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </Tabs>
                    
                    {/* Services Results info */}
                    <div className="mt-4 mb-6 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {isLoading 
                          ? ensureString(getTranslation("shop.loading")) 
                          : `${ensureString(getTranslation("shop.showing"))} ${displayedServices.length} ${ensureString(getTranslation("shop.of"))} ${filteredServices.length} ${language === 'en' ? 'services' : 'услуги'}`
                        }
                      </p>
                      
                      {isLoading && (
                        <Button variant="ghost" size="sm" disabled className="h-8 animate-pulse">
                          <RefreshCcw className="mr-1 h-3 w-3 animate-spin" />
                          {ensureString(getTranslation("shop.loading"))}
                        </Button>
                      )}
                    </div>
                    
                    {/* Services Grid with min-height to prevent layout shifts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-300 min-h-[500px]">
                      {isLoading ? (
                        <>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800/20 h-[500px] animate-pulse"></div>
                          ))}
                        </>
                      ) : displayedServices.length > 0 ? (
                        displayedServices.map((service) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            className="h-full transform transition-all duration-300 ease-out hover:-translate-y-1"
                            isBookmarked={activeBookmarks.includes(service.id)}
                            onBookmarkToggle={() => toggleBookmark(service.id)}
                          />
                        ))
                      ) : (
                        <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 col-span-full">
                          <h3 className="text-lg font-medium">{language === 'en' ? 'No services found' : 'Не са намерени услуги'}</h3>
                          <p className="mt-2 text-muted-foreground">
                            {ensureString(getTranslation("shop.tryAdjusting"))}
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={clearAllFilters}
                          >
                            {ensureString(getTranslation("shop.resetFilters"))}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Services Pagination */}
                    {!isLoading && !showBothTypes && filteredServices.length > booksPerPage && (
                      <div className="mt-8 flex justify-center">
                        <PaginationControls 
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Combined Pagination when showing both */}
                {!isLoading && showBothTypes && (
                  (filteredBooks.length > 0 || filteredServices.length > 0) && 
                  (filteredBooks.length > booksPerPage || filteredServices.length > booksPerPage) && (
                    <div className="mt-12 flex justify-center">
                      <PaginationControls 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Add animation styles for consistency with bestsellers */}
      <style jsx global>{`
        .fade-in-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-transition {
          transition: all 0.4s ease-in-out;
        }
        
        .loading-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        /* Tab transition improvements */
        .tab-trigger {
          position: relative;
          transition: all 0.2s ease;
          will-change: transform, opacity;
        }
        
        .tab-trigger:active {
          transform: scale(0.97);
        }
        
        /* Hide scrollbars but keep functionality */
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Keep consistent heights to prevent layout shifts */
        [data-state="loading"] {
          min-height: 500px;
        }
      `}</style>
    </div>
  );
} 