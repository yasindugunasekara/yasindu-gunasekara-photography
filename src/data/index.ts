import { Service, PortfolioImage, Award } from '../types';

export const services: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capture your special moments with artistic wedding photography that tells your unique love story.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '💍'
  },
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Professional portraits that showcase your personality and create lasting memories.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '👤'
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description: 'High-quality commercial photography for businesses, products, and corporate events.',
    image: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '🏢'
  },
  {
    id: 'food',
    title: 'Food Photography',
    description: 'Mouth-watering food photography that makes your culinary creations irresistible.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '🍽️'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Photography',
    description: 'Stunning property photography that showcases spaces in their best light.',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '🏠'
  },
  {
    id: 'aerial',
    title: 'Aerial Photography',
    description: 'Breathtaking aerial perspectives that capture the beauty from above.',
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: '🚁'
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

export const awards: Award[] = [
  {
    id: '1',
    title: 'International Photography Awards',
    organization: 'IPA',
    year: '2024',
    image: 'https://images.pexels.com/photos/5912320/pexels-photo-5912320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Winner in Wedding Photography Category'
  },
  {
    id: '2',
    title: 'Sri Lanka Photography Awards',
    organization: 'SLPA',
    year: '2023',
    image: 'https://images.pexels.com/photos/5912320/pexels-photo-5912320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Gold Medal in Portrait Photography'
  },
  {
    id: '3',
    title: 'Wedding Photography Excellence',
    organization: 'WPE',
    year: '2023',
    image: 'https://images.pexels.com/photos/5912320/pexels-photo-5912320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Best Wedding Photographer of the Year'
  },
  {
    id: '4',
    title: 'Commercial Photography Guild',
    organization: 'CPG',
    year: '2022',
    image: 'https://images.pexels.com/photos/5912320/pexels-photo-5912320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Outstanding Commercial Work Recognition'
  }
];