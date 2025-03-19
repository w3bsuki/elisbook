"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, CalendarCheck, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  type: 'book' | 'service';
  coverImage?: string;
  image?: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderData {
  customer: CustomerInfo;
  shipping: ShippingInfo;
  items: OrderItem[];
  paymentMethod: string;
  notes: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  orderNumber?: string;
  orderDate?: string;
}

export default function PaymentSuccessPage() {
  const { language } = useLanguage();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Clear the cart after successful payment
    clearCart();

    // Generate a random order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const orderDate = new Date().toISOString();

    try {
      // Get order data from sessionStorage
      if (typeof window !== 'undefined') {
        const savedOrder = sessionStorage.getItem('lastOrder');
        if (savedOrder) {
          const parsedOrder = JSON.parse(savedOrder);
          // Add order number and date
          setOrderData({
            ...parsedOrder,
            orderNumber: randomOrderNumber,
            orderDate: orderDate
          });
        }
      }
    } catch (error) {
      console.error("Error retrieving order data:", error);
    }
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-3xl font-bold mb-2">
          {language === 'en' ? 'Order Confirmed!' : 'Поръчката е потвърдена!'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          {language === 'en' 
            ? 'Thank you for your purchase. Your order has been received and is now being processed.'
            : 'Благодарим ви за покупката. Вашата поръчка е получена и се обработва.'}
        </p>
      </div>

      {orderData ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 mb-8">
          {/* Order Information Header */}
          <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {language === 'en' ? 'Order Information' : 'Информация за поръчката'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Order #' : 'Поръчка #'}{orderData.orderNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Placed on' : 'Направена на'} {' '}
                {new Date(orderData.orderDate || '').toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {language === 'en' ? 'Payment Method' : 'Начин на плащане'}
              </p>
              <p className="text-sm">
                {orderData.paymentMethod === 'card' 
                  ? (language === 'en' ? 'Credit Card' : 'Кредитна карта')
                  : orderData.paymentMethod === 'paypal' 
                    ? 'PayPal' 
                    : (language === 'en' ? 'Cash on Delivery' : 'Наложен платеж')}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Customer and Shipping Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Customer Information' : 'Информация за клиента'}
              </h3>
              <p>{orderData.customer.firstName} {orderData.customer.lastName}</p>
              <p>{orderData.customer.email}</p>
              <p>{orderData.customer.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Shipping Information' : 'Информация за доставка'}
              </h3>
              <p>{orderData.shipping.address}</p>
              <p>{orderData.shipping.city}, {orderData.shipping.postalCode}</p>
              <p>{orderData.shipping.country}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Items */}
          <h3 className="font-semibold mb-4">
            {language === 'en' ? 'Order Items' : 'Артикули'}
          </h3>
          <div className="space-y-4 mb-6">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md w-16 h-16 relative flex-shrink-0">
                  {item.coverImage || item.image ? (
                    <Image
                      src={item.coverImage || item.image || ''}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      {item.type === 'book' ? (
                        <Package className="h-8 w-8 text-gray-400" />
                      ) : (
                        <CalendarCheck className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Type' : 'Тип'}: {item.type === 'book' 
                      ? (language === 'en' ? 'Book' : 'Книга') 
                      : (language === 'en' ? 'Service' : 'Услуга')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{(item.price * item.quantity).toFixed(2)} BGN</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × {item.price.toFixed(2)} BGN
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? 'Subtotal' : 'Междинна сума'}
              </span>
              <span>{orderData.subtotal.toFixed(2)} BGN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? 'Shipping' : 'Доставка'}
              </span>
              <span>{orderData.shippingCost === 0 
                ? (language === 'en' ? 'Free' : 'Безплатна') 
                : `${orderData.shippingCost.toFixed(2)} BGN`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'en' ? 'Tax (20%)' : 'ДДС (20%)'}
              </span>
              <span>{orderData.tax.toFixed(2)} BGN</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>{language === 'en' ? 'Total' : 'Обща сума'}</span>
              <span>{orderData.totalAmount.toFixed(2)} BGN</span>
            </div>
          </div>

          {/* Notes */}
          {orderData.notes && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md mt-4">
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Order Notes' : 'Бележки към поръчката'}
              </h3>
              <p className="text-sm">{orderData.notes}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? 'Order details not available. Please check your email for order confirmation.'
              : 'Детайлите на поръчката не са налични. Моля, проверете имейла си за потвърждение на поръчката.'}
          </p>
        </div>
      )}
      
      <div className="text-center">
        <Link href="/" passHref>
          <Button>
            {language === 'en' ? 'Return to Shop' : 'Обратно към магазина'}
          </Button>
        </Link>
      </div>
    </div>
  );
} 