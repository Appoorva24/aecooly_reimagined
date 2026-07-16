import { Blog } from '../components/Blog';
import { useSEO } from '../hooks/useSEO';

export function BlogPage() {
  useSEO({
    title: 'Outdoor Misting Fan Tips & Cooling Guides | Aecooly Blog',
    description: 'Read the Aecooly blog for tips on staying cool. Discover the benefits of an outdoor misting fan and premium portable cooling products at affordable prices.',
    url: 'https://aecooly.com/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'Aecooly Blog',
      'url': 'https://aecooly.com/blog',
      'description': 'Guides to Outdoor Misting Fans & Portable Cooling',
      'publisher': {
        '@type': 'Organization',
        'name': 'Aecooly'
      },
      'blogPost': [
        {
          '@type': 'BlogPosting',
          'headline': 'The Future of Portable Cooling Technology',
          'image': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
          'datePublished': '2026-08-15',
          'author': { '@type': 'Organization', 'name': 'Aecooly' }
        },
        {
          '@type': 'BlogPosting',
          'headline': '5 Essentials for Your Next Summer Adventure',
          'image': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
          'datePublished': '2026-08-02',
          'author': { '@type': 'Organization', 'name': 'Aecooly' }
        },
        {
          '@type': 'BlogPosting',
          'headline': 'Office Aesthetics: Keeping Cool at Your Desk',
          'image': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
          'datePublished': '2026-07-28',
          'author': { '@type': 'Organization', 'name': 'Aecooly' }
        }
      ]
    }
  });

  return (
    <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
      {/* Hidden H1 for SEO, since the Blog component uses H2 for visual design to preserve UI */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Aecooly Blog: Guides to Outdoor Misting Fans & Cooling
      </h1>
      <Blog />
    </main>
  );
}
