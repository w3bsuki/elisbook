"use client";

import { BookOpen, UserCircle, ArrowDown, X, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLanguage } from "@/lib/LanguageContext";
import FlipCard from "@/components/animata/card/flip-card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Define the book type
interface HeroBook {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  excerpt: string;
  category: string;
}

export default function Hero() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | HeroBook>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const { t, language } = useLanguage();

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Book data - updated with client's bestselling books
  const books: HeroBook[] = [
    {
      id: '1',
      image: "/images/books/osaznato-hranene.jpg",
      title: "Осъзнато хранене",
      subtitle: language === 'bg' ? "Здраве и Хранене" : "Health & Nutrition",
      description: language === 'bg' 
        ? "Книга, която помага на читателите да развият собствени хранителни навици с насоки и психологически практики за справяне с проблемите с теглото."
        : "A book that helps readers develop their own eating habits with guidance and psychological practices for dealing with weight issues.",
      excerpt: language === 'bg'
        ? "Осъзнатото хранене е подход, който ви помага да се свържете отново с вашата вродена мъдрост за хранене. Това не е диета, а начин да преоткриете удоволствието от храната, като същевременно се научите да разпознавате сигналите на тялото си за глад и ситост. В тази книга ще откриете практически съвети и упражнения, които ще ви помогнат да развиете по-здравословна връзка с храната и да постигнете естествено равновесие на теглото си."
        : "Mindful eating is an approach that helps you reconnect with your innate eating wisdom. It's not a diet, but a way to rediscover the pleasure of food while learning to recognize your body's signals of hunger and fullness. In this book, you'll find practical advice and exercises that will help you develop a healthier relationship with food and achieve a natural weight balance.",
      category: 'health'
    },
    {
      id: '3',
      image: "/images/books/vdahnovenia-kniga-1.png",
      title: "Вдъхновения",
      subtitle: language === 'bg' ? "Поезия" : "Poetry",
      description: language === 'bg'
        ? "Книга, която предлага насоки и вдъхновение за читателите, които са несигурни за следващите си стъпки в живота."
        : "A book that offers guidance and inspiration for readers who are uncertain about their next steps in life.",
      excerpt: language === 'bg'
        ? "\"Вдъхновения\" е сборник от мисли и поетични размишления, създадени да ви помогнат в моментите, когато се чувствате изгубени или несигурни за пътя напред. Всяка страница е покана да погледнете навътре, да намерите своята вътрешна мъдрост и да продължите напред с увереност. Отворете книгата на произволна страница, когато се нуждаете от насока, и позволете на думите да ви вдъхновят и насочат."
        : "\"Inspirations\" is a collection of thoughts and poetic reflections designed to help you in moments when you feel lost or uncertain about the path forward. Each page is an invitation to look inward, find your inner wisdom, and move forward with confidence. Open the book to a random page when you need guidance, and let the words inspire and guide you.",
      category: 'poetry'
    },
    {
      id: '6',
      image: "/images/books/s-dusha-i-sarce.jpg",
      title: "С душа и сърце",
      subtitle: language === 'bg' ? "Поезия" : "Poetry",
      description: language === 'bg'
        ? "Поетична колекция, която изследва дълбоките емоции и връзки, които формират човешкия опит, написана с искреност и емоционална дълбочина."
        : "A poetic collection that explores the deep emotions and connections that shape the human experience, written with sincerity and emotional depth.",
      excerpt: language === 'bg'
        ? "\"С душа и сърце\" е поетично пътуване през пейзажа на човешките емоции. Тази колекция изследва любовта, загубата, радостта и тъгата с дълбока искреност и емоционална яснота. Всяко стихотворение е покана да се потопите в дълбините на собствените си чувства и да намерите отражение на вашите преживявания в думите на страницата. Това е книга, която говори директно на сърцето и душата."
        : "\"With Soul and Heart\" is a poetic journey through the landscape of human emotions. This collection explores love, loss, joy, and sorrow with deep sincerity and emotional clarity. Each poem is an invitation to immerse yourself in the depths of your own feelings and find a reflection of your experiences in the words on the page. This is a book that speaks directly to the heart and soul.",
      category: 'poetry'
    }
  ];

  const handleBookClick = (book: HeroBook) => {
    setSelectedBook(book);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Here you would typically send the message to a backend
      // For now, we'll just clear the input
      setChatMessage("");
      // You could also add the message to a chat history state if you want to display it
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10">
            {/* Author Avatar - Centered above headline */}
            <div 
              className="mb-6 cursor-pointer group relative"
              onClick={() => setIsChatOpen(true)}
            >
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-green-500 shadow-lg transition-transform hover:scale-105 mb-2">
                  <AvatarImage src="/images/writer-placeholder.jpg" alt="Elis" />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl font-semibold">E</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {language === 'en' ? 'Chat with Elis' : 'Чат с Елис'}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {ensureString(t("hero.title"))}{" "}
              <span className="block mt-1 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {ensureString(t("hero.titleHighlight"))}
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="px-6 bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200" asChild>
                <Link href="/shop">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {ensureString(t("hero.cta"))}
                </Link>
              </Button>
              <Button 
                className="px-6 bg-black hover:bg-gray-900 text-white border-2 border-green-600 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setIsAboutOpen(true)}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                {ensureString(t("hero.meetMentor"))}
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto mt-4 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
              {books.map((book, index) => (
                <div 
                  key={index} 
                  onClick={() => handleBookClick(book)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <FlipCard
                    image={book.image}
                    title={book.title}
                    subtitle={book.subtitle}
                    description={book.description}
                    category={book.category}
                    className={index === 1 ? "z-10" : ""}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer mt-8 text-muted-foreground hover:text-foreground transition-colors" 
            onClick={scrollToNextSection}
          >
            <span className="text-sm mb-1">{ensureString(t("hero.scrollDown"))}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>

      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold">{ensureString(t("aboutElis.title"))}</DialogTitle>
          </DialogHeader>
          <div className="pt-3 space-y-3 text-xs text-muted-foreground">
            <div>
              {ensureString(t("aboutElis.content1"))}
            </div>
            <div>
              {ensureString(t("aboutElis.content2"))}
            </div>
            <div>
              {ensureString(t("aboutElis.content3"))}
            </div>
            <div className="italic">
              {ensureString(t("aboutElis.quote"))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Book Preview Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl sm:text-2xl font-semibold">{selectedBook.title}</DialogTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedBook(null)}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DialogDescription className="text-sm text-green-600 font-medium">
                  {selectedBook.subtitle}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="w-full max-w-[200px] mx-auto md:mx-0">
                  <AspectRatio ratio={2/3} className="bg-muted rounded-md overflow-hidden">
                    <Image
                      src={selectedBook.image}
                      alt={selectedBook.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                      priority
                    />
                  </AspectRatio>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="font-medium text-lg mb-2">{language === 'en' ? 'Introduction' : 'Въведение'}</h3>
                  <p className="text-sm text-muted-foreground">{selectedBook.excerpt}</p>
                </div>
              </div>
              
              <Separator />
              
              <DialogFooter>
                <Link href={`/shop/${selectedBook.id}`}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'View Book Details' : 'Вижте детайли за книгата'}
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-[500px]">
            {/* Chat Header */}
            <DialogHeader className="px-4 py-3 border-b bg-green-50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-green-500">
                  <AvatarImage src="/images/writer-placeholder.jpg" alt="Elis" />
                  <AvatarFallback className="bg-green-100 text-green-800 text-lg font-semibold">E</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <DialogTitle className="text-base font-semibold">Elis</DialogTitle>
                  <DialogDescription className="text-xs">
                    {language === 'en' ? 'Author & Mentor' : 'Автор и Ментор'}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <div className="flex items-start gap-2.5">
                <Avatar className="h-8 w-8 border border-green-500">
                  <AvatarFallback className="bg-green-100 text-green-800 text-sm font-semibold">E</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900">Elis</span>
                    <span className="text-xs font-normal text-gray-500">11:46</span>
                  </div>
                  <div className="rounded-e-xl rounded-es-xl bg-green-100 p-3 text-sm text-gray-900">
                    {language === 'en' 
                      ? "Hello! I'm Elis, the author of the books you see on this page. How can I help you today?" 
                      : "Здравейте! Аз съм Елис, авторът на книгите, които виждате на тази страница. Как мога да ви помогна днес?"}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t p-3 bg-white">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder={language === 'en' ? "Type your message..." : "Напишете вашето съобщение..."}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="h-9 w-9 rounded-full bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 