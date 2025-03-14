"use client";

import React from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from 'next/navigation';

// Format date function
const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(language === 'en' ? 'en-US' : 'bg-BG', options);
};

// Sample blog posts data - this would typically come from a CMS or API
const blogPosts = {
  "the-art-of-storytelling": {
    title: {
      en: "The Art of Storytelling: Crafting Compelling Narratives",
      bg: "Изкуството на разказването: Създаване на завладяващи истории"
    },
    content: {
      en: `
        <p>Storytelling is one of the oldest forms of human communication. From ancient cave paintings to modern novels, humans have always used stories to share experiences, teach lessons, and entertain.</p>
        
        <h2>The Elements of a Great Story</h2>
        
        <p>Every compelling story contains several key elements:</p>
        
        <ul>
          <li><strong>Character:</strong> Relatable, complex characters that readers can connect with emotionally.</li>
          <li><strong>Conflict:</strong> The central problem or challenge that drives the narrative forward.</li>
          <li><strong>Setting:</strong> The world in which your story takes place, including time period, location, and atmosphere.</li>
          <li><strong>Plot:</strong> The sequence of events that unfold as characters attempt to resolve the conflict.</li>
          <li><strong>Theme:</strong> The underlying message or meaning that the story conveys.</li>
        </ul>
        
        <p>When these elements work together harmoniously, they create a story that resonates with readers and leaves a lasting impression.</p>
        
        <h2>Finding Your Voice</h2>
        
        <p>Your unique voice as a storyteller is what sets your work apart from others. It's a combination of your writing style, perspective, and the themes you explore. Developing your voice takes time and practice, but it's essential for creating authentic and engaging stories.</p>
        
        <p>Don't be afraid to experiment with different styles and approaches until you find what feels natural to you. Read widely across genres and pay attention to how other authors craft their narratives.</p>
        
        <h2>The Power of Emotion</h2>
        
        <p>The most memorable stories are those that evoke strong emotions. Whether it's joy, sadness, fear, or wonder, emotional resonance is what makes readers invest in your story and characters.</p>
        
        <p>To create emotional impact, focus on sensory details, authentic dialogue, and moments of vulnerability for your characters. Show, don't tell, how your characters feel through their actions and reactions.</p>
        
        <h2>Conclusion</h2>
        
        <p>Storytelling is both an art and a craft. While some aspects come naturally, others require deliberate practice and refinement. By understanding the fundamental elements of storytelling and developing your unique voice, you can create narratives that captivate and inspire your readers.</p>
      `,
      bg: `
        <p>Разказването на истории е една от най-старите форми на човешка комуникация. От древните пещерни рисунки до съвременните романи, хората винаги са използвали истории, за да споделят преживявания, да преподават уроци и да забавляват.</p>
        
        <h2>Елементите на една велика история</h2>
        
        <p>Всяка завладяваща история съдържа няколко ключови елемента:</p>
        
        <ul>
          <li><strong>Персонаж:</strong> Релевантни, сложни персонажи, с които читателите могат да се свържат емоционално.</li>
          <li><strong>Конфликт:</strong> Централният проблем или предизвикателство, което движи разказа напред.</li>
          <li><strong>Обстановка:</strong> Светът, в който се развива вашата история, включително времеви период, местоположение и атмосфера.</li>
          <li><strong>Сюжет:</strong> Последователността от събития, които се разгръщат, докато персонажите се опитват да разрешат конфликта.</li>
          <li><strong>Тема:</strong> Основното послание или значение, което историята предава.</li>
        </ul>
        
        <p>Когато тези елементи работят хармонично заедно, те създават история, която резонира с читателите и оставя трайно впечатление.</p>
        
        <h2>Намиране на вашия глас</h2>
        
        <p>Вашият уникален глас като разказвач е това, което отличава вашата работа от другите. Това е комбинация от вашия стил на писане, перспектива и темите, които изследвате. Развиването на вашия глас отнема време и практика, но е от съществено значение за създаването на автентични и завладяващи истории.</p>
        
        <p>Не се страхувайте да експериментирате с различни стилове и подходи, докато не намерите това, което ви се струва естествено. Четете широко в различни жанрове и обръщайте внимание на това как други автори изграждат своите разкази.</p>
        
        <h2>Силата на емоцията</h2>
        
        <p>Най-запомнящите се истории са тези, които предизвикват силни емоции. Независимо дали става дума за радост, тъга, страх или удивление, емоционалният резонанс е това, което кара читателите да инвестират в вашата история и персонажи.</p>
        
        <p>За да създадете емоционално въздействие, фокусирайте се върху сетивните детайли, автентичния диалог и моментите на уязвимост за вашите персонажи. Показвайте, не казвайте, как се чувстват вашите персонажи чрез техните действия и реакции.</p>
        
        <h2>Заключение</h2>
        
        <p>Разказването на истории е едновременно изкуство и занаят. Докато някои аспекти идват естествено, други изискват целенасочена практика и усъвършенстване. Като разбирате фундаменталните елементи на разказването на истории и развивате своя уникален глас, можете да създадете разкази, които пленяват и вдъхновяват вашите читатели.</p>
      `
    },
    date: "2023-10-15",
    readTime: 8,
    category: {
      en: "Writing Tips",
      bg: "Съвети за писане"
    },
    image: "/images/blog/storytelling.txt",
    author: {
      name: "Elis",
      avatar: "/images/writer-placeholder.jpg"
    }
  },
  "character-development": {
    title: {
      en: "Character Development: Creating Memorable Protagonists",
      bg: "Развитие на персонажи: Създаване на запомнящи се протагонисти"
    },
    content: {
      en: `
        <p>Well-developed characters are the heart of any compelling story. They are the vehicles through which readers experience your narrative world, and their journeys often become the most memorable aspects of your writing.</p>
        
        <h2>What Makes a Character Memorable?</h2>
        
        <p>Memorable characters share several key traits:</p>
        
        <ul>
          <li><strong>Complexity:</strong> They have both strengths and flaws, virtues and vices.</li>
          <li><strong>Motivation:</strong> They have clear desires and goals that drive their actions.</li>
          <li><strong>Growth:</strong> They change and evolve throughout the story in response to events.</li>
          <li><strong>Uniqueness:</strong> They have distinctive traits, habits, or perspectives that set them apart.</li>
          <li><strong>Relatability:</strong> Despite their uniqueness, readers can see aspects of themselves or others they know in these characters.</li>
        </ul>
        
        <h2>Creating Multi-Dimensional Characters</h2>
        
        <p>To create characters that feel like real people rather than flat stereotypes, consider these approaches:</p>
        
        <h3>1. Develop a Detailed Backstory</h3>
        
        <p>Even if much of it never appears explicitly in your story, knowing your character's history helps you understand how they would react in different situations. Consider their upbringing, formative experiences, relationships, and pivotal moments that shaped who they are.</p>
        
        <h3>2. Give Them Contradictions</h3>
        
        <p>Real people are full of contradictions, and your characters should be too. A character might be generous with strangers but stingy with family, or brave in physical danger but cowardly in emotional confrontations.</p>
        
        <h3>3. Create Internal and External Conflicts</h3>
        
        <p>External conflicts drive the plot, but internal conflicts reveal character. A protagonist struggling with their own fears, desires, or moral dilemmas adds depth and nuance to your story.</p>
        
        <h2>Character Arcs: The Journey of Growth</h2>
        
        <p>A character arc traces how your protagonist changes from the beginning to the end of the story. This transformation is often what makes a story satisfying and meaningful.</p>
        
        <p>Common character arcs include:</p>
        
        <ul>
          <li><strong>The Hero's Journey:</strong> A character overcomes challenges to become a better or stronger person.</li>
          <li><strong>Redemption Arc:</strong> A flawed or villainous character finds a path to redemption.</li>
          <li><strong>Tragic Arc:</strong> A character's flaws lead to their downfall despite their efforts.</li>
          <li><strong>Flat Arc:</strong> A character remains steadfast in their beliefs and changes the world around them instead.</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>Creating memorable characters is both an art and a science. By giving your protagonists depth, complexity, and room to grow, you create individuals that readers will care about, remember, and want to follow through your story's journey.</p>
      `,
      bg: `
        <p>Добре развитите персонажи са сърцето на всяка завладяваща история. Те са средствата, чрез които читателите изживяват вашия наративен свят, и техните пътешествия често се превръщат в най-запомнящите се аспекти на вашето писане.</p>
        
        <h2>Какво прави един персонаж запомнящ се?</h2>
        
        <p>Запомнящите се персонажи споделят няколко ключови черти:</p>
        
        <ul>
          <li><strong>Сложност:</strong> Те имат както силни страни, така и недостатъци, добродетели и пороци.</li>
          <li><strong>Мотивация:</strong> Те имат ясни желания и цели, които движат техните действия.</li>
          <li><strong>Растеж:</strong> Те се променят и развиват в хода на историята в отговор на събитията.</li>
          <li><strong>Уникалност:</strong> Те имат отличителни черти, навици или перспективи, които ги отличават.</li>
          <li><strong>Релевантност:</strong> Въпреки тяхната уникалност, читателите могат да видят аспекти от себе си или други, които познават, в тези персонажи.</li>
        </ul>
        
        <h2>Създаване на многоизмерни персонажи</h2>
        
        <p>За да създадете персонажи, които се чувстват като истински хора, а не плоски стереотипи, помислете за тези подходи:</p>
        
        <h3>1. Разработете подробна предистория</h3>
        
        <p>Дори ако голяма част от нея никога не се появява изрично във вашата история, познаването на историята на вашия персонаж ви помага да разберете как би реагирал в различни ситуации. Помислете за тяхното възпитание, формиращи преживявания, взаимоотношения и повратни моменти, които са оформили това, което са.</p>
        
        <h3>2. Дайте им противоречия</h3>
        
        <p>Истинските хора са пълни с противоречия, и вашите персонажи също трябва да бъдат. Един персонаж може да бъде щедър с непознати, но стиснат със семейството, или смел при физическа опасност, но страхлив при емоционални конфронтации.</p>
        
        <h3>3. Създайте вътрешни и външни конфликти</h3>
        
        <p>Външните конфликти движат сюжета, но вътрешните конфликти разкриват характера. Протагонист, борещ се със собствените си страхове, желания или морални дилеми, добавя дълбочина и нюанс към вашата история.</p>
        
        <h2>Дъги на персонажите: Пътешествието на растежа</h2>
        
        <p>Дъгата на персонажа проследява как вашият протагонист се променя от началото до края на историята. Тази трансформация често е това, което прави една история удовлетворяваща и смислена.</p>
        
        <p>Общите дъги на персонажите включват:</p>
        
        <ul>
          <li><strong>Пътешествието на героя:</strong> Персонаж преодолява предизвикателства, за да стане по-добър или по-силен човек.</li>
          <li><strong>Дъга на изкуплението:</strong> Несъвършен или злодейски персонаж намира път към изкуплението.</li>
          <li><strong>Трагична дъга:</strong> Недостатъците на персонажа водят до неговия падеж въпреки усилията му.</li>
          <li><strong>Плоска дъга:</strong> Персонаж остава непоколебим в убежденията си и вместо това променя света около себе си.</li>
        </ul>
        
        <h2>Заключение</h2>
        
        <p>Създаването на запомнящи се персонажи е едновременно изкуство и наука. Като давате на вашите протагонисти дълбочина, сложност и пространство за растеж, вие създавате индивиди, за които читателите ще се грижат, ще запомнят и ще искат да следват през пътешествието на вашата история.</p>
      `
    },
    date: "2023-11-02",
    readTime: 10,
    category: {
      en: "Character Design",
      bg: "Дизайн на персонажи"
    },
    image: "/images/blog/character-development.txt",
    author: {
      name: "Elis",
      avatar: "/images/writer-placeholder.jpg"
    }
  }
};

export default function BlogPostPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  
  // Get the blog post data based on the slug
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  // If post doesn't exist, show a not found message
  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">{language === 'en' ? 'Post Not Found' : 'Статията не е намерена'}</h1>
        <p className="text-lg mb-8">
          {language === 'en' 
            ? 'The blog post you are looking for does not exist or has been removed.'
            : 'Статията, която търсите, не съществува или е премахната.'}
        </p>
        <Link href="/blog">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Blog' : 'Обратно към блога'}
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="pl-0 flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Blog' : 'Обратно към блога'}
          </Button>
        </Link>
      </div>
      
      {/* Blog Post Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-green-600" />
          <span className="text-sm text-muted-foreground">
            {post.category[language as keyof typeof post.category]}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {post.title[language as keyof typeof post.title]}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatDate(post.date, language)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.readTime} {language === 'en' ? 'min read' : 'мин. четене'}
            </span>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      <div className="relative rounded-xl overflow-hidden mb-8 bg-green-100">
        <div className="aspect-w-16 aspect-h-9 relative h-[300px] md:h-[400px]">
          <Image 
            src={post.image} 
            alt={post.title[language as keyof typeof post.title] || ''} 
            fill
            className="object-cover"
            onError={(e) => {
              // Hide the image on error
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      {/* Blog Post Content */}
      <article className="prose prose-green dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content[language as keyof typeof post.content] }} />
      </article>
      
      {/* Share Section */}
      <div className="border-t pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-semibold">
            {language === 'en' ? 'Share this article' : 'Споделете тази статия'}
          </h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Related Posts Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          {language === 'en' ? 'You might also like' : 'Може също да харесате'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(blogPosts)
            .filter(([key]) => key !== slug)
            .slice(0, 2)
            .map(([key, relatedPost]) => (
              <Link href={`/blog/${key}`} key={key}>
                <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-green-100">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title[language as keyof typeof relatedPost.title] || ''} 
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Hide the image on error
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        {relatedPost.category[language as keyof typeof relatedPost.category]}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {relatedPost.title[language as keyof typeof relatedPost.title]}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(relatedPost.date, language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {relatedPost.readTime} {language === 'en' ? 'min read' : 'мин. четене'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
} 