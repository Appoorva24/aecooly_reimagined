import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import styles from './ProductDetail.module.css';
import productsData from '../products.json';
import { useSEO } from '../hooks/useSEO';

export function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (productsData && Array.isArray(productsData.products)) {
      const found = productsData.products.find(p => p.handle === handle);
      if (found) {
        setProduct(found);
        setActiveImage(found.images?.[0]?.src || "https://via.placeholder.com/600");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [handle]);

  const price = product?.variants && product.variants.length > 0 
    ? parseFloat(product.variants[0].price).toFixed(2) 
    : "0.00";

  const comparePrice = product?.variants && product.variants.length > 0 && product.variants[0].compare_at_price
    ? parseFloat(product.variants[0].compare_at_price).toFixed(2)
    : null;

  useSEO({
    title: product ? `${product.title} | Premium Portable Fans | Aecooly` : 'Loading...',
    description: product ? `Shop the ${product.title} by Aecooly. Premium portable cooling solutions at affordable prices.` : '',
    url: product ? `https://aecooly.com/products/${product.handle}` : '',
    image: product?.images?.[0]?.src,
    structuredData: product ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          'name': product.title,
          'image': product.images?.map((i: any) => i.src) || [],
          'description': `Shop the ${product.title} by Aecooly.`,
          'sku': product.id.toString(),
          'brand': { '@type': 'Brand', 'name': 'Aecooly' },
          'offers': {
            '@type': 'Offer',
            'url': `https://aecooly.com/products/${product.handle}`,
            'priceCurrency': 'USD',
            'price': price,
            'availability': 'https://schema.org/InStock',
            'itemCondition': 'https://schema.org/NewCondition'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aecooly.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'All Products', 'item': 'https://aecooly.com/collection/all' },
            { '@type': 'ListItem', 'position': 3, 'name': product.title, 'item': `https://aecooly.com/products/${product.handle}` }
          ]
        }
      ]
    } : undefined
  });

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className={styles.wrapper}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbInner}>
          <Link to="/">Home</Link>
          <span className={styles.sep}>›</span>
          <Link to="/collection/all">All Products</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.current}>{product.title}</span>
        </div>
      </div>

      <div className={styles.container}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images?.slice(0, 6).map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumb} ${activeImage === img.src ? styles.thumbActive : ''}`}
                onClick={() => setActiveImage(img.src)}
              >
                <img src={img.src} alt={`View ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={activeImage} alt={product.title} />
            {product.tags.includes('Best Seller') && (
              <div className={styles.badge}>Best Seller</div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        <div className={styles.details}>
          <span className={styles.category}>{product.product_type || 'Gear'}</span>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>${price}</span>
            {comparePrice && (
              <span className={styles.comparePrice}>${comparePrice}</span>
            )}
          </div>

          {/* Variants / Color */}
          {product.variants && product.variants.length > 1 && (
            <div className={styles.variantSection}>
              <p className={styles.variantLabel}>Options</p>
              <div className={styles.variantList}>
                {product.variants.map((v, i) => (
                  <button key={i} className={`${styles.variantBtn} ${i === 0 ? styles.variantActive : ''}`}>
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className={styles.ctaRow}>
            <button
              className={`${styles.addBtn} ${isAdded ? styles.addedBtn : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <button className={styles.wishBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <span>Free Shipping on ₹999+</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>1 Year Warranty</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              <span>Easy 30-Day Returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'specs' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'description' && (
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.body_html }} />
            )}
            {activeTab === 'specs' && (
              <div className={styles.specs}>
                <div className={styles.specRow}><span>Brand</span><span>Aecooly</span></div>
                <div className={styles.specRow}><span>Type</span><span>{product.product_type}</span></div>
                <div className={styles.specRow}><span>SKU</span><span>{product.variants?.[0]?.sku || '—'}</span></div>
                {product.variants?.length > 1 && <div className={styles.specRow}><span>Variants</span><span>{product.variants.length} options</span></div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
