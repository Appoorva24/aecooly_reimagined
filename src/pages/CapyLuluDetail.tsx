import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import styles from './CapyLuluDetail.module.css';
import productsData from '../products.json';
import { useSEO } from '../hooks/useSEO';

const PRODUCT_ID = 12491509039422;

const SPECS = [
  { label: 'Weight', value: '150g' },
  { label: 'Wind Speed', value: '11 m/s (Hurricane-Level)' },
  { label: 'Angle Adjustment', value: '220° Flexible Tilt' },
  { label: 'Modes', value: 'Handheld, Neck-hanging, Desktop' },
  { label: 'Axis Structure', value: 'POM Buckle (Single Axis)' },
  { label: 'Design', value: 'Dual-blade pressurized' },
];

const FAQS = [
  {
    q: 'How heavy is the Air Gimbal?',
    a: 'It weighs just 150g. It\u2019s ultra-portable and slips effortlessly into your hand, bag, or pocket.',
  },
  {
    q: 'Can it stand on a desk?',
    a: 'Yes! The 3-in-1 multi-mode design allows it to be used handheld, hanging around your neck, or standing securely on a desktop.',
  },
  {
    q: 'What does the POM buckle do?',
    a: 'The innovative Single Axis Design uses a durable POM buckle structure to ensure a much longer rotation lifespan and stable torque compared to standard hinges.',
  },
  {
    q: 'How strong is the airflow?',
    a: 'The dual-blade pressurized design delivers an incredible 11m/s hurricane-level wind speed, blowing farther and stronger than traditional portable fans.',
  },
];

const REVIEWS = [
  {
    name: 'Emily R.',
    rating: 5,
    date: 'August 2025',
    title: 'Tiny but incredibly powerful',
    body: 'I can\u2019t believe how strong the wind is for something this small. The CAPY LULU design is adorable, and the 220-degree tilt makes it perfect for my desk.',
    verified: true,
  },
  {
    name: 'Jason M.',
    rating: 5,
    date: 'July 2025',
    title: 'The perfect travel companion',
    body: 'Weighs absolutely nothing. I keep it in my pocket during summer commutes. The neck strap mode is a lifesaver when my hands are full.',
    verified: true,
  },
  {
    name: 'Chloe S.',
    rating: 4,
    date: 'September 2025',
    title: 'Great design and build quality',
    body: 'The hinge feels very premium (not floppy at all). The dual blades really push the air far. Only wish it came in more colors!',
    verified: true,
  },
];

export function CapyLuluDetail() {
  const product = (productsData as any).products.find((p: any) => p.id === PRODUCT_ID) as Product | undefined;
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { addToCart } = useCart();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));

    // Sticky bar observer — show when CTA scrolls out of view
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const images: string[] = (product as any)?.images?.map((i: any) => i.src) || [];
  const price = parseFloat(product?.variants?.[0]?.price || '24.99').toFixed(2);
  const comparePrice = parseFloat(product?.variants?.[0]?.compare_at_price || '24.99').toFixed(2);

  useSEO({
    title: 'Capy Lulu Handheld Fan | Premium Portable Fans | Aecooly',
    description: 'Experience ultimate portable cooling with the Aecooly Capy Lulu Edition handheld fan. Features a 15h runtime, 5-speed turbo airflow, and a 220° adjustable gimbal. Perfect for travel, outdoor, and daily use.',
    url: 'https://aecooly.com/products/portable-handheld-fan-air-gimbal-capy-lulu-edition',
    image: images[0],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          'name': 'Capy Lulu Handheld Fan',
          'image': images,
          'description': 'Ultra-portable 150g air gimbal with hurricane-level 11m/s airflow, 220° flexible tilt, and 3-in-1 multi-mode design.',
          'sku': PRODUCT_ID.toString(),
          'brand': {
            '@type': 'Brand',
            'name': 'Aecooly'
          },
          'offers': {
            '@type': 'Offer',
            'url': 'https://aecooly.com/products/portable-handheld-fan-air-gimbal-capy-lulu-edition',
            'priceCurrency': 'USD',
            'price': price,
            'availability': 'https://schema.org/InStock',
            'itemCondition': 'https://schema.org/NewCondition'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '128'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aecooly.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'All Products', 'item': 'https://aecooly.com/collection/all' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Capy Lulu Handheld Fan', 'item': 'https://aecooly.com/products/portable-handheld-fan-air-gimbal-capy-lulu-edition' }
          ]
        }
      ]
    }
  });

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <main className={styles.page} ref={scrollRef}>
      {/* BREADCRUMB */}
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
            {images.slice(0, 6).map((src, idx) => (
              <button
                key={idx}
                className={`${styles.thumb} ${activeImage === idx ? styles.thumbActive : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={src} alt={`View ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={images.slice(0, 6)[activeImage]} alt="Capy Lulu rechargeable mini fan and premium handheld fan" />
          </div>
        </div>

        {/* Details Panel */}
        <div className={styles.details}>
          <span className={styles.category}>{product.product_type || 'Gear'}</span>
          <h1 className={styles.title}>Capy Lulu Handheld Fan Edition</h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles.ratingText}>4.9 (128 Reviews)</span>
          </div>

          {/* Tagline */}
          <p className={styles.tagline}>
            Ultra-portable 150g air gimbal with hurricane-level 11m/s airflow, 220° flexible tilt, and 3-in-1 multi-mode design.
          </p>

          <div className={styles.priceRow}>
            <span className={styles.price}>${price}</span>
            {comparePrice && comparePrice !== price && (
              <span className={styles.comparePrice}>${comparePrice}</span>
            )}
            {comparePrice && comparePrice !== price && (
              <span className={styles.saveBadge}>
                Save ${(parseFloat(comparePrice) - parseFloat(price)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity + CTA Buttons */}
          <div className={styles.ctaRow} ref={ctaRef}>
            <div className={styles.qtySelector}>
              <button 
                className={styles.qtyBtn} 
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.qtyValue}>{qty}</span>
              <button 
                className={styles.qtyBtn} 
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
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
            <button className={styles.wishBtn} aria-label="Add to wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
              <span>Free Shipping on orders over $50</span>
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
        </div>
      </div>

      {/* 2x2 GRID BANNERS (Original Website Style) */}
      <section className={styles.bannersSection}>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-1.png" alt="Aecooly Pocket Jet Force Fan" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-2.png" alt="Pocket-Sized Always Ready for Your Next Cool" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-3.png" alt="15000RPM Jet Engine Power Pocket 36ft/s" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-4.png" alt="17 H of Powerful Cooling" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-5.png" alt="5-Speed Turbo Wind" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-6.png" alt="Two people relaxing in lawn chairs" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-7.png" alt="Mosaic Grid of Features" />
        </div>
        <div className={`${styles.fullBanner} ${styles.reveal}`}>
          <img src="/assets/capylulu_banners/banner-8.png" alt="Packing List" />
        </div>
      </section>

      {/* SPECS & FAQ */}
      <section className={styles.dataSection}>
        <div className={styles.dataInner}>
          
          <div className={styles.specsCol}>
            <h3 className={styles.dataTitle}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Tech Specs
            </h3>
            <ul className={styles.specsList}>
              {SPECS.map((s, i) => (
                <li key={i} className={styles.reveal}>
                  <span className={styles.specLabel}>{s.label}</span>
                  <span className={styles.specValue}>{s.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.faqCol}>
            <h3 className={styles.dataTitle}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              FAQ
            </h3>
            <div className={styles.faqList}>
              {FAQS.map((f, i) => (
                <div key={i} className={`${styles.faqItem} ${styles.reveal}`}>
                  <button 
                    className={styles.faqQ}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}>+</span>
                  </button>
                  <div className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ''}`}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.reviewsSection}>
        <h2 className={`${styles.sectionTitleCenter} ${styles.reveal}`}>Customer Reviews</h2>
        <div className={styles.reviewGrid}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={`${styles.reviewCard} ${styles.reveal}`}>
              <div className={styles.reviewStars}>
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
              <h4 className={styles.reviewTitle}>{r.title}</h4>
              <p className={styles.reviewBody}>{r.body}</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  {r.verified && <span className={styles.verifiedBadge}>✓ Verified</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      <div className={`${styles.stickyBar} ${showStickyBar ? styles.stickyBarVisible : ''}`}>
        <div className={styles.stickyBarInner}>
          <div className={styles.stickyBarInfo}>
            <span className={styles.stickyBarTitle}>CAPY LULU Air Gimbal</span>
            <span className={styles.stickyBarPrice}>${price}</span>
          </div>
          <div className={styles.stickyBarActions}>
            <div className={styles.stickyQty}>
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button 
              className={`${styles.stickyAddBtn} ${isAdded ? styles.stickyAddBtnActive : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
