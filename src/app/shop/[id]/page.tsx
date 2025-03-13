import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shopBooks } from '@/lib/shop-data';
import BookDetailClient from './book-detail-client';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Find the book with the matching ID
  const book = shopBooks.find((book) => book.id === params.id);

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

export default function BookDetailPage({ params }: Props) {
  // Find the book with the matching ID
  const book = shopBooks.find((book) => book.id === params.id);

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