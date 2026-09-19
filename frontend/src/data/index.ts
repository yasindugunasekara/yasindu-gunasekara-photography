import { Service, PortfolioImage } from '../types';

export const services: Service[] = [
  
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Professional portraits that showcase your personality and create lasting memories.',
    image: '/assets/service-portfolio-photos/DSC09899-2.jpg'
  },
  {
    id: 'event',
    title: 'Event Photography',
    description: 'Dynamic event photography that captures the energy and emotion of your special occasions.',
    image: '/assets/heroPhoto/photo9.jpg'
  },
  {
    id: 'landscape',
    title: 'Landscape Photography',
    description: 'Stunning landscape photography that captures the beauty of nature.',
    image: '/assets/heroPhoto/photo8.jpg'
  },
  {
    id: 'architectural',
    title: 'Architectural Photography',
    description: 'Stunning architectural photography that showcases spaces in their best light.',
    image: '/assets/service-portfolio-photos/DSC09763.jpg'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Photography',
    description: 'Breathtaking wildlife photography that captures the beauty of animals in their natural habitat.',
    image: '/assets/service-portfolio-photos/DSC07976.jpg'
  },
  {
    id: 'street',
    title: 'Street Photography',
    description: 'Captivating street photography that tells the stories of urban life and culture.',
    image: '/assets/service-portfolio-photos/DSC07117.jpg'
  },
  {
    id: 'astro',
    title: 'Astro Photography',
    description: 'Mesmerizing astro photography capturing the wonders of the night sky and celestial events.',
    image: '/assets/service-portfolio-photos/DSC07834.jpg'
  }
];

// Hardcoded albums removed as they are now fetched exclusively from the MongoDB database



