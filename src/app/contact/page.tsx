'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      // Success
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="container py-12 mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Badge variant="outline" className="mb-4 px-6 py-2 text-sm font-medium rounded-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Get in Touch' : 'Свържете се с нас'}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4 font-playfair">
          {language === 'en' ? 'Contact Us' : 'Контакти'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Have questions about our books or services? We're here to help. Reach out to us using the information below or fill out the contact form.'
            : 'Имате въпроси относно нашите книги или услуги? Ние сме тук, за да помогнем. Свържете се с нас, използвайки информацията по-долу или попълнете формата за контакт.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
          <h2 className="text-2xl font-bold mb-6 font-playfair text-gray-900 dark:text-white">
            {language === 'en' ? 'Contact Information' : 'Информация за контакт'}
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Email' : 'Имейл'}
                </h3>
                <a href="mailto:contact@elisbooks.com" className="text-green-600 dark:text-green-400 hover:underline">
                  contact@elisbooks.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Phone' : 'Телефон'}
                </h3>
                <a href="tel:+359888123456" className="text-green-600 dark:text-green-400 hover:underline">
                  +359 888 123 456
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Address' : 'Адрес'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? '123 Book Street, Sofia, Bulgaria' 
                    : 'ул. Книга 123, София, България'}
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {language === 'en' ? 'Office Hours' : 'Работно време'}
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>
                  {language === 'en' ? 'Monday - Friday: 9:00 AM - 6:00 PM' : 'Понеделник - Петък: 9:00 - 18:00'}
                </p>
                <p>
                  {language === 'en' ? 'Saturday: 10:00 AM - 4:00 PM' : 'Събота: 10:00 - 16:00'}
                </p>
                <p>
                  {language === 'en' ? 'Sunday: Closed' : 'Неделя: Затворено'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
          <h2 className="text-2xl font-bold mb-6 font-playfair text-gray-900 dark:text-white">
            {language === 'en' ? 'Send a Message' : 'Изпратете съобщение'}
          </h2>
          
          {submitSuccess ? (
            <Alert className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 mb-6">
              <AlertTitle>
                {language === 'en' ? 'Message Sent!' : 'Съобщението е изпратено!'}
              </AlertTitle>
              <AlertDescription>
                {language === 'en' 
                  ? 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
                  : 'Благодарим Ви! Вашето съобщение беше изпратено успешно. Ще се свържем с Вас скоро.'}
              </AlertDescription>
            </Alert>
          ) : submitError ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>
                {language === 'en' ? 'Something went wrong' : 'Възникна грешка'}
              </AlertTitle>
              <AlertDescription>
                {language === 'en' 
                  ? `Could not send your message: ${submitError}` 
                  : `Не можахме да изпратим съобщението Ви: ${submitError}`}
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Your Name' : 'Вашето име'}*
                </label>
                <Input
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Email Address' : 'Имейл адрес'}*
                </label>
                <Input
                  id="email" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Subject' : 'Тема'}
                </label>
                <Input
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Message' : 'Съобщение'}*
                </label>
                <Textarea
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5} 
                  className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 h-12"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {language === 'en' ? 'Sending...' : 'Изпращане...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Send Message' : 'Изпрати съобщение'}
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46616.81797831709!2d23.32768051852167!3d42.69767293936446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1631654825238!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy"
              title="ELISBooks Location"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
} 