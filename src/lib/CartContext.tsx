"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Book, Service } from '@/types';
import { useToast } from "@/components/ui/use-toast";

// Type for cart items that can be either books or services
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  coverImage?: string;
  image?: string;
  type: 'book' | 'service'; // Indicates whether this is a book or service
  itemData: Book | Service; // The original item data
  updateQuantity?: (quantity: number) => void;
  removeFromCart?: () => void;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: Book | Service, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const initialLoadRef = useRef(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Only run this effect once
    if (initialLoadRef.current) return;
    
    setMounted(true);
    try {
      const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate the parsed data is an array
        if (Array.isArray(parsedCart)) {
          // Map to ensure all items have required properties
          const validatedCart = parsedCart.map(item => ({
            ...item,
            id: item.id || `temp-${Date.now()}`,
            title: item.title || 'Unknown Item',
            price: typeof item.price === 'number' ? item.price : 0,
            quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
            type: ['book', 'service'].includes(item.type) ? item.type : 'book',
            itemData: item.itemData || {}
          }));
          setCartItems(validatedCart);
        }
      }
    } catch (error) {
      console.error('Failed to parse cart data from localStorage:', error);
      // Reset cart on error
      setCartItems([]);
    }
    
    // Mark as initialized
    initialLoadRef.current = true;
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cartItems, mounted]);
  
  // Determine if item is a book or service
  const getItemType = (item: Book | Service): 'book' | 'service' => {
    // Services have a 'duration' property that books don't have
    return 'duration' in item ? 'service' : 'book';
  };
  
  // Add an item to the cart
  const addToCart = (item: Book | Service, quantity: number = 1) => {
    if (!item || !item.id) {
      console.error('Invalid item provided to addToCart');
      return;
    }

    const safeQuantity = Math.max(1, quantity); // Ensure quantity is at least 1

    setCartItems(prev => {
      // Check if the item is already in the cart
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        return prev.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: cartItem.quantity + safeQuantity }
            : cartItem
        );
      } else {
        // Item doesn't exist, add it
        const itemType = getItemType(item);
        const newItem: CartItem = {
          id: item.id,
          title: item.title || 'Unknown Item',
          price: typeof item.price === 'number' ? item.price : 0,
          quantity: safeQuantity,
          coverImage: item.coverImage,
          image: item.image,
          type: itemType,
          itemData: item
        };
        return [...prev, newItem];
      }
    });

    // Show toast notification
    toast({
      title: 'Added to cart',
      description: `${item.title || 'Item'} has been added to your cart.`,
    });

    // Open cart drawer after adding item
    setIsCartOpen(true);
  };
  
  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    if (!itemId) return;
    
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Update the quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (!itemId) return;
    
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate total number of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + (price * quantity);
  }, 0);
  
  // Add methods to each cart item
  const enhancedCartItems = cartItems.map(item => ({
    ...item,
    updateQuantity: (newQuantity: number) => updateQuantity(item.id, newQuantity),
    removeFromCart: () => removeFromCart(item.id)
  }));
  
  return (
    <CartContext.Provider value={{
      cartItems: enhancedCartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  try {
    const context = useContext(CartContext);
    return context;
  } catch (error) {
    console.error('Error in useCart:', error);
    // Return a safe fallback with empty/no-op values
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      subtotal: 0,
      isCartOpen: false,
      setIsCartOpen: () => {}
    };
  }
}; 