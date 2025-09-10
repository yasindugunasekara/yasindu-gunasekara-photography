import { Service, PortfolioImage } from '../types';

export const services: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capture your special moments with artistic wedding photography that tells your unique love story.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Professional portraits that showcase your personality and create lasting memories.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description: 'High-quality commercial photography for businesses, products, and corporate events.',
    image: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'food',
    title: 'Food Photography',
    description: 'Mouth-watering food photography that makes your culinary creations irresistible.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Photography',
    description: 'Stunning property photography that showcases spaces in their best light.',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'aerial',
    title: 'Aerial Photography',
    description: 'Breathtaking aerial perspectives that capture the beauty from above.',
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const portfolioImages: PortfolioImage[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Wedding Photography',
    category: 'wedding'
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Portrait Photography',
    category: 'portrait'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Food Photography',
    category: 'food'
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Real Estate Photography',
    category: 'real-estate'
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Aerial Photography',
    category: 'aerial'
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Commercial Photography',
    category: 'commercial'
  },
  {
    id: '7',
    src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Wedding Portrait',
    category: 'wedding'
  },
  {
    id: '8',
    src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Fashion Portrait',
    category: 'portrait'
  },
  {
    id: '9',
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    alt: 'Food Styling',
    category: 'food'
  }
];
