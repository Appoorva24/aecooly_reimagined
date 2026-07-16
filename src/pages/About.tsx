import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import { useSEO } from '../hooks/useSEO';

export function About() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'About Us | Premium Portable Cooling Solutions | Aecooly',
    description: 'Aecooly is a trusted brand offering premium portable cooling solutions for everyday comfort, travel, work, and outdoor lifestyles at affordable prices.',
    url: 'https://aecooly.com/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Aecooly',
      'url': 'https://aecooly.com',
      'logo': 'https://aecooly.com/logo.png',
      'description': 'Premium Portable Cooling Solutions at Affordable Prices.'
    }
  });

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page} ref={scrollRef}>
      {/* 1. SPLIT HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={`${styles.heroLeft} ${styles.reveal}`}>
            <h1 className={styles.title}>Step Out, Stay Cool:<br/><span className={styles.highlight}>Premium Portable Cooling</span></h1>
            <p className={styles.subtitle}>Aecooly, Your Mini Outdoor Cooling Expert</p>
          </div>
          <div className={`${styles.heroRight} ${styles.reveal}`}>
            <p className={styles.introText}>
              Aecooly is a passionate team dedicated to developing innovative outdoor appliances. We specialize in combining aesthetics with functionality, leveraging advanced technology and creative design to craft stylish handheld fans and versatile outdoor gear.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY CARDS (DARK DESIGN) */}
      <section className={styles.philosophySection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            
            <div className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Mission & Vision</h3>
              <p className={styles.cardText}>
                Our mission is to provide users with a refreshing and natural cooling experience while delivering products that are both visually appealing and highly practical.
              </p>
            </div>

            <div className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Brand Philosophy</h3>
              <p className={styles.cardText}>
                At Aecooly, we aim to brighten your everyday life with innovation, bringing comfort and joy to every moment. Wherever life takes you, Aecooly is by your side, making every adventure cool and effortless.
              </p>
            </div>

            <div className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Unparalleled Aesthetics</h3>
              <p className={styles.cardText}>
                Aecooly is committed to creating equipment that enhances outdoor experiences. We meticulously craft every product detail, infusing unparalleled aesthetics into each item.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TIMELINE */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Our Journey</h2>
          
          <div className={styles.timeline}>
            
            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2022</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>Brand Founded</h4>
                <p>The beginning of Aecooly's journey to revolutionize outdoor cooling.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2023</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>Research & Development</h4>
                <p>Focusing on advanced technology and aesthetic design integration.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2024</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>First Product Launch</h4>
                <p>Bringing our innovative cooling solutions to the market.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2024.8</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>Recognition & Awards</h4>
                <p>Celebrating design excellence and customer satisfaction.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2025</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>Current Focus</h4>
                <p>Expanding the CamperKit and flagship portable fan line-ups.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.reveal}`}>
              <div className={styles.timelineYear}>2026+</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>The Future</h4>
                <p>Continuing to innovate and make every adventure cool and effortless.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className={`${styles.ctaSection} ${styles.reveal}`} style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#f9f9f9', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>Ready to experience Aecooly?</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover our full range of innovative portable cooling solutions and upgrade your everyday comfort.
        </p>
        <a href="/collection/all" style={{ display: 'inline-block', backgroundColor: '#000', color: '#fff', padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', transition: 'background-color 0.2s' }}>
          Shop Best Sellers
        </a>
      </section>

    </main>
  );
}
