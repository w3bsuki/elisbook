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