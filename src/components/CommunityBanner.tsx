import styles from './CommunityBanner.module.css';
import productsData from '../products.json';

export function CommunityBanner() {
  // Use some product images for the collage
  const collageImages = productsData?.products?.slice(5, 13).map((p: any) => p.images?.[0]?.src).filter(Boolean) || [];
  
  // Fill with placeholders if not enough images
  while (collageImages.length < 8) {
    collageImages.push(`https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=60`);
  }

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Join Aecooly Fan Group</h2>
          <p className={styles.description}>
            Join for exclusive events, giveaways, and announcements.
          </p>
          <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
            JOIN OUR COMMUNITY <span>→</span>
          </button>
        </div>
        
        <div className={styles.collageGrid}>
          {collageImages.slice(0, 8).map((src: string, index: number) => (
            <div key={index} className={`${styles.collageItem} ${styles[`item${index + 1}`]}`}>
              <img src={src} alt={`Community ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
