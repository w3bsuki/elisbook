// Book type
export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  publishDate: string;
  featured?: boolean;
  category?: string;
  isbn?: string;
  pages?: number;
  publisher?: string;
  digital?: boolean;
}

// Service type
export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: 'individual' | 'package';
  coverImage: string;
  featured?: boolean;
  includes?: string[];
  relatedBookId?: string; // Reference to the book this service is related to
}

// Author type
export interface Author {
  name: string;
  bio: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

// Navigation item type
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
} 