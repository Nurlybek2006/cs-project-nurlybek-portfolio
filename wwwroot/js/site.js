(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];

  const closeNav = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    navItems.forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeNav();
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });
  }

  const sections = navItems
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navItems.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    sections.forEach(section => activeObserver.observe(section));
  }

  const revealItems = document.querySelectorAll('.reveal-on-scroll, .section-heading, .status-strip, .stats-section, .workflow-track article, .journey-list article');
  revealItems.forEach(item => item.classList.add('reveal-on-scroll'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const stats = document.querySelector('.stats-section');
  const counters = [...document.querySelectorAll('[data-count]')];
  let countersStarted = false;
  const runCounters = () => {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
      const end = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      if (!Number.isFinite(end) || reduceMotion) {
        counter.textContent = `${counter.textContent.trim()}${suffix && !counter.textContent.includes(suffix) ? suffix : ''}`;
        return;
      }
      const duration = 800;
      const startAt = performance.now();
      const tick = now => {
        const progress = Math.min((now - startAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${String(Math.round(end * eased)).padStart(2, '0')}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  if (stats && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        runCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.4 });
    statsObserver.observe(stats);
  } else {
    runCounters();
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    const fields = [
      { input: form.querySelector('[name="Name"]'), check: value => value.trim().length >= 2, message: 'Please enter at least 2 characters.' },
      { input: form.querySelector('[name="Email"]'), check: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Enter a valid email address.' },
      { input: form.querySelector('[name="Message"]'), check: value => value.trim().length >= 10, message: 'Please enter at least 10 characters.' }
    ];
    form.addEventListener('submit', event => {
      let valid = true;
      fields.forEach(({ input, check, message }) => {
        const error = input.parentElement.querySelector('.field-error');
        const okay = check(input.value);
        input.classList.toggle('input-validation-error', !okay);
        input.setAttribute('aria-invalid', String(!okay));
        error.textContent = okay ? '' : message;
        valid = valid && okay;
      });
      if (!valid) event.preventDefault();
    });
    fields.forEach(({ input }) => input.addEventListener('input', () => {
      input.classList.remove('input-validation-error');
      input.setAttribute('aria-invalid', 'false');
      input.parentElement.querySelector('.field-error').textContent = '';
    }));
  }
})();
