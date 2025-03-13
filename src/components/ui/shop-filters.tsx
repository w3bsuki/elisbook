import React from 'react';
import { Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface ShopFiltersProps {
  onSearch: (term: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string, value: boolean) => void;
  activeSort: string;
  activeFilters: Record<string, boolean>;
}

export function ShopFilters({
  onSearch,
  onSortChange,
  onFilterChange,
  activeSort,
  activeFilters,
}: ShopFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Input
            type="search"
            placeholder="Search books..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={activeFilters.featured}
              onCheckedChange={(checked) => onFilterChange('featured', checked)}
            >
              Featured
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.newReleases}
              onCheckedChange={(checked) => onFilterChange('newReleases', checked)}
            >
              New Releases
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.bestsellers}
              onCheckedChange={(checked) => onFilterChange('bestsellers', checked)}
            >
              Bestsellers
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <span>Sort</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={activeSort === 'newest'}
              onCheckedChange={() => onSortChange('newest')}
            >
              Newest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeSort === 'oldest'}
              onCheckedChange={() => onSortChange('oldest')}
            >
              Oldest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-low'}
              onCheckedChange={() => onSortChange('price-low')}
            >
              Price: Low to High
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-high'}
              onCheckedChange={() => onSortChange('price-high')}
            >
              Price: High to Low
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 