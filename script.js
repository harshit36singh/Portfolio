document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // MODE SWITCHING
  // =============================================
  const html = document.documentElement;
  const btnFlutter = document.getElementById('btnFlutter');
  const btnSpringBoot = document.getElementById('btnSpringBoot');
  const resumeBtn = document.getElementById('resumeBtn');

  // Flutter is default
  let currentMode = 'flutter';
  let isSwitching = false;

  // Resume files per mode
  const resumeFiles = {
    flutter: 'assets/Harshit_CV.pdf',
    springboot: 'assets/Harshit_Singh_CV.pdf'
  };

  function updateResume(mode) {
    if (resumeBtn) {
      resumeBtn.setAttribute('href', resumeFiles[mode]);
    }
  }

  function setMode(mode) {
    if (mode === currentMode || isSwitching) return;
    isSwitching = true;
    currentMode = mode;

    html.setAttribute('data-mode', mode);

    btnFlutter.classList.toggle('active', mode === 'flutter');
    btnSpringBoot.classList.toggle('active', mode === 'springboot');

    // Update resume link
    updateResume(mode);

    document.body.classList.add('switching');
    setTimeout(() => document.body.classList.remove('switching'), 300);

    const outClass = mode === 'flutter' ? 'springboot-content' : 'flutter-content';
    const inClass  = mode === 'flutter' ? 'flutter-content'   : 'springboot-content';

    const outEls = document.querySelectorAll(`.mode-content.${outClass}`);
    const inEls  = document.querySelectorAll(`.mode-content.${inClass}`);

    outEls.forEach(el => {
      el.style.transition = 'opacity 0.25s ease';
      el.style.opacity = '0';
    });

    setTimeout(() => {
      outEls.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '';
        el.style.transition = '';
      });

      inEls.forEach(el => {
        el.style.display = '';
        el.classList.add('fading-in');
      });

      // Re-observe tech cards for the newly shown content
      observeTechCards();
      // Re-setup project animations for newly visible projects
      setupProjectAnimations();

      setTimeout(() => {
        inEls.forEach(el => el.classList.remove('fading-in'));
        isSwitching = false;
      }, 450);
    }, 260);
  }

  btnFlutter.addEventListener('click', () => setMode('flutter'));
  btnSpringBoot.addEventListener('click', () => setMode('springboot'));

  // Set initial resume (flutter is default)
  updateResume('flutter');

  // =============================================
  // SMOOTH SCROLL
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =============================================
  // ACTIVE NAV HIGHLIGHTING
  // =============================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let current = '';

    if (scrollY + windowHeight >= documentHeight - 50) {
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
    }

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (current) {
      const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });
  highlightNavigation();

  // =============================================
  // INTERSECTION OBSERVER — tech cards
  // =============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  let techObserver;

  function observeTechCards() {
    if (techObserver) techObserver.disconnect();

    techObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          techObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.tech-card:not(.visible)').forEach(el => {
      techObserver.observe(el);
    });
  }

  observeTechCards();

  // =============================================
  // PROJECT FEATURED ANIMATION
  // =============================================
  let projectObserver;

  function setupProjectAnimations() {
    if (projectObserver) projectObserver.disconnect();

    projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.project-featured').forEach(el => {
      if (el.style.opacity !== '1') {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
      projectObserver.observe(el);
    });
  }

  setupProjectAnimations();

  // =============================================
  // IMAGE BLUR-IN ON LOAD
  // =============================================
  document.querySelectorAll('.project-image img').forEach(img => {
    if (!img.complete) {
      img.style.filter = 'blur(8px)';
      img.addEventListener('load', () => {
        img.style.transition = 'filter 0.4s ease';
        img.style.filter = 'blur(0)';
      });
    }
  });

  // =============================================
  // EMAIL COPY-TO-CLIPBOARD TOAST
  // =============================================
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const accent = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-accent').trim();
          const toast = document.createElement('div');
          toast.textContent = 'Email copied to clipboard!';
          toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 28px;
            background: ${accent};
            color: #0a0a0a;
            padding: .75rem 1.5rem;
            border-radius: 6px;
            font-family: 'Space Mono', monospace;
            font-size: .8rem;
            font-weight: 600;
            z-index: 10000;
            animation: toastIn 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,.4);
          `;
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        });
      }
    });
  });

  // =============================================
  // PAGE FADE-IN ON LOAD
  // =============================================
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 80);
  });

});