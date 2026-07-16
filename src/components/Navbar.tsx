import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { toggleCart, itemCount } = useCart();
  const location = useLocation();
  
  const currentPath = location.pathname + location.hash;

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>Ae<span>cooly</span></Link>
        
        <nav className={styles.navLinks}>
          <Link to="/" className={currentPath === '/' ? styles.active : ''}>Home</Link>
          <a href="/#collections" className={currentPath === '/#collections' ? styles.active : ''}>Collections</a>
          <div className={styles.dropdown}>
            <Link to="/collection/all" className={`${currentPath.includes('/collection/') ? styles.active : ''} ${styles.shopLink}`}>
              Shop
              <span className={styles.dropdownArrow}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </Link>
            <div className={styles.dropdownMenu}>
              <Link to="/collection/all" className={styles.dropdownItem}>All Products</Link>
              <div className={styles.dropdownDivider}></div>
              <Link to="/collection/handheld" className={styles.dropdownItem}>Handheld Fan</Link>
              <Link to="/collection/table" className={styles.dropdownItem}>Table & Tower Fan</Link>
              <Link to="/collection/neck" className={styles.dropdownItem}>Neck Fan</Link>
              <Link to="/collection/clip" className={styles.dropdownItem}>Clip-On Fan</Link>
              <Link to="/collection/misting" className={styles.dropdownItem}>Misting Fan</Link>
            </div>
          </div>
          <Link to="/blog" className={currentPath === '/blog' ? styles.active : ''}>Blog</Link>
          <Link to="/about" className={currentPath === '/about' ? styles.active : ''}>About Us</Link>
        </nav>
        
        <div className={styles.navActions}>
          <button className={styles.cartBtn} onClick={toggleCart} aria-label="Open Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className={styles.cartBadge}>{itemCount}</span>
          </button>
          <div className={styles.profileBtn} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
