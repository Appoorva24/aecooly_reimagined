import { Hero } from '../components/Hero';
import { CategoryScenes } from '../components/CategoryScenes';

import { FeaturedCollection } from '../components/FeaturedCollection';
import { CommunityBanner } from '../components/CommunityBanner';
import { Blog } from '../components/Blog';
import productsData from '../products.json';
import { type Product } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';

export function Home() {
  useSEO({
    title: 'Aecooly® | Innovative Portable Fans & Outdoor Camping Tools',
    description: 'Premium portable cooling solutions at affordable prices. Shop Aecooly for high-quality fans designed for everyday comfort, travel, office, study, and outdoors.',
    url: 'https://aecooly.com',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Aecooly',
      'url': 'https://aecooly.com',
      'logo': 'https://aecooly.com/logo.png',
      'description': 'Premium Portable Cooling Solutions at Affordable Prices.',
      'sameAs': [
        'https://www.facebook.com/aecooly',
        'https://x.com/aecoolyofficial',
        'https://www.instagram.com/aecooly.official/',
        'https://www.youtube.com/@Aecooly',
        'https://www.tiktok.com/@aecooly.official'
      ]
    }
  });

  const featuredKeywords = [
    'Air Mate',
    'Chic',
    'Tower',
    'Halo',
    'Pocket',
    'Aero',
    'Flow 9000'
  ];
  
  const sliderProducts = featuredKeywords.map(keyword => 
    productsData?.products?.find(p => p.title.includes(keyword))
  ).filter(Boolean) as unknown as Product[];



  return (
    <main>
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Aecooly: Innovative Portable Fans & Outdoor Camping Tools
      </h1>
      <Hero />
      <FeaturedCollection products={sliderProducts} title="Featured Collection" />
      <CategoryScenes />

      <CommunityBanner />
      <Blog />
    </main>
  );
}
