"use client";

import React from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Send, Phone, MapPin, BookOpen } from "lucide-react";
import Image from "next/image";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* About Me Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">{language === 'en' ? 'About Me' : 'За мен'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <p className="text-lg mb-4">
              {language === 'en' 
                ? 'Welcome to my literary corner! I am a passionate writer dedicated to creating immersive stories that transport readers to new worlds and experiences.'
                : 'Добре дошли в моето литературно кътче! Аз съм страстен писател, посветен на създаването на завладяващи истории, които пренасят читателите в нови светове и преживявания.'}
            </p>
            <p className="text-lg mb-4">
              {language === 'en'
                ? 'With over 10 years of writing experience, I have published several novels across different genres, from thrilling mysteries to heartwarming romances. My goal is to create stories that resonate with readers and leave a lasting impression.'
                : 'С над 10 години писателски опит, публикувах няколко романа в различни жанрове, от вълнуващи мистерии до сърцераздирателни романси. Моята цел е да създавам истории, които резонират с читателите и оставят трайно впечатление.'}
            </p>
            <p className="text-lg mb-4">
              {language === 'en'
                ? 'When I\'m not writing, you can find me exploring nature, visiting local bookstores, or enjoying a cup of coffee while brainstorming new story ideas.'
                : 'Когато не пиша, можете да ме намерите да изследвам природата, да посещавам местни книжарници или да се наслаждавам на чаша кафе, докато обмислям нови идеи за истории.'}
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                {language === 'en' ? 'View My Books' : 'Вижте моите книги'}
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-green-500 shadow-xl">
              <Image 
                src="/images/writer-placeholder.jpg" 
                alt="Author" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Separator className="my-12" />
      
      {/* Writing Journey Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'My Writing Journey' : 'Моето писателско пътешествие'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-md border border-border">
            <BookOpen className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Early Beginnings' : 'Ранни начала'}</h3>
            <p>
              {language === 'en'
                ? 'I started writing short stories at the age of 12, inspired by the books that filled my childhood with wonder and excitement.'
                : 'Започнах да пиша кратки разкази на 12-годишна възраст, вдъхновен от книгите, които изпълниха детството ми с чудо и вълнение.'}
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-md border border-border">
            <BookOpen className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'First Publication' : 'Първа публикация'}</h3>
            <p>
              {language === 'en'
                ? 'My first novel was published in 2015 after years of dedication and countless drafts. It was a dream come true to see my work in print.'
                : 'Първият ми роман беше публикуван през 2015 г. след години на отдаденост и безброй чернови. Беше сбъдната мечта да видя работата си на печат.'}
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-md border border-border">
            <BookOpen className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Current Projects' : 'Текущи проекти'}</h3>
            <p>
              {language === 'en'
                ? 'I\'m currently working on a new series that explores themes of identity, belonging, and the power of human connection.'
                : 'В момента работя върху нова поредица, която изследва теми за идентичността, принадлежността и силата на човешката връзка.'}
            </p>
          </div>
        </div>
      </section>
      
      <Separator className="my-12" />
      
      {/* Contact Form Section */}
      <section id="contact" className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'Get in Touch' : 'Свържете се с мен'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg mb-6">
              {language === 'en'
                ? 'Have a question or want to collaborate? Feel free to reach out using the contact form or through any of the channels below.'
                : 'Имате въпрос или искате да си сътрудничим? Не се колебайте да се свържете с мен чрез формуляра за контакт или чрез някой от каналите по-долу.'}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span>+359 888 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>{language === 'en' ? 'Sofia, Bulgaria' : 'София, България'}</span>
              </div>
            </div>
          </div>
          
          <div>
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 mb-2">
                  <Send className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {language === 'en' ? 'Message Sent!' : 'Съобщението е изпратено!'}
                </h3>
                <p className="text-green-700">
                  {language === 'en' 
                    ? 'Thank you for reaching out. I\'ll get back to you as soon as possible.'
                    : 'Благодаря, че се свързахте с мен. Ще ви отговоря възможно най-скоро.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {language === 'en' ? 'Name' : 'Име'}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {language === 'en' ? 'Email' : 'Имейл'}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {language === 'en' ? 'Message' : 'Съобщение'}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {language === 'en' ? 'Sending...' : 'Изпращане...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {language === 'en' ? 'Send Message' : 'Изпрати съобщение'}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 