import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Section: Features */}
      <div className={styles.featuresSection}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <div className={styles.featureText}>
            <h4>Free Shipping Global</h4>
            <p>Free Shipping on All Orders</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </div>
          <div className={styles.featureText}>
            <h4>30-Day Return</h4>
            <p>Money-Back Guarantee</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div className={styles.featureText}>
            <h4>1-Year Warranty</h4>
            <p>Free Repair or Replacement</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9h-9M16.5 13.5h-9M12 18h-4.5" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div className={styles.featureText}>
            <h4>Expert Support</h4>
            <p>24/7 Service for You</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Links */}
      <div className={styles.footerContent}>
        <div className={styles.brandColumn}>
          <div className={styles.footerLogo}>Ae<span>cooly</span></div>
          <p className={styles.footerDesc}>Your go-to brand for premium portable fans and versatile camping tools. Stay cool and prepared, wherever the journey takes you.</p>
        </div>

        <div className={styles.linkColumn}>
          <h4 className={styles.footerHeading}>Products</h4>
          <ul className={styles.footerLinks}>
            <li><a href="/collection/all">All Products</a></li>
            <li><a href="/collection/handheld">Handheld Fan</a></li>
            <li><a href="/collection/neck">Neck Fan</a></li>
            <li><a href="/collection/table">Table &amp; Tower Fan</a></li>
            <li><a href="/collection/clip">Clip-On Fan</a></li>
            <li><a href="/collection/misting">Misting Fan</a></li>
          </ul>
        </div>
        
        <div className={styles.linkColumn}>
          <h4 className={styles.footerHeading}>Support</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#returns">Returns and cancellations</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#where-to-buy">Where to Buy</a></li>
            <li><a href="#order-tracking">Order Tracking</a></li>
            <li><a href="#support-center">Support Center</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        
        <div className={styles.linkColumn}>
          <h4 className={styles.footerHeading}>Explore</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#blog-center">Blog Center</a></li>
            <li><a href="#product-patents">Product Patents</a></li>
            <li><a href="#facebook-group">Facebook Group</a></li>
            <li><a href="#affiliate-program">Affiliate Program</a></li>
            <li><a href="#distributor-program">Distributor Program</a></li>
          </ul>
        </div>
        
        <div className={styles.contactColumn}>
          <h4 className={styles.footerHeading}>Contact Us</h4>
          <div className={styles.contactInfo}>
            <p><strong>Email:</strong> <a href="mailto:support@aecooly.com">support@aecooly.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+18882520666">+1 888-252-0666</a></p>
            <div className={styles.hours}>
              <p><strong>Monday to Friday</strong></p>
              <p>9:00 am - 18:00 pm (PST)</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomLinks}>
          <a href="#shipping-policy">Shipping policy</a>
          <span className={styles.divider}></span>
          <a href="#warranty-policy">Warranty Policy</a>
          <span className={styles.divider}></span>
          <a href="#returns-refunds">Returns & Refunds Policy</a>
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.socialIcons}>
            <a href="#x" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
            </a>
            <a href="#pinterest" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.66 7.91 6.44 9.35-.1-.8-.18-2.03.04-2.89.2-.76 1.3-5.53 1.3-5.53s-.33-.66-.33-1.65c0-1.54.9-2.7 2.01-2.7.94 0 1.67.71 1.67 1.57 0 .95-.6 2.37-.92 3.68-.26 1.1.55 1.99 1.64 1.99 1.97 0 3.48-2.07 3.48-5.06 0-2.65-1.9-4.5-4.63-4.5-3.15 0-5.01 2.36-5.01 4.82 0 .95.37 1.97.83 2.52.09.11.1.2.07.31l-.27 1.13c-.04.14-.13.17-.28.1-1.04-.49-1.69-2.05-1.69-3.3 0-2.69 1.96-5.16 5.64-5.16 3.01 0 5.34 2.15 5.34 5.02 0 3-1.89 5.41-4.52 5.41-.88 0-1.7-.46-1.99-1l1.55-5.89"/></svg>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/></svg>
            </a>
            <a href="#youtube" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3L10 15z"/></svg>
            </a>
            <a href="#tiktok" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.525.025c-1.31-.02-2.61.01-3.91.04-.06.74-.03 1.48.06 2.23 1.34.1 2.62.59 3.66 1.4.95.73 1.62 1.72 1.9 2.87.05.21.08.43.08.64h3.69c-.04-1.07-.15-2.14-.52-3.15-.35-.97-.93-1.84-1.67-2.57C14.73.49 13.62.14 12.52.02zm-3.8 6.54v8.94c0 1.22-.52 2.39-1.42 3.2-.82.74-1.92 1.12-3.03 1-1.06-.05-2.06-.55-2.76-1.34-.73-.83-1.1-1.95-1-3.07.13-1.21.84-2.27 1.9-2.85 1.05-.58 2.29-.68 3.42-.31V8.18c-1.86-.53-3.85-.36-5.59.51-1.61.8-2.86 2.15-3.41 3.82-.54 1.66-.41 3.51.35 5.08.8 1.63 2.19 2.92 3.84 3.53 1.83.67 3.91.56 5.67-.34 1.71-.88 2.95-2.45 3.32-4.32.22-1.12.24-2.26.24-3.4V7.5c1.6.61 3.09 1.46 4.41 2.53v-3.8c-1.5-.78-3.14-1.35-4.85-1.63-.35-4.63-4.08-2.66-4.08-4.58z"/></svg>
            </a>
          </div>
          <button className={styles.followBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Follow on shop
          </button>
        </div>
      </div>
    </footer>
  );
}
