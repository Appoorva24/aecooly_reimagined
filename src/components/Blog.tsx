import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const posts = [
    {
      id: 1,
      title: "The Future of Portable Cooling Technology",
      excerpt: "Discover how brushless motors and aerospace aerodynamics are changing the way we stay cool on the go.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
      date: "Aug 15, 2026"
    },
    {
      id: 2,
      title: "5 Essentials for Your Next Summer Adventure",
      excerpt: "From hydration packs to high-speed portable fans, here is what you need to survive the heat wave.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
      date: "Aug 02, 2026"
    },
    {
      id: 3,
      title: "Office Aesthetics: Keeping Cool at Your Desk",
      excerpt: "How to maintain a premium, minimalist workspace while beating the afternoon heat.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      date: "Jul 28, 2026"
    }
  ];

  return (
    <section className={styles.blogSection} id="blog" ref={sectionRef}>
      <div className={`${styles.sectionHeader} reveal`}>
        <h2>Latest from Aecooly</h2>
        <p>Insights, news, and tips on living cool.</p>
      </div>

      <div className={styles.blogGrid}>
        {posts.map((post, index) => (
          <article 
            key={post.id} 
            className={`${styles.blogCard} reveal`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={styles.imageWrapper}>
              <img src={post.image} alt={post.title} loading="lazy" />
            </div>
            <div className={styles.content}>
              <span className={styles.date}>{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to="/products/portable-misting-fan-cold-air-cold-air-ultra-bbasic" className={styles.readMore}>Read More</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
