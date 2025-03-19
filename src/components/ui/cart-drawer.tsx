"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PaymentButton } from "@/components/ui/payment-button";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { language } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      
      {/* Cart Drawer */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              {language === 'en' ? 'Shopping Cart' : 'Количка'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {cartItems.length} {language === 'en' ? 'items' : 'продукта'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.price.toFixed(2)} {language === 'en' ? 'BGN' : 'лв'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {language === 'en'
                    ? "Your cart is empty"
                    : "Количката ви е празна"}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {language === 'en' ? 'Total' : 'Обща сума'}
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {totalPrice.toFixed(2)} {language === 'en' ? 'BGN' : 'лв'}
                </span>
              </div>
              
              {paymentError && (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-2">
                  {paymentError}
                </div>
              )}
              
              <PaymentButton 
                amount={totalPrice} 
                currency="bgn"
                onSuccess={() => {
                  setIsCartOpen(false);
                  router.push("/payment-success");
                }}
                onError={(error) => {
                  console.error("Payment error:", error);
                  setPaymentError(language === 'en' ? 'Payment failed. Please try again.' : 'Плащането е неуспешно. Моля, опитайте отново.');
                }}
                className="w-full"
              >
                {language === 'en' ? 'Checkout' : 'Плащане'}
              </PaymentButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 