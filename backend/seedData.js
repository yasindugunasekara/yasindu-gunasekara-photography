require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Album = require('./models/Album');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yasindu_photography';

const initialCategories = [
  { id: "all", label: "All" },
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "wildlife", label: "Wildlife" },
  { id: "street", label: "Street" },
  { id: "astro", label: "Astro" },
  { id: "event", label: "Event" },
  { id: "architectural", label: "Architectural" },
  { id: "birthday", label: "Birthday" }
];

const portfolioImages = [
  {
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
    alt:'Anniversary Photography',
    category:'portrait',
    images: [
      { id: 1, src: "/assets/highlightShots/gampahaAkkaShoot/3 .jpg" },
      { id: 2, src: "/assets/highlightShots/gampahaAkkaShoot/4..jpg" },
      { id: 3, src: "/assets/highlightShots/gampahaAkkaShoot/5.jpg" },
      { id: 4, src: "/assets/highlightShots/gampahaAkkaShoot/9.jpg" },
      { id: 5, src: "/assets/highlightShots/gampahaAkkaShoot/13.jpg" },
      { id: 6, src: "/assets/highlightShots/gampahaAkkaShoot/DSC09973.jpg" },
      { id: 7, src: "/assets/highlightShots/gampahaAkkaShoot/DSC09984-2.jpg" }
    ]
  },
  {
    alt:'Wildlife Photography',
    category:'wildlife',
    images: [
      { id: 1, src: "/assets/highlightShots/wildlifeShoot/DSC07257.jpg" },
      { id: 2, src: "/assets/service-portfolio-photos/DSC07976.jpg" },
    ]
  },
  {
    alt:'University Of Moratuwa Photography',
    category:'architectural',
    images: [
      { id: 1, src: "/assets/highlightShots/uomShoot/DSC09751.jpg" },
      { id: 2, src: "/assets/service-portfolio-photos/DSC09763.jpg" }
    ]
  },
  {
    alt:'Street Photography',
    category:'street',
    images: [
      { id: 1, src: "/assets/service-portfolio-photos/DSC07117.jpg" }
    ]
  },
  {
    alt:'Astro Photography',
    category:'astro',
    images: [
      { id: 1, src: "/assets/service-portfolio-photos/DSC07834.jpg" }
    ]
  },
  {
    alt:'Model Photography',
    category:'portrait',
    images: [
      { id: 1, src: "/assets/highlightShots/modelShoot/LSC09026.jpg" }
    ]
  },
  {
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
    alt: 'Portrait Photography',
    category:'portrait',
    images: [
      { id: 1, src:"/assets/highlightShots/baby.jpg" }
    ]
  },
  {
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
];

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Seed Categories
    const existingCategories = await Category.countDocuments();
    if (existingCategories === 0) {
      await Category.insertMany(initialCategories);
      console.log('✅ Successfully seeded initial categories!');
    } else {
      console.log('Categories already seeded. Skipping.');
    }

    // 2. Seed Albums
    const existingAlbums = await Album.countDocuments();
    if (existingAlbums === 0) {
      await Album.insertMany(portfolioImages);
      console.log('✅ Successfully seeded initial albums!');
    } else {
      console.log('Albums already seeded. Skipping.');
    }

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
