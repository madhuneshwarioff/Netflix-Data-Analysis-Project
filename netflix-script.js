const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => revealObserver.observe(element));

const statNumbers = document.querySelectorAll(".stat-number");

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const start = performance.now();
  const duration = 1200;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    element.textContent = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = String(target);
    }
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach((element) => statsObserver.observe(element));
