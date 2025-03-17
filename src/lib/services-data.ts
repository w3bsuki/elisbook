import { Service } from '@/types';

// Services data for the "Осъзнато хранене" book
export const services: Service[] = [
  // Individual Services
  {
    id: 'service-1',
    title: 'Персонализирана Консултация',
    description: 'Лична среща (онлайн или на живо) с автора, където клиентът получава индивидуално внимание и съвети, съобразени с неговите специфични нужди и цели.',
    duration: '45 минути',
    price: 80.00,
    category: 'individual',
    coverImage: '/images/services/consultation.jpg',
    featured: true,
    relatedBookId: '1', // ID of "Осъзнато хранене" book
  },
  {
    id: 'service-2',
    title: 'План за Хранене',
    description: 'Специализиран план за хранене, разработен въз основа на индивидуалните предпочитания, алергии и здравословни цели на клиента.',
    duration: '7 дни',
    price: 120.00,
    category: 'individual',
    coverImage: '/images/services/meal-plan.jpg',
    featured: true,
    relatedBookId: '1',
  },
  {
    id: 'service-3',
    title: 'Мотивационен Коучинг',
    description: 'Серия от мотивационни сесии, които помагат на клиента да остане фокусиран върху своите цели и да преодолее препятствията по пътя към здравословен начин на живот.',
    duration: '4 седмици (веднъж седмично)',
    price: 250.00,
    category: 'individual',
    coverImage: '/images/services/coaching.jpg',
    featured: false,
    relatedBookId: '1',
  },
  
  // Package Services
  {
    id: 'package-1',
    title: 'Основен Пакет "Осъзнат Старт"',
    description: 'Цялостен подход към осъзнатото хранене за новобранците.',
    duration: 'Еднократно',
    price: 150.00,
    category: 'package',
    coverImage: '/images/services/basic-package.jpg',
    featured: true,
    includes: [
      'Копие на книгата "Осъзнато Хранене - Яж и Отслабвай с Удоволствие"',
      'Персонализирана консултация (60 минути)',
      'План за хранене за 7 дни'
    ],
    relatedBookId: '1',
  },
  {
    id: 'package-2',
    title: 'Среден Пакет "Осъзната трансформация"',
    description: 'По-задълбочено ниво на подкрепа и ресурси за тези, които искат да видят по-бързи резултати.',
    duration: '2 седмици',
    price: 280.00,
    category: 'package',
    coverImage: '/images/services/medium-package.jpg',
    featured: true,
    includes: [
      'Копие на книгата "Осъзнато Хранене - Яж и Отслабвай с Удоволствие"',
      'Две персонализирани консултации (всяка по 60 минути)',
      'План за хранене за 14 дни',
      'Достъп до ексклузивни онлайн ресурси и видеа'
    ],
    relatedBookId: '1',
  },
  {
    id: 'package-3',
    title: 'Премиум Пакет "Личен Треньор за осъзнато хранене"',
    description: 'Максимално ниво на подкрепа и персонализация за клиентите, които търсят интензивна трансформация.',
    duration: '1 месец',
    price: 450.00,
    category: 'package',
    coverImage: '/images/services/premium-package.jpg',
    featured: true,
    includes: [
      'Копие на книгата "Осъзнато Хранене - Яж и Отслабвай с Удоволствие"',
      'Копие на книгата Топ рецепти за топ форма',
      'Четири персонализирани консултации (всяка по 60 минути)',
      'План за хранене за 30 дни',
      'Достъп до всички онлайн ресурси и видеа',
      'Личен треньор за мотивация и подкрепа през целия период'
    ],
    relatedBookId: '1',
  },
];

// Helper function to filter services by category
export const filterServicesByCategory = (services: Service[], category: string): Service[] => {
  if (category === 'all') return services;
  
  return services.filter(service => service.category === category);
};

// Helper function to filter services by related book
export const filterServicesByBook = (services: Service[], bookId: string): Service[] => {
  return services.filter(service => service.relatedBookId === bookId);
};

// Helper function to sort services
export const sortServices = (services: Service[], sortBy: string): Service[] => {
  const sortedServices = [...services];
  
  switch (sortBy) {
    case 'price-low':
      return sortedServices.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedServices.sort((a, b) => b.price - a.price);
    case 'featured':
      return sortedServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sortedServices;
  }
};

// Helper function to search services
export const searchServices = (services: Service[], searchTerm: string): Service[] => {
  if (!searchTerm) return services;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return services.filter(service => 
    service.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    service.description.toLowerCase().includes(lowerCaseSearchTerm)
  );
}; 