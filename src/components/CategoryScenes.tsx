import { Link } from 'react-router-dom';
import { useRef } from 'react';
import styles from './CategoryScenes.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function CategoryScenes() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const categories = [
    { id: 'college', title: 'COLLEGE', image: '/cat_college.png', size: 'large' },
    { id: 'travel', title: 'TRAVELING', image: '/cat_travel.png', size: 'medium' },
    { id: 'adults', title: 'WORKING', image: '/cat_adults.png', size: 'medium' },
    { id: 'children', title: 'CHILDREN', image: '/cat_children.png', size: 'small' },
    { id: 'unique', title: 'SPECIAL', image: '/cat_unique.png', size: 'small' }
  ];

  return (
    <section className={styles.scenesSection} id="collections" ref={sectionRef}>
      <div className={`${styles.sectionHeader} reveal`}>
        <h2>More Scenes, Match as You Like</h2>
        <div className={styles.headerLine}></div>
      </div>

      <div className={styles.bentoGrid}>
        {categories.map((cat, index) => (
          <Link 
            key={cat.id} 
            to={`/collection/${cat.id}`}
            className={`${styles.bentoItem} ${styles[cat.size]} reveal`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.title} className={styles.sceneImg} />
            </div>
            <div className={styles.overlay}>
              <h3>{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
