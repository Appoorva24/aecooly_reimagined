import { useRef } from 'react';
import styles from './Hero.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useScrollReveal(heroRef);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Full-bleed cinematic background */}
      <div className={styles.heroBg}>
        <img src="/hero_boat.png" alt="Aecooly premium portable fan used outdoors on a boat" />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.heroContainer}>
        <div className={`${styles.heroText} reveal`}>
          <div className={styles.microCopy}>
            <span>[ EST. 2024 ]</span>
            <span className={styles.line}></span>
            <span>THE FUTURE OF COOLING</span>
          </div>
          
          <h1>High-Speed<br/>Performance.</h1>
          <p>Experience hurricane-level wind power in the palm of your hand. Sleek, premium, and unimaginably powerful.</p>
          
          <div className={styles.actions}>
            <a href="#collections" className={styles.pillBtnPrimary}>Explore Collections</a>
            <Link to="/collection/all" className={styles.pillBtnOutline}>Shop All Gear</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
