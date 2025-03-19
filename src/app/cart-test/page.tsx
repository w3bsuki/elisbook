'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { shopBooks } from '@/lib/shop-data';
import { ShoppingCart } from 'lucide-react';

export default function CartTestPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedBook, setSelectedBook] = useState(shopBooks[0]);
  
  const handleAddToCart = (bookId: string) => {
    const book = shopBooks.find(b => b.id === bookId);
    if (book) {
      addToCart(book, 1);
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Cart Test Page</h1>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
        <p className="text-yellow-700">
          Note: The cart drawer is rendered in the main layout. Click the cart button to view the cart.
        </p>
      </div>
      
      <div className="mb-8">
        <Button onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Open Cart
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shopBooks.slice(0, 6).map(book => (
          <Card key={book.id} className="flex flex-col">
            <CardContent className="p-6 flex-grow">
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
              <p className="font-bold text-lg text-green-600">{book.price.toFixed(2)} лв.</p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button 
                className="w-full"
                onClick={() => handleAddToCart(book.id)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 