import { Link } from 'react-router-dom';
import { type Product } from '../context/CartContext';
import styles from './ProductCard.module.css';

export function ProductCard({ product }: { product: Product }) {
  const price = product.variants && product.variants.length > 0 
    ? parseFloat(product.variants[0].price).toFixed(2) 
    : "0.00";
    
  const imageSrc = product.images && product.images.length > 0 
    ? product.images[0].src 
    : "https://via.placeholder.com/300";

  return (
    <Link to={`/products/${product.handle}`} className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img src={imageSrc} alt={product.title} className={styles.productImage} loading="lazy" />
        {product.tags.includes('Best Seller') && (
          <div className={styles.productTag}>Best Seller</div>
        )}
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{product.product_type || "Gear"}</span>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div className={styles.productFooter}>
          <div className={styles.productPrice}>${price}</div>
          <div className={styles.viewDetailsBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
