'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/LanguageContext';
import { services } from '@/data/services';
import { Service } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export default function BookServicePage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the service by ID
    const foundService = services.find(s => s.id === params.id);
    
    if (!foundService) {
      notFound();
    }
    
    setService(foundService);
  }, [params.id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: language === 'en' ? 'Booking Successful' : 'Успешна Резервация',
        description: language === 'en' 
          ? 'We have received your booking request. We will contact you shortly.' 
          : 'Получихме вашата заявка за резервация. Ще се свържем с вас скоро.',
        variant: 'default',
      });
      
      // Redirect to success page or service detail page
      router.push(`/services/${params.id}`);
    }, 1500);
  };
  
  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href={`/services/${params.id}`} 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Back to Service Details' : 'Назад към Детайли за Услугата'}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-green-400 to-green-600 text-white">
                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{service.duration}</span>
                </div>
                <div className="text-2xl font-bold">
                  {service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? 'Service Details' : 'Детайли за Услугата'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                
                {/* Includes (for packages) */}
                {service.category === 'package' && service.includes && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'What\'s Included:' : 'Какво Включва:'}
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {service.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Book This Service' : 'Запази Тази Услуга'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'en' ? 'Full Name' : 'Пълно Име'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'en' ? 'Email' : 'Имейл'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'en' ? 'Phone Number' : 'Телефон'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      {language === 'en' ? 'Preferred Date' : 'Предпочитана Дата'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {language === 'en' ? 'Additional Information' : 'Допълнителна Информация'}
                  </Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="border-2 border-gray-200 dark:border-gray-700"
                    placeholder={language === 'en' 
                      ? 'Any specific requirements or questions...' 
                      : 'Специфични изисквания или въпроси...'}
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'en' ? 'Processing...' : 'Обработка...'}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      {language === 'en' ? 'Confirm Booking' : 'Потвърди Резервация'}
                    </span>
                  )}
                </Button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                  {language === 'en' 
                    ? 'We will contact you to confirm your booking and provide further details.' 
                    : 'Ще се свържем с вас, за да потвърдим резервацията и да предоставим допълнителни детайли.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 