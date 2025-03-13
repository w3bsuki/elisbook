'use client';

import React, { useState, useEffect } from 'react';
import { ShopBanner } from '@/components/ui/shop-banner';
import { ShopFilters } from '@/components/ui/shop-filters';
import { CategorySidebar } from '@/components/ui/category-sidebar';
import { ProductCard } from '@/components/ui/product-card';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { shopBooks, filterBooksByCategory, sortBooks, searchBooks, applyFilters } from '@/lib/shop-data';
import { Book } from '@/types';

export default function ShopPage() {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(shopBooks);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({
    featured: false,
    newReleases: false,
    bestsellers: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Apply all filters and sorting
  useEffect(() => {
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
    
    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, activeSort, activeFilters, searchTerm]);

  // Paginate the results
  useEffect(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Banner */}
        <ShopBanner />
        
        {/* Main Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <CategorySidebar 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
          
          {/* Products */}
          <div className="w-full lg:w-3/4">
            {/* Filters */}
            <ShopFilters 
              onSearch={handleSearch}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
              activeSort={activeSort}
              activeFilters={activeFilters}
            />
            
            {/* Results info */}
            <div className="mt-4 mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {displayedBooks.length} of {filteredBooks.length} books
              </p>
              {searchTerm && (
                <p className="text-sm">
                  Search results for: <span className="font-medium">{searchTerm}</span>
                </p>
              )}
            </div>
            
            {/* Product Grid */}
            {displayedBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedBooks.map((book) => (
                  <ProductCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium">No books found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredBooks.length > booksPerPage && (
              <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 