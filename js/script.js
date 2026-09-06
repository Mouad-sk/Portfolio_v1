(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinksPanel = document.getElementById('navLinks');

  function closeMenu() {
    navLinksPanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && navLinksPanel) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksPanel.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- scroll progress bar ---------- */
  const progress = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- scrollspy ---------- */
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ---------- reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .about-text, .profile-item, .skill-block, .exp-card, .project-card, .contact-intro, .contact-form-wrap, .lang-row'
  );
  const certCards = document.querySelectorAll('.cert-card');

  revealTargets.forEach((el) => el.classList.add('reveal'));

  if (reduceMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    certCards.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    const certObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    certCards.forEach((el) => certObserver.observe(el));
  }

  /* ---------- hero typing effect ---------- */
  const roles = [
    'Cybersecurity Engineering Student',
    'CTF Player',
    'Cisco Certified Ethical Hacker',
    'Junior Cybersecurity Analyst',
    'Phishing & Malware Analyst'
  ];
  const typedEl = document.getElementById('typedRole');

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function tick() {
        const current = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1800);
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 55);
      }
      tick();
    }
  }

  /* ---------- terminal boot sequence (single orchestrated reveal) ---------- */
  const termLines = document.querySelectorAll('#terminalBody .term-line');
  if (termLines.length) {
    if (reduceMotion) {
      termLines.forEach((l) => l.classList.add('is-typed'));
    } else {
      termLines.forEach((line, i) => {
        setTimeout(() => line.classList.add('is-typed'), 260 * i + 200);
      });
    }
  }

  /* ---------- starfield effect ---------- */
  const starsLayer = document.querySelector('.stars-layer');
  if (starsLayer) {
    const starCount = 48;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      const size = (Math.random() * 2.6 + 1).toFixed(2) + 'px';
      const left = (Math.random() * 100).toFixed(2) + '%';
      const delay = (Math.random() * 12).toFixed(2) + 's';
      const duration = (Math.random() * 16 + 10).toFixed(2) + 's';
      const xShift = (Math.random() * 50 - 25).toFixed(2) + 'px';
      star.style.width = size;
      star.style.height = size;
      star.style.left = left;
      star.style.animationDelay = delay;
      star.style.animationDuration = duration;
      star.style.transform = 'translateX(' + xShift + ')';
      starsLayer.appendChild(star);
    }
  }

  /* ---------- contact form (mailto) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const senderName = (formData.get('name') || '').toString().trim();
      const senderEmail = (formData.get('email') || '').toString().trim();
      const subject = (formData.get('subject') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const endpoint = contactForm.dataset.endpoint || window.FORM_ENDPOINT || '';

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : '';

      function setStatus(text, isError) {
        if (submitButton) submitButton.textContent = text;
        if (isError && submitButton) submitButton.style.borderColor = 'crimson';
      }

      if (endpoint) {
        // Progressive: send to provided endpoint (Formspree, EmailJS proxy, etc.)
        try {
          setStatus('Sending…');
          const resp = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });
          if (resp.ok) {
            setStatus('Sent — thank you!');
            contactForm.reset();
            setTimeout(() => { if (submitButton) submitButton.textContent = originalText; }, 2200);
          } else {
            const data = await resp.json().catch(() => ({}));
            console.warn('Form submit failed', data);
            setStatus('Send failed — opening mail', true);
            // fallback to mailto
            throw new Error('submit failed');
          }
        } catch (err) {
          // fallback to mailto behavior
          const mailtoSubject = encodeURIComponent(subject || 'Portfolio enquiry');
          const mailtoBody = encodeURIComponent(
            `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
          );
          window.location.href = `mailto:sk.mouad1@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
          contactForm.reset();
          setTimeout(() => { if (submitButton) submitButton.textContent = originalText; }, 1800);
        }
      } else {
        // no endpoint configured — open user's mail client
        const mailtoSubject = encodeURIComponent(subject || 'Portfolio enquiry');
        const mailtoBody = encodeURIComponent(
          `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:sk.mouad1@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        contactForm.reset();
        if (submitButton) {
          setStatus('Email ready');
          setTimeout(() => { if (submitButton) submitButton.textContent = originalText; }, 1800);
        }
      }
    });
  }

  /* ---------- copy to clipboard ---------- */
  function setupCopy(id) {
    const btn = document.getElementById(id);
    if (!btn) return;
    const flag = btn.querySelector('.copy-flag');
    const originalText = flag ? flag.textContent : '';

    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-value');
      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        const temp = document.createElement('textarea');
        temp.value = value;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      if (flag) {
        flag.textContent = 'Copied!';
        setTimeout(() => {
          flag.textContent = originalText;
        }, 1600);
      }
    });
  }
  setupCopy('copyPhone');
})();
