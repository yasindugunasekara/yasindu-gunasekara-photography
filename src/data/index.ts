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
    src: 'dist/assets/highlightShots/tharushiShoot/DSC00192.jpg',
    alt: 'Birthday Photography',
    category: 'portrait'
  },
  {
    id: '2',
    src: 'dist/assets/highlightShots/vishmiShoot/1.jpg',
    alt: 'Tamil vibe Photography',
    category: 'portrait'
  },
  {
    id: '3',
    src: 'dist/assets/highlightShots/gampahaAkkaShoot/DSC09983-2.jpg',
    alt: 'Anniversary Photography',
    category: 'portrait'
  },
  {
    id: '4',
    src: 'dist/assets/highlightShots/landscape/DSC07870.jpg',
    alt: 'Beach Photography',
    category: 'landscape'
  },
  {
    id: '5',
    src: 'dist/assets/highlightShots/wildlifeShoot/DSC07257.jpg',
    alt: 'Wildlife Photography',
    category: 'wildlife'
  },
  {
    id: '6',
    src: 'dist/assets/highlightShots/streetShoot/street.jpg',
    alt: 'Street Photography',
    category: 'street'
  },
  {
    id: '7',
    src: '/dist/assets/service-portfolio-photos/DSC07834.jpg',
    alt: 'Astro Photography',
    category: 'astro'
  },
  {
    id: '8',
    src: 'dist/assets/highlightShots/wildlifeShoot/DSC07976.jpg',
    alt: 'Wildlife Photography',
    category: 'wildlife'
  },
  {
    id: '9',
    src: 'dist/assets/highlightShots/uomShoot/DSC09751.jpg',
    alt: 'University of Moratuwa Photography',
    category: 'landscape'
  }

];
