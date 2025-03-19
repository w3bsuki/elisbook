'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Filter, X, ChevronDown, BookOpen, Star, Eye, Heart, Sparkles, RefreshCcw } from "lucide-react";
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
import { PaginationControls } from '@/components/ui/pagination-controls';
import { shopBooks, filterBooksByCategory, sortBooks, searchBooks, applyFilters } from '@/lib/shop-data';
import { Book } from '@/types';
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

export default function ShopPage() {
  const { language, translations } = useLanguage();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
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

  // Memoized filter function to reduce re-calculations
  const filterAndSortBooks = useMemo(() => {
    let result = [...shopBooks];
    
    // Apply category filter
    result = filterBooksByCategory(result, activeCategory);
    
    // Apply search
    if (searchTerm) {
      result = searchBooks(result, searchTerm);
    }
    
    // Apply custom filters
    result = applyFilters(result, activeFilters);
    
    // Apply sorting
    result = sortBooks(result, activeSort);
    
    return result;
  }, [activeCategory, activeSort, activeFilters, searchTerm]);

  // Apply all filters and sorting
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      const filteredResults = filterAndSortBooks();
      setFilteredBooks(filteredResults);
      setCurrentPage(1); // Reset to first page when filters change
      setIsLoading(false);
      setInitialLoad(false);
    }, initialLoad ? 300 : 600); // Less delay for initial load
    
    return () => clearTimeout(timer);
  }, [activeCategory, activeSort, activeFilters, searchTerm, filterAndSortBooks, initialLoad]);

  // Paginate the results
  useEffect(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
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
    setActiveCategory('all');
    setActiveSort('newest');
    setActiveFilters({
      featured: false,
      newReleases: false,
      bestsellers: false,
      digital: false,
    });
    setSearchTerm('');
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
  // Check if any filters are active
  const hasActiveFilters = 
    activeCategory !== 'all' || 
    activeSort !== 'newest' || 
    Object.values(activeFilters).some(value => value) ||
    searchTerm !== '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Banner */}
        <ShopBanner />
        
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
                    activeCategory={activeCategory} 
                    onCategoryChange={handleCategoryChange} 
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
                activeCategory={activeCategory} 
                onCategoryChange={handleCategoryChange} 
              />
            </div>
          </div>
          
          {/* Products */}
          <div 
            className="w-full lg:w-3/4"
          >
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
                
                {activeCategory !== 'all' && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => setActiveCategory('all')}
                  >
                    {activeCategory === 'health' ? ensureString(getTranslation("categories.health")) : 
                     activeCategory === 'poetry' ? ensureString(getTranslation("categories.poetry")) : 
                     activeCategory === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) : 
                     activeCategory}
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
            
            {/* Category Tabs */}
            <Tabs value={activeCategory} className="w-full mt-6" onValueChange={handleCategoryChange}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-6 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
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
            
            {/* Results info */}
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
            
            {/* Products grid */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">
                {isLoading ? (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800/20 h-[500px] animate-pulse"></div>
                    ))}
                  </>
                ) : displayedBooks.length > 0 ? (
                  displayedBooks.map((book) => (
                    <ProductCard
                      key={book.id}
                      book={book}
                      className="h-full transform transition-all duration-500 ease-out hover:-translate-y-1"
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
              
              {/* Pagination */}
              {!isLoading && filteredBooks.length > booksPerPage && (
                <div className="mt-8 flex justify-center">
                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
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
      `}</style>
    </div>
  );
} 