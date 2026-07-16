import { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { type Product } from '../context/CartContext';
import styles from './FeaturedCollection.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function FeaturedCollection({ products, title = "Featured Collection" }: { products: Product[], title?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section className={styles.featuredSection} ref={sectionRef}>
      <div className={`${styles.sectionHeader} reveal`}>
        <h2>{title}</h2>
      </div>
      
      <div className={`${styles.sliderContainer} reveal`} style={{ transitionDelay: '0.1s' }}>
        <div className={styles.slider}>
          {products.map((product) => (
            <div key={product.id} className={styles.slideItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
