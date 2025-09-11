import { Service, PortfolioImage } from '../types';

export const services: Service[] = [
  
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Professional portraits that showcase your personality and create lasting memories.',
    image: '/dist/assets/service-portfolio-photos/DSC09899-2.JPG'
  },
  {
    id: 'event',
    title: 'Event Photography',
    description: 'Dynamic event photography that captures the energy and emotion of your special occasions.',
    image: '/dist/assets/heroPhoto/photo9.jpg'
  },
  {
    id: 'landscape',
    title: 'Landscape Photography',
    description: 'Stunning landscape photography that captures the beauty of nature.',
    image: 'dist/assets/heroPhoto/photo8.jpg'
  },
  {
    id: 'architectural',
    title: 'Architectural Photography',
    description: 'Stunning architectural photography that showcases spaces in their best light.',
    image: 'dist/assets/service-portfolio-photos/DSC09763.jpg'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Photography',
    description: 'Breathtaking wildlife photography that captures the beauty of animals in their natural habitat.',
    image: '/dist/assets/service-portfolio-photos/DSC07976.jpg'
  },
  {
    id: 'street',
    title: 'Street Photography',
    description: 'Captivating street photography that tells the stories of urban life and culture.',
    image: 'dist/assets/service-portfolio-photos/DSC07117.jpg'
  }
  ,
  {
    id: 'astro',
    title: 'Astro Photography',
    description: 'Mesmerizing astro photography capturing the wonders of the night sky and celestial events.',
    image: '/dist/assets/service-portfolio-photos/DSC07834.jpg'
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
  {
    id: '7',
    src: '/dist/assets/service-portfolio-photos/DSC07834.jpg',
    alt: 'Astro Photography',
    category: 'astro'
  }
 
];
