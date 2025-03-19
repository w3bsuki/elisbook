"use client";

// Helper function to format amount for Stripe (converts to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount from Stripe (converts from cents)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};

// Initialize Stripe with your publishable key - only on client side
let stripePromise: any;
if (typeof window !== 'undefined') {
  try {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (key) {
      import('@stripe/stripe-js').then(({ loadStripe }) => {
        stripePromise = loadStripe(key);
      });
    } else {
      console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
    }
  } catch (error) {
    console.error('Error initializing Stripe:', error);
  }
}

export { stripePromise }; 