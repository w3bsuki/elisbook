import { notFound } from 'next/navigation';
import { shopBooks } from '@/lib/shop-data';
import BookDetailClient from './book-detail-client';

// Define the correct PageProps type to match Next.js 15 requirements
type PageProps = {
  params: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
};

// Update BookPageProps to match the PageProps constraint
interface BookPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[]>;
}

export async function generateMetadata({ params }: BookPageProps) {
  // Find the book with the matching ID
  const bookId = params.id;
  const book = shopBooks.find((book) => book.id === bookId);

  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: book.title,
    description: book.description,
  };
}

export default function BookDetailPage({ params }: BookPageProps) {
  // Find the book with the matching ID
  const bookId = params.id;
  const book = shopBooks.find((book) => book.id === bookId);

  // If book not found, return 404
  if (!book) {
    notFound();
  }

  // Get related books (excluding the current book)
  const relatedBooks = shopBooks
    .filter((b) => b.id !== book.id)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 3); // Get first 3 items

  return <BookDetailClient book={book} relatedBooks={relatedBooks} />;
} 