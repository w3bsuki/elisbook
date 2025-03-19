"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { stripePromise } from '@/lib/stripe';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  children: React.ReactNode;
  className?: string;
}

function PaymentForm({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: Error) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        onError?.(error);
      } else {
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full"
      >
        {isProcessing ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'en' ? 'Processing...' : 'Обработка...'}
          </span>
        ) : (
          language === 'en' ? 'Pay Now' : 'Плати Сега'
        )}
      </Button>
    </form>
  );
}

export function PaymentButton({
  amount,
  currency = 'usd',
  metadata = {},
  onSuccess,
  onError,
  children,
  className,
}: PaymentButtonProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setClientSecret(data.clientSecret);
      setShowPaymentModal(true);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handlePaymentClick}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </span>
        ) : (
          children
        )}
      </Button>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              <PaymentForm onSuccess={onSuccess} onError={onError} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 