import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useScrollReveal(ref: RefObject<HTMLElement | null>, threshold: number = 0.1) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const observeElements = () => {
      const revealElements = element.querySelectorAll('.reveal');
      revealElements.forEach((el) => {
        if (!el.classList.contains('active')) {
          observer.observe(el);
        }
      });
      if (element.classList.contains('reveal') && !element.classList.contains('active')) {
        observer.observe(element);
      }
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(element, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [ref, threshold]);
}
