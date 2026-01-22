document.addEventListener('DOMContentLoaded', () => {
 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80; // Height of fixed navbar
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let current = '';
    
    // Check if we're at the bottom of the page
    if (scrollY + windowHeight >= documentHeight - 50) {
      // We're at the bottom, highlight the last section (contact)
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      // Normal scroll detection
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if we're in this section (with some offset for navbar)
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
    }
    
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current section's link
    if (current) {
      const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
  
  // Run on scroll
  window.addEventListener('scroll', highlightNavigation);
  
  // Run on page load to highlight the current section
  highlightNavigation();
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  const animatedElements = document.querySelectorAll(
    '.tech-card, .project-card, .project-featured'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  const images = document.querySelectorAll('.project-image img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.filter = 'blur(10px)';
      img.addEventListener('load', () => {
        img.style.transition = 'filter 0.5s ease';
        img.style.filter = 'blur(0)';
      });
    }
  });
  
  
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
  
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const email = link.getAttribute('href').replace('mailto:', '');
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          // Create temporary notification
          const notification = document.createElement('div');
          notification.textContent = 'Email copied to clipboard!';
          notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #a78bfa;
            color: #0a0a0a;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
          `;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
          }, 2000);
        });
      }
    });
  });
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.style.opacity = '0';
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});