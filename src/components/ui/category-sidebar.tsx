import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, BookText, Bookmark, BookmarkCheck, BookMarked } from 'lucide-react';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const categories = [
  { id: 'all', name: 'All Books', icon: BookOpen },
  { id: 'fiction', name: 'Fiction', icon: BookText },
  { id: 'non-fiction', name: 'Non-Fiction', icon: BookMarked },
  { id: 'poetry', name: 'Poetry', icon: Bookmark },
  { id: 'biography', name: 'Biography', icon: BookmarkCheck },
];

export function CategorySidebar({
  activeCategory,
  onCategoryChange,
  className,
}: CategorySidebarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm mb-3">Categories</h3>
        <Separator className="my-4" />
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 text-sm font-normal",
                activeCategory === category.id && "bg-secondary font-medium"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <Separator className="my-4" />
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            Under $15
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            $15 - $25
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            $25 - $35
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            Over $35
          </Button>
        </div>
      </div>
      
      <div className="mt-8 rounded-lg bg-secondary p-4">
        <h3 className="font-semibold">Special Offer</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get 20% off when you buy 3 or more books from our featured collection.
        </p>
        <Button className="mt-4 w-full" size="sm">
          View Offer
        </Button>
      </div>
    </div>
  );
} 