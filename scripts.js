// Hamburger-Menü
const menuToggle = document.querySelector('.menu-toggle');
const header = document.getElementById('main-header');

if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
}

// Fade-In / Reveal (nur, wenn IntersectionObserver verfügbar ist)
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: einfach alle anzeigen
  revealEls.forEach(el => el.classList.add('visible'));
}

// Filter für Beiträge (läuft nur auf der Beiträge-Seite)
const filterButtons = document.querySelectorAll('.filter-button');
const posts = document.querySelectorAll('.post-list .card[data-category]');

if (filterButtons.length && posts.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category || 'all';
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      posts.forEach(post => {
        const pcat = post.dataset.category || 'info';
        if (cat === 'all') {
          post.style.display = '';
        } else {
          post.style.display = (pcat === cat) ? '' : 'none';
        }
      });
    });
  });
}
