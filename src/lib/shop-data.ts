import { Book } from '@/types';

// Extended book data for the shop page with real books by Elis
export const shopBooks: Book[] = [
  {
    id: '1',
    title: 'Осъзнато хранене - яж и отслабвай с удоволствие',
    description: 'Книга, която помага на читателите да развият собствени хранителни навици с насоки и психологически практики за справяне с проблемите с теглото.',
    coverImage: '/images/books/osaznato-hranene.jpg',
    price: 30.00,
    publishDate: '2023-01-15',
    featured: true,
    category: 'health',
    isbn: '9786199211205',
    pages: 86,
    publisher: 'Елис',
    digital: true,
  },
  {
    id: '2',
    title: 'Вдъхновения: Когато не знаеш как да продължиш напред - книга 2',
    description: 'Книга, която предлага насоки и вдъхновение за читателите, които са несигурни за следващите си стъпки в живота, насърчавайки ги да отворят книгата на произволна страница за съвет.',
    coverImage: '/images/books/vdahnovenia-kniga-2.png',
    price: 26.00,
    publishDate: '2022-09-30',
    featured: true,
    category: 'poetry',
    isbn: '9786199211274',
    pages: 84,
    publisher: 'Елис',
    digital: true,
  },
  {
    id: '3',
    title: 'Вдъхновения. Когато не знаеш как да продължиш напред - книга 1',
    description: 'Първата книга от поредицата "Вдъхновения", предлагаща мъдрост и насоки за преодоляване на трудни моменти в живота.',
    coverImage: '/images/books/vdahnovenia-kniga-1.png',
    price: 26.00,
    publishDate: '2021-11-15',
    featured: true,
    category: 'poetry',
    isbn: '9786199211267',
    pages: 82,
    publisher: 'Елис',
    digital: true,
  },
  {
    id: '4',
    title: 'Дневник на щастието. Слънцето в мен',
    description: 'Дневник, който помага на читателите да открият и култивират щастието в ежедневието си, с практически упражнения и вдъхновяващи мисли.',
    coverImage: '/images/books/dnevnik-na-shtastieto.jpg',
    price: 30.00,
    publishDate: '2022-05-20',
    featured: false,
    category: 'selfHelp',
    isbn: '9786199211281',
    pages: 90,
    publisher: 'Елис',
  },
  {
    id: '5',
    title: 'Дневник на Успеха: Аз мога',
    description: 'Практически дневник, който помага на читателите да поставят цели, да проследяват напредъка си и да развиват манталитет на успех.',
    coverImage: '/images/books/dnevnik-na-uspeha.jpg',
    price: 28.00,
    publishDate: '2022-07-10',
    featured: false,
    category: 'selfHelp',
    isbn: '9786199211298',
    pages: 88,
    publisher: 'Елис',
  },
  {
    id: '6',
    title: 'С душа и сърце',
    description: 'Поетична колекция, която изследва дълбоките емоции и връзки, които формират човешкия опит, написана с искреност и емоционална дълбочина.',
    coverImage: '/images/books/s-dusha-i-sarce.jpg',
    price: 22.00,
    publishDate: '2023-03-25',
    featured: true,
    category: 'poetry',
    isbn: '9786199211304',
    pages: 76,
    publisher: 'Елис',
  },
];

// Helper function to filter books by category
export const filterBooksByCategory = (books: Book[], category: string): Book[] => {
  if (category === 'all') return books;
  
  // Using the category field in our Book type
  switch (category) {
    case 'health':
      return books.filter(book => book.category === 'health');
    case 'poetry':
      return books.filter(book => book.category === 'poetry');
    case 'selfHelp':
      return books.filter(book => book.category === 'selfHelp');
    default:
      return books;
  }
};

// Helper function to sort books
export const sortBooks = (books: Book[], sortBy: string): Book[] => {
  const sortedBooks = [...books];
  
  switch (sortBy) {
    case 'newest':
      return sortedBooks.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    case 'oldest':
      return sortedBooks.sort((a, b) => 
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    case 'price-low':
      return sortedBooks.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedBooks.sort((a, b) => b.price - a.price);
    default:
      return sortedBooks;
  }
};

// Helper function to search books
export const searchBooks = (books: Book[], searchTerm: string): Book[] => {
  if (!searchTerm) return books;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    book.description.toLowerCase().includes(lowerCaseSearchTerm) ||
    (book.isbn && book.isbn.includes(lowerCaseSearchTerm))
  );
};

// Helper function to filter books by custom filters
export const applyFilters = (books: Book[], filters: Record<string, boolean>): Book[] => {
  if (!filters || Object.keys(filters).length === 0) return books;
  
  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value);
  if (!hasActiveFilters) return books;
  
  return books.filter(book => {
    // Apply active filters
    if (filters.featured && book.featured) return true;
    if (filters.newReleases && new Date(book.publishDate) > new Date('2022-06-01')) return true;
    if (filters.bestsellers && book.price >= 28) return true; // Books priced 28 or higher are considered bestsellers
    if (filters.digital && book.digital) return true; // Filter by digital books
    
    // If filters are active but this book doesn't match any, exclude it
    return false;
  });
}; 