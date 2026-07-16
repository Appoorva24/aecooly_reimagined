import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import styles from './MistingFanDetail.module.css';
import productsData from '../products.json';

const PRODUCT_ID = 12338778636606;

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
      </svg>
    ),
    title: '14.4°F Instant Cooling',
    desc: 'Drops skin temperature by 14.4°F in just 10 seconds — feel real cool air, not just wind.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
    ),
    title: 'Up to 20H Battery Life',
    desc: '6000mAh built-in battery keeps you cool all day through work, travel, or outdoor adventures.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
      </svg>
    ),
    title: 'Ultra-Fine Mist Tech',
    desc: 'High-Pressure Micro Pore Atomization generates millions of micro-mist particles per minute — no heavy wet feeling.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
      </svg>
    ),
    title: '33 ft/s Airflow Power',
    desc: 'High-velocity wind output reaches your face and neck fast — even in crowded outdoor environments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
    ),
    title: '5 Speed Levels',
    desc: 'One-button switching from gentle breeze to full blast, with hold-to-power-off convenience.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
      </svg>
    ),
    title: 'All-Day Comfort',
    desc: 'Lightweight, ergonomic design fits perfectly in your hand — built for travel, commutes, and outdoor use.',
  },
];

const SPECS = [
  { label: 'Model', value: 'Cold Air Ultra B (Basic)' },
  { label: 'Battery Capacity', value: '6000 mAh' },
  { label: 'Battery Life', value: 'Up to 20 hours' },
  { label: 'Airflow Speed', value: 'Up to 33 ft/s' },
  { label: 'Temperature Drop', value: '14.4°F (8°C) in 10 seconds' },
  { label: 'Speed Levels', value: '5 Levels' },
  { label: 'Mist Refill Time', value: '8 min continuous per fill' },
  { label: 'Charging', value: 'USB-C Fast Charge' },
  { label: 'Colors Available', value: 'Beige, Blue, Grey' },
  { label: 'Brand', value: 'Aecooly' },
  { label: 'SKU', value: 'A01PM0101003' },
  { label: 'Warranty', value: '1 Year' },
];

const FAQS = [
  {
    q: 'How long does the mist last per refill?',
    a: 'One full water tank refill provides up to 8 minutes of continuous mist cooling. You can refill it anywhere — just use clean water.',
  },
  {
    q: 'Will I feel wet or damp from the mist?',
    a: 'No. The High-Pressure Micro Pore Atomization creates ultra-fine micro-mist particles so tiny they evaporate almost instantly on your skin, leaving a refreshing cooling sensation without wetness.',
  },
  {
    q: 'Can I use it indoors too?',
    a: 'Absolutely. While it\'s designed for hot outdoor environments, the fan works great indoors as a personal cooling device at your desk, in the office, or at home.',
  },
  {
    q: 'How long does the battery last on a single charge?',
    a: 'The 6000mAh battery provides up to 20 hours of runtime depending on the speed level used. At lower speeds, you can get even more.',
  },
  {
    q: 'How do I charge it?',
    a: 'The Cold Air Ultra B charges via USB-C, the same connector as most modern smartphones. A full charge takes approximately 2-3 hours.',
  },
  {
    q: 'Is it suitable for travel?',
    a: 'Yes! It\'s compact, lightweight, and TSA-friendly. Many users bring it on flights, road trips, or outdoor festivals.',
  },
];

const REVIEWS = [
  {
    name: 'Sarah K.',
    rating: 5,
    date: 'June 2025',
    title: 'Best purchase of the summer!',
    body: 'I was sceptical about misting fans but this thing is incredible. The cold blast you feel in seconds is so real. I use it on my commute and at the park every day now.',
    verified: true,
  },
  {
    name: 'Arjun M.',
    rating: 5,
    date: 'May 2025',
    title: 'Absolutely no wetness — just pure cool',
    body: 'Tested this at a football match in 38°C heat. The mist cools you instantly without making your shirt wet. The 20-hour battery is not a gimmick — lasted my entire trip.',
    verified: true,
  },
  {
    name: 'Priya L.',
    rating: 4,
    date: 'July 2025',
    title: 'Great for office and outdoor',
    body: 'I keep this at my desk (no mist mode, just fan) and take it outside during lunch. Super quiet on speed 1-2. Minor con: wish the water tank was a bit bigger.',
    verified: true,
  },
];

export function MistingFanDetail() {
  const product = (productsData as any).products.find((p: any) => p.id === PRODUCT_ID) as Product | undefined;
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Intersection observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!product) return null;

  const images: string[] = (product as any).images?.map((i: any) => i.src) || [];
  const variants = product.variants || [];
  const price = parseFloat(variants[activeVariant]?.price || '59.99').toFixed(2);
  const comparePrice = parseFloat(variants[activeVariant]?.compare_at_price || '79.99').toFixed(2);
  const discount = Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100);

  const handleVariantChange = (index: number) => {
    setActiveVariant(index);
    if (index >= 0 && index <= 2) {
      setActiveImage(index);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const colorMap: Record<string, string> = {
    Beige: '#e8d5b7',
    Blue: '#7fb3d3',
    Grey: '#9ca3af',
  };

  return (
    <main className={styles.page}>
      {/* ─── BREADCRUMB ─── */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection/misting">Misting Fans</Link>
          <span>›</span>
          <span className={styles.bcCurrent}>Cold Air Ultra B</span>
        </div>
      </div>

      {/* ─── HERO / PRODUCT SECTION ─── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroInner}>
          {/* Gallery */}
          <div className={styles.galleryCol}>
            <div className={styles.mainImageWrap}>
              <img
                src={images[activeImage]}
                alt={product.title}
                className={styles.mainImg}
                key={activeImage}
              />
              <div className={styles.discountBadge}>-{discount}%</div>
              <div className={styles.mistingBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12a10 10 0 0 1 10-10z"/>
                  <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                Misting Fan
              </div>
            </div>
            <div className={styles.thumbStrip}>
              {images.slice(0, 6).map((src, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className={styles.infoCol}>
            <span className={styles.categoryTag}>Misting Fan · Handheld</span>
            <h1 className={styles.productTitle}>Cold Air Ultra B<br /><span>6000mAh Misting Fan</span></h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= 4 ? '#A5B658' : 'none'} stroke="#A5B658" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
                <span className={styles.ratingNum}>4.8</span>
                <span className={styles.ratingCount}>(248 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>${price}</span>
              <span className={styles.comparePrice}>${comparePrice}</span>
              <span className={styles.saveBadge}>Save ${(parseFloat(comparePrice) - parseFloat(price)).toFixed(2)}</span>
            </div>

            {/* Color */}
            <div className={styles.variantSection}>
              <p className={styles.variantLabel}>
                Color: <strong>{variants[activeVariant]?.title}</strong>
              </p>
              <div className={styles.colorSwatches}>
                {variants.map((v, i) => (
                  <button
                    key={i}
                    className={`${styles.swatch} ${activeVariant === i ? styles.swatchActive : ''}`}
                    onClick={() => handleVariantChange(i)}
                    title={v.title}
                    style={{ '--swatch-color': colorMap[v.title] || '#ccc' } as React.CSSProperties}
                  >
                    <span className={styles.swatchDot} />
                    {v.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.qtySection}>
              <p className={styles.variantLabel}>Quantity</p>
              <div className={styles.qtyControl}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className={styles.qtyBtn}>−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className={styles.qtyBtn}>+</button>
              </div>
            </div>

            {/* Stock */}
            <div className={styles.stockRow}>
              <span className={styles.stockDot} />
              <span className={styles.stockText}>In Stock — Ships within 2-3 business days</span>
            </div>

            {/* CTAs */}
            <div className={styles.ctaGroup}>
              <button
                className={`${styles.addToCartBtn} ${isAdded ? styles.addedBtn : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button className={styles.buyNowBtn}>
                Buy Now
              </button>
            </div>

            {/* Trust */}
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375A1.125 1.125 0 0 1 2.25 17.625v-14.25A1.125 1.125 0 0 1 3.375 2.25h17.25A1.125 1.125 0 0 1 21.75 3.375V17.625a1.125 1.125 0 0 1-1.125 1.125H18.75m-9 0h9m-9 0v3m0-3h.008v.015H9.75v-.015Z"/>
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
                </svg>
                <span>1-Year Warranty</span>
              </div>
              <div className={styles.trustItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                </svg>
                <span>30-Day Returns</span>
              </div>
              <div className={styles.trustItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                </svg>
                <span>Fast Charge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COOLING STAT STRIP ─── */}
      <section className={`${styles.statStrip} ${styles.reveal}`}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>14.4°F</span>
          <span className={styles.statLabel}>Temperature Drop</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>10s</span>
          <span className={styles.statLabel}>Time to Feel Cool</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>20H</span>
          <span className={styles.statLabel}>Battery Life</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>33 ft/s</span>
          <span className={styles.statLabel}>Wind Speed</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>5</span>
          <span className={styles.statLabel}>Speed Levels</span>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Why Choose Cold Air Ultra B</span>
          <h2 className={styles.sectionTitle}>Engineered for Real Cooling</h2>
          <p className={styles.sectionDesc}>Not just a fan. A personal climate system designed to deliver measurable, instant temperature relief wherever you are.</p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={`${styles.featureCard} ${styles.reveal}`}>
              <div className={styles.featureIconWrap}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MISTING TECHNOLOGY BANNER ─── */}
      <section className={styles.techBanner}>
        <div className={styles.techBannerInner}>
          <div className={`${styles.techText} ${styles.reveal}`}>
            <span className={styles.sectionTag}>Misting Technology</span>
            <h2>High-Pressure Micro Pore Atomization</h2>
            <p>Most fans just push hot air. The Cold Air Ultra B uses precision micro-nozzle technology to atomize water into particles so fine they evaporate the instant they hit your skin — creating a genuine cooling effect without any dampness.</p>
            <ul className={styles.techList}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Millions of micro-mist particles per minute
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                No heavy, wet feeling on skin
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Works in both hot-dry and hot-humid conditions
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                8 minutes continuous mist per refill
              </li>
            </ul>
          </div>
          <div className={`${styles.techImageWrap} ${styles.reveal}`}>
            <img src={images[1] || images[0]} alt="Misting technology detail" className={styles.techImage} />
          </div>
        </div>
      </section>

      {/* ─── USAGE SCENARIOS ─── */}
      <section className={styles.usageSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Use It Everywhere</span>
          <h2 className={styles.sectionTitle}>Built for Your Life</h2>
        </div>
        <div className={styles.usageGrid}>
          {[
            { label: 'Commuting', icon: '🚌', desc: 'Stay fresh on public transport or long rides.' },
            { label: 'Outdoor Festivals', icon: '🎪', desc: 'Instant relief in crowded, sun-exposed areas.' },
            { label: 'Office & Study', icon: '💻', desc: 'Personal cool air without disturbing others.' },
            { label: 'Camping & Hiking', icon: '⛺', desc: '20H battery means all-day cool on the trail.' },
            { label: 'Sports & Gym', icon: '🏃', desc: 'Cool down fast between sets or after cardio.' },
            { label: 'Travel & Flights', icon: '✈️', desc: 'Compact, TSA-friendly, and always ready.' },
          ].map((u, i) => (
            <div key={i} className={`${styles.usageCard} ${styles.reveal}`}>
              <span className={styles.usageIcon}>{u.icon}</span>
              <h4 className={styles.usageLabel}>{u.label}</h4>
              <p className={styles.usageDesc}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BATTERY SECTION ─── */}
      <section className={styles.batterySection}>
        <div className={styles.batteryInner}>
          <div className={`${styles.batteryImageWrap} ${styles.reveal}`}>
            <img src={images[2] || images[0]} alt="Battery and charging" className={styles.batteryImage} />
          </div>
          <div className={`${styles.batteryText} ${styles.reveal}`}>
            <span className={styles.sectionTag}>Battery Performance</span>
            <h2>6000mAh — Power That Keeps Up</h2>
            <p>The built-in 6000mAh lithium battery is one of the largest in any handheld fan — giving you up to 20 continuous hours of cooling. USB-C fast charging means you're back at full power in under 3 hours.</p>
            <div className={styles.batteryStats}>
              <div className={styles.batteryStat}>
                <span className={styles.batteryNum}>20H</span>
                <span className={styles.batteryLabel}>Max runtime</span>
              </div>
              <div className={styles.batteryStat}>
                <span className={styles.batteryNum}>~3H</span>
                <span className={styles.batteryLabel}>Full charge time</span>
              </div>
              <div className={styles.batteryStat}>
                <span className={styles.batteryNum}>USB-C</span>
                <span className={styles.batteryLabel}>Universal charging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECS TABLE ─── */}
      <section className={styles.specsSection}>
        <div className={styles.specsSectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technical Specs</span>
            <h2 className={styles.sectionTitle}>Full Specifications</h2>
          </div>
          <div className={styles.specsTable}>
            {SPECS.map((s, i) => (
              <div key={i} className={styles.specRow}>
                <span className={styles.specLabel}>{s.label}</span>
                <span className={styles.specValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHATS IN THE BOX ─── */}
      <section className={styles.boxSection}>
        <div className={styles.boxInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Package Contents</span>
            <h2 className={styles.sectionTitle}>What's in the Box</h2>
          </div>
          <div className={styles.boxGrid}>
            {['Cold Air Ultra B (Basic) Fan', 'USB-C Charging Cable', 'Detachable Water Tank', 'Carry Pouch', 'User Manual', 'Aecooly Warranty Card'].map((item, i) => (
              <div key={i} className={styles.boxItem}>
                <div className={styles.boxItemIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Customer Reviews</span>
            <h2 className={styles.sectionTitle}>What Customers Say</h2>
          </div>
          <div className={styles.reviewSummary}>
            <div className={styles.reviewBigNum}>4.8</div>
            <div className={styles.reviewStarsLarge}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="24" height="24" viewBox="0 0 24 24" fill={s <= 4 ? '#A5B658' : 'none'} stroke="#A5B658" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p>Based on 248 verified reviews</p>
          </div>
          <div className={styles.reviewCards}>
            {REVIEWS.map((r, i) => (
              <div key={i} className={`${styles.reviewCard} ${styles.reveal}`}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>{r.name.charAt(0)}</div>
                    <div>
                      <p className={styles.reviewerName}>{r.name}</p>
                      <p className={styles.reviewDate}>{r.date}</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= r.rating ? '#A5B658' : 'none'} stroke="#A5B658" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <h4 className={styles.reviewTitle}>{r.title}</h4>
                <p className={styles.reviewBody}>{r.body}</p>
                {r.verified && <span className={styles.verifiedBadge}>✓ Verified Purchase</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={openFaq === i ? styles.faqOpen : ''}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA STRIP ─── */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaStripInner}>
          <h2>Ready to Feel the Difference?</h2>
          <p>Join thousands of customers who upgraded their summer with the Cold Air Ultra B.</p>
          <div className={styles.ctaStripBtns}>
            <button className={styles.ctaStripAdd} onClick={handleAddToCart}>
              {isAdded ? '✓ Added!' : 'Add to Cart — $59.99'}
            </button>
            <Link to="/collection/misting" className={styles.ctaStripBrowse}>
              Explore All Misting Fans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
