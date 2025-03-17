'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Get in Touch' : 'Свържете се с нас'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Contact Us' : 'Контакти'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Have questions or want to work together? Reach out to us!'
              : 'Имате въпроси или искате да работим заедно? Свържете се с нас!'}
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
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
            <h2 className="text-2xl font-bold mb-6 font-playfair text-gray-900 dark:text-white">
              {language === 'en' ? 'Send a Message' : 'Изпратете съобщение'}
            </h2>
            
            {submitSuccess ? (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-md mb-6">
                <p className="font-medium">
                  {language === 'en' 
                    ? 'Thank you! Your message has been sent successfully.' 
                    : 'Благодарим Ви! Вашето съобщение беше изпратено успешно.'}
                </p>
              </div>
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
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : 'Изпращане...') 
                    : (language === 'en' ? 'Send Message' : 'Изпрати съобщение')}
                </Button>
              </form>
            )}
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46616.00810384897!2d23.2833365!3d42.6954322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1647889868279!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 