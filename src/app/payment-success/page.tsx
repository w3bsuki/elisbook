"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";

export default function PaymentSuccessPage() {
  const { language } = useLanguage();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="container max-w-md mx-auto py-20 px-4 text-center">
      <div className="flex flex-col items-center space-y-6">
        <CheckCircle className="h-24 w-24 text-green-500" />
        
        <h1 className="text-3xl font-bold">
          {language === 'en' ? 'Payment Successful!' : 'Плащането е успешно!'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' 
            ? 'Thank you for your purchase. Your order has been received and is now being processed.'
            : 'Благодарим ви за покупката. Вашата поръчка е получена и се обработва.'}
        </p>
        
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'You will receive a confirmation email shortly.'
            : 'Ще получите имейл за потвърждение скоро.'}
        </p>
        
        <Link href="/" passHref>
          <Button>
            {language === 'en' ? 'Return to Shop' : 'Обратно към магазина'}
          </Button>
        </Link>
      </div>
    </div>
  );
} 