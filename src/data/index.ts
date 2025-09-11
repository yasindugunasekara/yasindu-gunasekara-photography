import { Service, PortfolioImage } from '../types';

export const services: Service[] = [
  
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Professional portraits that showcase your personality and create lasting memories.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'event',
    title: 'Event Photography',
    description: 'Dynamic event photography that captures the energy and emotion of your special occasions.',
    image: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'landscape',
    title: 'Landscape Photography',
    description: 'Stunning landscape photography that captures the beauty of nature.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'architectural',
    title: 'Architectural Photography',
    description: 'Stunning architectural photography that showcases spaces in their best light.',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Photography',
    description: 'Breathtaking wildlife photography that captures the beauty of animals in their natural habitat.',
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'street',
    title: 'Street Photography',
    description: 'Captivating street photography that tells the stories of urban life and culture.',
    image: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const portfolioImages: PortfolioImage[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Portrait Photography',
    category: 'portrait'
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Event Photography',
    category: 'event'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Landscape Photography',
    category: 'landscape'
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Architectural Photography',
    category: 'architectural'
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Wildlife Photography',
    category: 'wildlife'
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Street Photography',
    category: 'street'
  },
 
];
