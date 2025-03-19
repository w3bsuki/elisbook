"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaymentButton } from '@/components/ui/payment-button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'cash';
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { cartItems, subtotal, totalItems, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bulgaria',
    paymentMethod: 'card',
    notes: ''
  });

  // Shipping cost and tax calculation
  const shippingCost = subtotal > 50 ? 0 : 5; // Free shipping for orders over 50 BGN
  const taxRate = 0.20; // 20% VAT
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + tax;

  useEffect(() => {
    setMounted(true);
    
    // Redirect to home if cart is empty
    if (mounted && cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems.length, router, mounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: 'card' | 'paypal' | 'cash') => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
          coverImage: item.coverImage,
          image: item.image
        })),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        subtotal,
        shippingCost,
        tax,
        totalAmount
      };

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process order');
      }
      
      // Store order in sessionStorage for use on success page
      sessionStorage.setItem('lastOrder', JSON.stringify({
        ...orderData,
        orderNumber: result.orderId,
        orderDate: result.orderDate
      }));
      
      // Redirect to the success page
      router.push('/payment-success');
      
      // Clear the cart
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      // Show error message to user
      alert(language === 'en' 
        ? `Error: ${error instanceof Error ? error.message : 'Failed to process order'}` 
        : `Грешка: ${error instanceof Error ? error.message : 'Неуспешно обработване на поръчката'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="container py-10 mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">
        {language === 'en' ? 'Checkout' : 'Плащане'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Customer Information' : 'Информация за клиента'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    {language === 'en' ? 'First Name' : 'Име'}*
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    {language === 'en' ? 'Last Name' : 'Фамилия'}*
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email' : 'Имейл'}*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'en' ? 'Phone' : 'Телефон'}*
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Shipping Information' : 'Информация за доставка'}
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">
                    {language === 'en' ? 'Address' : 'Адрес'}*
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      {language === 'en' ? 'City' : 'Град'}*
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      {language === 'en' ? 'Postal Code' : 'Пощенски код'}*
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">
                    {language === 'en' ? 'Country' : 'Държава'}*
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Payment Method' : 'Начин на плащане'}
              </h2>
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(value) => handleRadioChange(value as 'card' | 'paypal' | 'cash')}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <span className="ml-2">{language === 'en' ? 'Credit Card' : 'Кредитна карта'}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                    <span className="ml-2">PayPal</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center cursor-pointer">
                    <span className="ml-2">{language === 'en' ? 'Cash on Delivery' : 'Наложен платеж'}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Order Notes' : 'Бележки към поръчката'}
              </h2>
              <div className="space-y-2">
                <Label htmlFor="notes">
                  {language === 'en' ? 'Additional Notes' : 'Допълнителни бележки'}
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={language === 'en' 
                    ? "Special delivery instructions or other requests" 
                    : "Специални инструкции за доставка или други заявки"}
                  rows={3}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Order Summary' : 'Резюме на поръчката'}
            </h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.coverImage || item.image || '/book-placeholder.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{language === 'en' ? 'Qty' : 'Бр'}: {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} BGN</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Totals */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Subtotal' : 'Междинна сума'}</span>
                <span>{subtotal.toFixed(2)} BGN</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Shipping' : 'Доставка'}</span>
                <span>{shippingCost === 0 
                  ? (language === 'en' ? 'Free' : 'Безплатна') 
                  : `${shippingCost.toFixed(2)} BGN`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Tax (20%)' : 'ДДС (20%)'}</span>
                <span>{tax.toFixed(2)} BGN</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-base">
                <span>{language === 'en' ? 'Total' : 'Обща сума'}</span>
                <span>{totalAmount.toFixed(2)} BGN</span>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              onClick={handleSubmit}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === 'en' ? 'Processing...' : 'Обработка...'}
                </span>
              ) : (
                language === 'en' ? 'Complete Order' : 'Завърши поръчката'
              )}
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                {language === 'en' ? 'Continue Shopping' : 'Продължи пазаруването'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 