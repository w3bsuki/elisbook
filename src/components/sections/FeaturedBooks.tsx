"use client";

import { BookOpen, Star, Sparkles, TrendingUp, Crown, FileText, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { shopBooks } from "@/lib/shop-data";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Как Ежедневната Практика на Осъзнатост Може да Преобрази Живота Ви',
    titleEn: 'How Daily Mindfulness Practice Can Transform Your Life',
    excerpt: 'Открийте мощните ползи от включването на само 10 минути осъзнатост във вашата ежедневна рутина и как това може да доведе до дълбоки промени в психическото ви благосъстояние.',
    excerptEn: 'Discover the powerful benefits of incorporating just 10 minutes of mindfulness into your daily routine and how it can lead to profound changes in your mental wellbeing.',
    image: '/images/blog/mindfulness-practice.txt',
    date: '15 Май, 2023',
    dateEn: 'May 15, 2023',
    category: 'mindfulness',
    readTime: '5 мин',
    readTimeEn: '5 min'
  },
  {
    id: '2',
    title: '5 Прости Навика за Осъзнато Хранене Всеки Ден',
    titleEn: '5 Simple Habits for Mindful Eating Every Day',
    excerpt: 'Научете практически стратегии за развиване на по-здравословна връзка с храната чрез практики за осъзнато хранене, които лесно можете да включите в натоварения си начин на живот.',
    excerptEn: 'Learn practical strategies to develop a healthier relationship with food through mindful eating practices that you can easily incorporate into your busy lifestyle.',
    image: '/images/blog/healthy-eating.txt',
    date: '28 Април, 2023',
    dateEn: 'April 28, 2023',
    category: 'health',
    readTime: '7 мин',
    readTimeEn: '7 min'
  },
  {
    id: '3',
    title: 'Силата на Ежедневното Водене на Дневник за Личностно Развитие',
    titleEn: 'The Power of Daily Journaling for Personal Growth',
    excerpt: 'Разберете как воденето на ежедневен дневник може да ви помогне да изясните мислите си, да обработите емоциите си и да проследите пътя си на личностно развитие с течение на времето.',
    excerptEn: 'Explore how keeping a daily journal can help you clarify your thoughts, process emotions, and track your personal growth journey over time.',
    image: '/images/blog/personal-growth.txt',
    date: '12 Март, 2023',
    dateEn: 'March 12, 2023',
    category: 'development',
    readTime: '6 мин',
    readTimeEn: '6 min'
  }
];

const FeaturedBooks = () => {
  const { language, t } = useLanguage();
  
  return (
    <section className="bg-secondary py-32">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-[60rem] w-full">
          {/* Top dashed line with text */}
          <div className="relative flex items-center justify-center">
            <div className="w-full h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <div className="absolute bg-secondary px-4 font-mono text-sm font-medium tracking-wide text-green-600 flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="font-medium uppercase text-sm">
                {language === 'en' ? 'BLOG' : 'БЛОГ'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:mt-16 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 w-fit">
                <TrendingUp className="h-4 w-4" />
                {language === 'en' ? 'Latest Articles' : 'Последни Статии'}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {language === 'en' ? 'Insights & Wisdom' : 'Прозрения и Мъдрост'}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-base text-muted-foreground md:text-lg">
                {language === 'en' 
                  ? 'Explore our collection of thought-provoking articles, practical guides, and inspirational content designed to help you on your journey of personal growth and mindfulness.'
                  : 'Разгледайте нашата колекция от провокиращи размисъл статии, практически ръководства и вдъхновяващо съдържание, създадено да ви помогне в пътуването ви на личностно развитие и осъзнатост.'}
              </p>
              <div className="grid grid-cols-2 gap-6 rounded-2xl bg-background/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">50+</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Articles' : 'Статии'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">4.9</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Reader Rating' : 'Читателска Оценка'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <Card className="mt-16 overflow-hidden border-none bg-transparent shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                  <div key={i} className="cursor-pointer group">
                    <div className="relative transition-all duration-300 transform group-hover:translate-y-[-5px] group-hover:shadow-lg">
                      <div className="bg-white border-2 border-black overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={post.image}
                            alt={language === 'en' ? post.titleEn : post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500 hover:bg-green-500/90">
                              {language === 'en' 
                                ? post.category.charAt(0).toUpperCase() + post.category.slice(1) 
                                : post.category === 'health' ? 'Здраве' 
                                : post.category === 'mindfulness' ? 'Осъзнатост' 
                                : post.category === 'development' ? 'Развитие'
                                : post.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <Calendar className="h-3 w-3" />
                            {language === 'en' ? post.dateEn : post.date}
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-500"></span>
                            {language === 'en' ? post.readTimeEn : post.readTime}
                          </div>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">
                            {language === 'en' ? post.titleEn : post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                            {language === 'en' ? post.excerptEn : post.excerpt}
                          </p>
                          <div className="flex justify-end">
                            <span className="text-xs text-green-600 font-medium">
                              {language === 'en' ? 'Read more →' : 'Прочети още →'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex justify-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="gap-2 bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                <FileText className="h-5 w-5" />
                {language === 'en' ? 'View All Articles' : 'Вижте Всички Статии'}
              </Button>
            </Link>
          </div>

          {/* About the Author Section */}
          <div className="mt-24 mb-24">
            <div className="relative flex items-center justify-center mb-12">
              <div className="w-full h-px bg-gray-300 relative">
                <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
              </div>
              <div className="absolute bg-secondary px-4 font-mono text-sm font-medium tracking-wide text-green-600 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span className="font-medium uppercase text-sm">
                  {language === 'en' ? 'ABOUT THE AUTHOR' : 'ЗА АВТОРА'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-black bg-green-100 z-0"></div>
                <div className="relative z-10 border-2 border-black overflow-hidden">
                  <Image 
                    src="/images/avatar/author-full.jpg" 
                    alt={language === 'en' ? "Author Portrait" : "Портрет на автора"}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 font-playfair">
                  {language === 'en' ? 'Elena Ivanova' : 'Елена Иванова'}
                </h2>
                <p className="text-gray-700 mb-6">
                  {language === 'en' 
                    ? 'Award-winning author and mindfulness practitioner with over 15 years of experience in personal development coaching and writing. My journey began in the mountains of Bulgaria, where I discovered the power of mindfulness and journaling to transform lives.'
                    : 'Отличен автор и практикуващ осъзнатост с над 15 години опит в коучинга за личностно развитие и писането. Моето пътуване започна в планините на България, където открих силата на осъзнатостта и воденето на дневник да трансформират животи.'}
                </p>
                <p className="text-gray-700 mb-6">
                  {language === 'en' 
                    ? 'Through my books and workshops, I have helped thousands of people discover their authentic selves and create meaningful change in their lives. I believe that everyone has a story worth telling, and I am passionate about helping others find their voice.'
                    : 'Чрез моите книги и работилници съм помогнала на хиляди хора да открият автентичните си същности и да създадат смислена промяна в живота си. Вярвам, че всеки има история, която си заслужава да бъде разказана, и съм страстна да помагам на другите да намерят своя глас.'}
                </p>
                
                <div className="flex gap-4 mt-4">
                  <Link href="/about">
                    <Button variant="outline" className="border-2 border-black bg-white hover:bg-gray-100 text-black">
                      {language === 'en' ? 'My Story' : 'Моята История'}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="border-2 border-black bg-green-600 hover:bg-green-700 text-white">
                      {language === 'en' ? 'Get in Touch' : 'Свържете се'}
                    </Button>
                  </Link>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">12</div>
                      <div className="text-xs text-gray-500">
                        {language === 'en' ? 'Books Published' : 'Публикувани Книги'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">50+</div>
                      <div className="text-xs text-gray-500">
                        {language === 'en' ? 'Workshops Held' : 'Проведени Работилници'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">10k+</div>
                      <div className="text-xs text-gray-500">
                        {language === 'en' ? 'Lives Impacted' : 'Повлияни Животи'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Writing Services Section */}
          <div className="mt-24">
            <div className="relative flex items-center justify-center mb-12">
              <div className="w-full h-px bg-gray-300 relative">
                <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
              </div>
              <div className="absolute bg-secondary px-4 font-mono text-sm font-medium tracking-wide text-green-600 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                <span className="font-medium uppercase text-sm">
                  {language === 'en' ? 'WRITING SERVICES' : 'ПИСАТЕЛСКИ УСЛУГИ'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Service 1 */}
              <div className="bg-white border-2 border-black p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl">
                    {language === 'en' ? 'Book Editing' : 'Редактиране на Книги'}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Professional editing services to polish your manuscript and prepare it for publication. Includes developmental editing, line editing, and proofreading.'
                    : 'Професионални услуги за редактиране, които ще шлифоват вашия ръкопис и ще го подготвят за публикуване. Включва развитийно редактиране, редактиране на текста и коректура.'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    {language === 'en' ? 'From $500' : 'От 900 лв.'}
                  </span>
                  <Link href="/services">
                    <span className="text-sm text-green-600 font-medium">
                      {language === 'en' ? 'Learn more →' : 'Научете повече →'}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white border-2 border-black p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl">
                    {language === 'en' ? 'Ghostwriting' : 'Писане от Призрак'}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Professional ghostwriting services for your book, memoir, or article. I will help bring your ideas to life while maintaining your unique voice and vision.'
                    : 'Професионални услуги за писане от призрак за вашата книга, мемоари или статия. Ще помогна да съживя идеите ви, като запазя вашия уникален глас и визия.'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    {language === 'en' ? 'From $2,000' : 'От 3,600 лв.'}
                  </span>
                  <Link href="/services">
                    <span className="text-sm text-green-600 font-medium">
                      {language === 'en' ? 'Learn more →' : 'Научете повече →'}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white border-2 border-black p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl">
                    {language === 'en' ? 'Writing Workshops' : 'Писателски Работилници'}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Interactive workshops and courses designed to help you develop your writing skills, overcome creative blocks, and find your authentic voice.'
                    : 'Интерактивни работилници и курсове, предназначени да ви помогнат да развиете писателските си умения, да преодолеете творческите блокажи и да намерите автентичния си глас.'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    {language === 'en' ? 'From $250' : 'От 450 лв.'}
                  </span>
                  <Link href="/services">
                    <span className="text-sm text-green-600 font-medium">
                      {language === 'en' ? 'Learn more →' : 'Научете повече →'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/services">
                <Button variant="outline" size="lg" className="gap-2 bg-black hover:bg-gray-900 text-white border-2 border-green-600 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                  <Sparkles className="h-5 w-5" />
                  {language === 'en' ? 'Explore All Services' : 'Разгледайте Всички Услуги'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_45%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_45%,transparent)]",
              ],
        )}
      />
    </div>
  );
};

export default FeaturedBooks; 