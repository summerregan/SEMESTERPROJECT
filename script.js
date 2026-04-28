const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach((link) => {
  const linkPage = link.getAttribute('href');
  const isCurrentPage = linkPage === currentPage;

  if (isCurrentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const animateChart = (chart) => {
  chart.querySelectorAll('.bar-fill').forEach((bar) => {
    bar.style.width = `${bar.dataset.val || 0}%`;
  });
};

// Animate bar charts when they scroll into view
const barCharts = document.querySelectorAll('.bar-chart');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  barCharts.forEach(animateChart);
} else {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateChart(entry.target);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  barCharts.forEach((chart) => barObserver.observe(chart));
}
