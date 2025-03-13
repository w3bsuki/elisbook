import { Author, Book, NavItem } from '@/types';

// Mock navigation items
export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Books',
    href: '/shop',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Mock author data
export const authorData: Author = {
  name: 'Jane Doe',
  bio: 'Jane Doe is a bestselling author known for her captivating storytelling and unique perspective on contemporary issues. With over 10 years of writing experience, she has published numerous acclaimed novels that have touched readers around the world.',
  image: '/author.jpg',
  socialLinks: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
};

// Mock book data
export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    description: 'A thrilling mystery novel that follows detective Sarah James as she unravels a decades-old cold case in a small coastal town.',
    coverImage: '/book1.jpg',
    price: 19.99,
    publishDate: '2023-05-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Beyond the Horizon',
    description: 'An epic adventure story about exploration, discovery, and the human spirit\'s endless quest for knowledge.',
    coverImage: '/book2.jpg',
    price: 21.99,
    publishDate: '2022-11-08',
    featured: true,
  },
  {
    id: '3',
    title: 'Whispers in the Wind',
    description: 'A poetic journey through the seasons of life, examining themes of love, loss, and renewal.',
    coverImage: '/book3.jpg',
    price: 15.99,
    publishDate: '2021-07-22',
    featured: true,
  },
  {
    id: '4',
    title: 'The Forgotten Path',
    description: 'A historical fiction novel set in 19th century Europe, following a young woman\'s journey to reclaim her family\'s legacy.',
    coverImage: '/book4.jpg',
    price: 18.99,
    publishDate: '2020-03-10',
    featured: false,
  },
  {
    id: '5',
    title: 'Eternal Shadows',
    description: 'A fantasy novel about a world where shadows come to life and hold the secrets to ancient magic.',
    coverImage: '/book5.jpg',
    price: 22.99,
    publishDate: '2019-09-30',
    featured: false,
  },
]; 