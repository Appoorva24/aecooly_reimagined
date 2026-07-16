import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  structuredData?: object;
  image?: string;
}

export function useSEO({ title, description, url, structuredData, image = 'https://aecooly.com/og-image.jpg' }: SEOProps) {
  useEffect(() => {
    // 1. Update Title Tag
    document.title = title;

    // 2. Update or Create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // 4. Open Graph Tags
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    setOGTag('og:title', title);
    setOGTag('og:description', description);
    setOGTag('og:url', url);
    setOGTag('og:image', image);
    setOGTag('og:type', 'website');
    setOGTag('og:site_name', 'Aecooly');

    // 5. Twitter Card Tags
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', title);
    setTwitterTag('twitter:description', description);
    setTwitterTag('twitter:image', image);

    // 6. JSON-LD Structured Data
    if (structuredData) {
      let script = document.querySelector('#seo-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', 'seo-json-ld');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup JSON-LD on unmount to prevent duplicate schemas across routes
    return () => {
      const script = document.querySelector('#seo-json-ld');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, url, structuredData, image]);
}
