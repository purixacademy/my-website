/* ============================================================
   PURIX ACADEMY - INTERACTIVE SCROLL & CASCADE ENGINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Select all futuristic cyber cards across all pages
  const animatedCards = document.querySelectorAll('.cyber-card, .cat-box');

  // IntersectionObserver to trigger smooth float-up entrance
  const cascadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Animation trigger hone ke baad observe band karein taaki glitch na ho
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Har card par observer attach karein
  animatedCards.forEach((card, index) => {
    // Subtle staggered delay agar ek saath multiple cards screen me aayein
    card.style.transitionDelay = `${(index % 3) * 0.08}s`;
    cascadeObserver.observe(card);
  });

  // Safety Fallback: Agar user bahut tezi se scroll kare ya screen refresh kare
  setTimeout(() => {
    animatedCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30) {
        card.classList.add('revealed');
      }
    });
  }, 250);
});