/* ===========================
   main.js — Portafolio
=========================== */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const internalLinks = document.querySelectorAll('a[href^="#"]');

/* Link activo en navegación */
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.45
});

sections.forEach(section => observerNav.observe(section));

/* Smooth scroll para botones y menú */
internalLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* Animación al hacer scroll */
const fadeEls = document.querySelectorAll(
  '.skills-card, .project-card, .section-title, .section-label, .contact-desc, .btn'
);

fadeEls.forEach(el => el.classList.add('reveal'));

const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      observerReveal.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

fadeEls.forEach(el => observerReveal.observe(el));