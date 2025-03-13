import { Book } from '@/types';

// Extended book data for the shop page
export const shopBooks: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    description: 'A thrilling mystery novel that follows detective Sarah James as she unravels a decades-old cold case in a small coastal town.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop',
    price: 19.99,
    publishDate: '2023-05-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Beyond the Horizon',
    description: 'An epic adventure story about exploration, discovery, and the human spirit\'s endless quest for knowledge.',
    coverImage: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop',
    price: 21.99,
    publishDate: '2022-11-08',
    featured: true,
  },
  {
    id: '3',
    title: 'Whispers in the Wind',
    description: 'A poetic journey through the seasons of life, examining themes of love, loss, and renewal.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop',
    price: 15.99,
    publishDate: '2021-07-22',
    featured: true,
  },
  {
    id: '4',
    title: 'The Forgotten Path',
    description: 'A historical fiction novel set in 19th century Europe, following a young woman\'s journey to reclaim her family\'s legacy.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop',
    price: 18.99,
    publishDate: '2020-03-10',
    featured: false,
  },
  {
    id: '5',
    title: 'Eternal Shadows',
    description: 'A fantasy novel about a world where shadows come to life and hold the secrets to ancient magic.',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1776&auto=format&fit=crop',
    price: 22.99,
    publishDate: '2019-09-30',
    featured: false,
  },
  {
    id: '6',
    title: 'The Art of Mindfulness',
    description: 'A practical guide to incorporating mindfulness practices into your daily life for improved well-being and mental clarity.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop',
    price: 16.99,
    publishDate: '2023-02-14',
    featured: false,
  },
  {
    id: '7',
    title: 'Midnight Gardens',
    description: 'A supernatural thriller about a botanist who discovers plants that only bloom at midnight and their mysterious effects.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop',
    price: 20.99,
    publishDate: '2022-10-31',
    featured: false,
  },
  {
    id: '8',
    title: 'The Last Voyage',
    description: 'An adventure novel chronicling the final journey of a legendary explorer and the secrets uncovered along the way.',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1829&auto=format&fit=crop',
    price: 23.99,
    publishDate: '2021-04-18',
    featured: false,
  },
  {
    id: '9',
    title: 'Echoes of Eternity',
    description: 'A philosophical exploration of time, memory, and the human experience through interconnected short stories.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1887&auto=format&fit=crop',
    price: 17.99,
    publishDate: '2020-08-05',
    featured: false,
  },
  {
    id: '10',
    title: 'The Quantum Paradox',
    description: 'A science fiction novel exploring the implications of quantum physics on human consciousness and reality.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop',
    price: 24.99,
    publishDate: '2023-01-20',
    featured: false,
  },
  {
    id: '11',
    title: 'Culinary Journeys',
    description: 'A cookbook and travelogue combining recipes and stories from cultures around the world.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop',
    price: 29.99,
    publishDate: '2022-07-12',
    featured: false,
  },
  {
    id: '12',
    title: 'The Architect\'s Dream',
    description: 'A novel about an ambitious architect whose revolutionary designs begin to blur the line between imagination and reality.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop',
    price: 19.99,
    publishDate: '2021-11-30',
    featured: false,
  },
];

// Helper function to filter books by category
export const filterBooksByCategory = (books: Book[], category: string): Book[] => {
  if (category === 'all') return books;
  
  // This is a simplified example. In a real app, you would have a category field in your Book type
  // For now, we'll just use some logic based on the book titles and descriptions
  switch (category) {
    case 'fiction':
      return books.filter(book => 
        book.title.includes('Echo') || 
        book.title.includes('Shadow') || 
        book.title.includes('Whisper') ||
        book.title.includes('Voyage') ||
        book.title.includes('Midnight') ||
        book.description.includes('novel') ||
        book.description.includes('adventure') ||
        book.description.includes('thriller')
      );
    case 'non-fiction':
      return books.filter(book => 
        book.title.includes('Art') || 
        book.title.includes('Culinary') ||
        book.description.includes('guide') ||
        book.description.includes('practical') ||
        book.description.includes('cookbook')
      );
    case 'poetry':
      return books.filter(book => 
        book.title.includes('Whispers') || 
        book.description.includes('poetic') ||
        book.description.includes('poems')
      );
    case 'biography':
      return books.filter(book => 
        book.description.includes('journey') && 
        book.description.includes('life')
      );
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
    book.description.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

// Helper function to filter books by custom filters
export const applyFilters = (books: Book[], filters: Record<string, boolean>): Book[] => {
  if (!filters || Object.keys(filters).length === 0) return books;
  
  return books.filter(book => {
    // If no filters are active, return all books
    if (Object.values(filters).every(value => !value)) return true;
    
    // Apply active filters
    if (filters.featured && book.featured) return true;
    if (filters.newReleases && new Date(book.publishDate) > new Date('2022-01-01')) return true;
    if (filters.bestsellers && book.price > 20) return true; // Just an example condition
    
    // If filters are active but this book doesn't match any, exclude it
    return false;
  });
}; 