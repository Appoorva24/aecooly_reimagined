import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import productsData from '../products.json';
import { type Product } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';

export function Collection() {
  const { id } = useParams<{ id: string }>();
  const products = (productsData as any)?.products || [];

  const filteredProducts = useMemo(() => {
    let result = [];
    if (!id || id === 'all') {
      // Show all real fan products — exclude CamperKit accessories and other non-fan items
      result = products.filter((p: any) => {
        const t = p.title.toLowerCase();
        return (
          !t.includes('camperkit') &&
          !t.includes('smart controller') &&
          !t.includes('screwdriver') &&
          !t.includes('storage bag') &&
          !t.includes('hydration device') &&
          !t.includes('adventure kit') &&
          p.title !== 'CamperKit'
        );
      });
    } else {
      result = products.filter((p: any) => {
        const t = p.title.toLowerCase();
        const isCapy = t.includes('capy');
        
        // Always exclude CamperKit accessories
        if (
          t.includes('camperkit') ||
          t.includes('smart controller') ||
          t.includes('screwdriver') ||
          t.includes('storage bag')
        ) return false;

        switch (id) {
          case 'handheld':
            // Must be a handheld/portable fan. Allow Capy Lulu specifically if it's the handheld gimbal version.
            if (isCapy) {
              return t.includes('handheld') || t.includes('gimbal');
            }
            return !t.includes('neck') &&
              !t.includes('misting') &&
              !/\btable\s+fan/i.test(p.title) &&
              !/\btower\s+fan/i.test(p.title) &&
              (
                /\bhandheld\b/i.test(p.title) ||
                /\baero\b/i.test(p.title) ||
                /\bhalo\b/i.test(p.title) ||
                /\bpocket\b/i.test(p.title) ||
                t.includes('air mate') ||
                t.includes('phone fan') ||
                t.includes('air gimbal') ||
                t.includes('flow')
              );

          case 'table':
            // "table fan" or "tower fan" — avoid matching "portable"
            return !isCapy && (/\btable\s+fan/i.test(p.title) || /\btower\s+fan/i.test(p.title));

          case 'neck':
            // All neck fans (includes click series)
            return !isCapy && t.includes('neck');

          case 'clip':
            // Clip-on fans — neck fans where title has 'clip'
            return !isCapy && t.includes('neck') && t.includes('clip');

          case 'misting':
            // Misting / cold air fans
            return !isCapy && t.includes('misting');

          // Lifestyle/use-case categories
          case 'college':
            return !isCapy && (t.includes('handheld') || t.includes('neck') || t.includes('halo') || t.includes('aero') || t.includes('pocket') || t.includes('air mate'));

          case 'travel':
            return !isCapy && (t.includes('tower') || t.includes('table') || t.includes('gimbal'));

          case 'adults':
            return !isCapy && (t.includes('table') || t.includes('tower'));

          case 'children':
            return t.includes('neck') || isCapy;

          case 'unique':
            return !isCapy && (t.includes('misting') || t.includes('mirror') || t.includes('flow') || t.includes('hydration'));

          default:
            return false;
        }
      });
    }

    // Sort so that the Capy Lulu handheld device is always at the very beginning of the array
    result.sort((a, b) => {
      const aIsCapyHandheld = a.title.toLowerCase().includes('capy') && (a.title.toLowerCase().includes('handheld') || a.title.toLowerCase().includes('gimbal'));
      const bIsCapyHandheld = b.title.toLowerCase().includes('capy') && (b.title.toLowerCase().includes('handheld') || b.title.toLowerCase().includes('gimbal'));
      
      if (aIsCapyHandheld && !bIsCapyHandheld) return -1;
      if (!aIsCapyHandheld && bIsCapyHandheld) return 1;
      return 0;
    });

    return result;
  }, [products, id]);

  const categoryTitles: Record<string, string> = {
    all: 'All Products',
    handheld: 'Handheld Fans',
    table: 'Table & Tower Fans',
    neck: 'Neck Fans',
    clip: 'Clip-On Fans',
    misting: 'Misting Fans',
    college: 'For College Students',
    travel: 'Camping Portable Fans & Travel Collection',
    adults: 'Working Adults',
    children: 'For Children',
    unique: 'Special & Unique',
  };

  const title = id === 'all' || !id 
    ? 'Shop All Portable Fans & Accessories | Aecooly'
    : id === 'travel' 
      ? 'Camping Portable Fans & Outdoor Cooling | Aecooly'
      : `${categoryTitles[id]} | Aecooly`;
    
  const desc = id === 'travel'
    ? 'Explore our travel collection of camping portable fans and outdoor misting fans. Premium portable cooling solutions at affordable prices for your next trip.'
    : `Shop the ${categoryTitles[id || 'all'] || 'Collection'} at Aecooly. Premium portable cooling solutions at affordable prices.`;

  useSEO({
    title,
    description: desc,
    url: `https://aecooly.com/collection/${id || 'all'}`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aecooly.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': categoryTitles[id || 'all'] || 'Collection', 'item': `https://aecooly.com/collection/${id || 'all'}` }
      ]
    }
  });

  return (
    <main style={{ paddingTop: '80px', minHeight: '80vh' }}>

      <ProductGrid
        products={filteredProducts as unknown as Product[]}
        categoryTitle={categoryTitles[id || 'all'] || 'Collection'}
        asH1={true}
      />
    </main>
  );
}
