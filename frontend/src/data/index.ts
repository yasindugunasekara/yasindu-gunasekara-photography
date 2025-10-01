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

// Portfolio images data
export const portfolioImages: PortfolioImage[] = [
  {
    id: '1',
    alt: 'Birthday Photography',
    category: 'birthday',
    images: [
      { id: 1, src: "/assets/highlightShots/tharushiShoot/DSC00192 - Copy.jpg" },
      { id: 2, src: "/assets/highlightShots/tharushiShoot/DSC00176.jpg" },
      { id: 3, src: "/assets/highlightShots/tharushiShoot/DSC00286-2.jpg" },
      { id: 4, src: "/assets/highlightShots/tharushiShoot/DSC00301.jpg" },
      { id: 5, src: "/assets/highlightShots/tharushiShoot/DSC00178.jpg" },
      { id: 6, src: "/assets/highlightShots/tharushiShoot/DSC00190.jpg" },
      { id: 7, src: "/assets/highlightShots/tharushiShoot/DSC00186 - Copy.jpg" }
    ]
  },
  {
    id:2,
    alt:'Tamil vibe Photography',
    category:'portrait',
    images: [
      { id: 3, src: "/assets/highlightShots/vishmiShoot/5.jpg" },
      { id: 1, src: "/assets/highlightShots/vishmiShoot/1.jpg" },
      { id: 2, src: "/assets/highlightShots/vishmiShoot/4.jpg" },

      { id: 4, src: "/assets/highlightShots/vishmiShoot/6.jpg" },
      { id: 5, src: "/assets/highlightShots/vishmiShoot/9.jpg" },
      { id: 6, src: "/assets/highlightShots/vishmiShoot/13.jpg" }
    ]
  },
  {
    id:3,
    alt:'Anniversary Photography',
    category:'portrait',
    images: [
      { id: 1, src: "/assets/highlightShots/gampahaAkkaShoot/3 .jpg" }
      ,
        { id: 2, src: "/assets/highlightShots/gampahaAkkaShoot/4..jpg" },
        { id: 3, src: "/assets/highlightShots/gampahaAkkaShoot/5.jpg" },
        { id: 4, src: "/assets/highlightShots/gampahaAkkaShoot/9.jpg" },
        { id: 5, src: "/assets/highlightShots/gampahaAkkaShoot/13.jpg" },
        { id: 6, src: "/assets/highlightShots/gampahaAkkaShoot/DSC09973.jpg" },
        { id: 7, src: "/assets/highlightShots/gampahaAkkaShoot/DSC09984-2.jpg" }
    ]
  },
  {
    id:4,
    alt:'Wildlife Photography',
    category:'wildlife',
    images: [
      { id: 1, src: "/assets/highlightShots/wildlifeShoot/DSC07257.jpg" },
      { id: 2, src: "/assets/service-portfolio-photos/DSC07976.jpg" },
    ]
    },
    
    {
    id:6,
    alt:'University Of Moratuwa Photography',
    category:'architectural',
    images: [
      { id: 1, src: "/assets/highlightShots/uomShoot/DSC09751.jpg" },
      { id: 2, src: "/assets/service-portfolio-photos/DSC09763.jpg" }
    ]
    },
    {
    id:7,
    alt:'Street Photography',
    category:'street',
    images: [
      { id: 1, src: "/assets/service-portfolio-photos/DSC07117.jpg" }]
    },
    {
    id:8,
    alt:'Astro Photography',
    category:'astro',
    images: [
      { id: 1, src: "/assets/service-portfolio-photos/DSC07834.jpg" }]
    },
    {
    id:9,
    alt:'Model Photography',
    category:'portrait',
    images: [
      { id: 1, src: "/assets/highlightShots/modelShoot/LSC09026.jpg" }]
    },
    {
    id:10,
    alt:'Event Photography',
    category:'event',
    images: [
      { id: 1, src: "/assets/heroPhoto/photo9.jpg" },
      {id: 2, src: "/assets/highlightShots/eventShoot/1.jpg"},
      {id: 3, src: "/assets/highlightShots/eventShoot/2.jpg"},
      {id: 4, src: "/assets/highlightShots/eventShoot/3.jpg"},
      {id: 5, src: "/assets/highlightShots/eventShoot/4.jpg"},
      {id: 6, src: "/assets/highlightShots/eventShoot/5.jpg"},
      {id: 7, src: "/assets/highlightShots/eventShoot/6.jpg"},
      {id: 8, src: "/assets/highlightShots/eventShoot/7.jpg"},
    ]
    },
    {
    id:11,
    alt: 'Portrait Photography',
    category:'portrait',
    images: [
      { id: 1, src:"/assets/highlightShots/baby.jpg" }
    ]
    },
    {
    id:12,
    alt: 'Event Photography',
    category:'Event',
    images: [
      { id: 1, src:"/assets/highlightShots/bloodDonationShoot/2.JPG" },
      { id: 2, src:"/assets/highlightShots/bloodDonationShoot/1.JPG" },
      { id: 3, src:"/assets/highlightShots/bloodDonationShoot/3.JPG" },
      { id: 4, src:"/assets/highlightShots/bloodDonationShoot/11.JPG" },
      { id: 5, src:"/assets/highlightShots/bloodDonationShoot/6.JPG" },
      { id: 6, src:"/assets/highlightShots/bloodDonationShoot/5.JPG" },
      { id: 7, src:"/assets/highlightShots/bloodDonationShoot/7.JPG" },
      { id: 8, src:"/assets/highlightShots/bloodDonationShoot/8.JPG" },
      { id: 9, src:"/assets/highlightShots/bloodDonationShoot/9.JPG" },
      { id: 10, src:"/assets/highlightShots/bloodDonationShoot/10.JPG" }
    ]
    },
  {
      id:13,
      alt: 'Portrait Photography',
      category:'portrait',
      images: [
        { id: 1, src:"/assets/highlightShots/siyumiShoot/reduced_2.JPG" },
        { id: 2, src:"/assets/highlightShots/siyumiShoot/reduced_1.JPG" },
        { id: 3, src:"/assets/highlightShots/siyumiShoot/reduced_3.JPG" },
        { id: 4, src:"/assets/highlightShots/siyumiShoot/reduced_4.JPG" },
        { id: 5, src:"/assets/highlightShots/siyumiShoot/reduced_5.JPG" },
        { id: 6, src:"/assets/highlightShots/siyumiShoot/reduced_6.JPG" },
        { id: 7, src:"/assets/highlightShots/siyumiShoot/reduced_7.JPG" },
        { id: 8, src:"/assets/highlightShots/siyumiShoot/reduced_8.JPG" },
        { id: 9, src:"/assets/highlightShots/siyumiShoot/reduced_9.JPG" },
        { id: 10, src:"/assets/highlightShots/siyumiShoot/reduced_10.JPG" }
      ]
    }
  
  ]



