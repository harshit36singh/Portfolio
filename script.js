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
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.style.color = '#64b5f6'; // Soft Blue accent
        } else {
          navLink.style.color = '';
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
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
  
  if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #64b5f6;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
      mix-blend-mode: difference;
      display: none;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.display = 'block';
    });
    
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    const hoverElements = document.querySelectorAll('a, button, .tech-card, .project-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
      });
    });
  }
  
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
  
  console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #333;');
  console.log('%cLooking for something interesting? Check out my GitHub!', 'font-size: 14px; color: #666;');
  console.log('%c🔗 https://github.com/harshit36singh', 'font-size: 14px; color: #333;');
  
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
            background: #64b5f6;
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