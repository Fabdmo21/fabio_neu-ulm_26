const menuToggle = document.querySelector('.menu-toggle');
const header = document.getElementById('main-header');

if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
}

// Menü nach Klick auf Link wieder schließen (mobil)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
  });
});

// Fade-In / Reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
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
}

// Filter für Beiträge (nur auf beitraege.html wirklich aktiv)
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
