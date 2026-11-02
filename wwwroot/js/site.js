(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
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
