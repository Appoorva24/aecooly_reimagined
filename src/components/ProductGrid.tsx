import { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { type Product } from '../context/CartContext';
import styles from './ProductGrid.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProductGridProps {
  products: Product[];
  categoryTitle?: string;
  asH1?: boolean;
}

export function ProductGrid({ products, categoryTitle, asH1 = false }: ProductGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const TitleTag = asH1 ? 'h1' : 'h2';

  return (
    <section className={styles.productsSection} id="products" ref={sectionRef}>
      <div className={`${styles.sectionHeader} reveal`}>
        <TitleTag>{categoryTitle || "Featured Gear"}</TitleTag>
        <p>Engineered for performance and designed with a minimalist aesthetic. Upgrade your outdoor experience with our complete collection.</p>
      </div>
      
      <div className={styles.productsGrid}>
        {products.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>No products found for this category.</p>
        ) : (
          products.map((product, index) => (
            <div key={product.id} className="reveal" style={{ transitionDelay: `${(index % 4) * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
