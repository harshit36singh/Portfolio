document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);
  
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
      cursor.style.backgroundColor = newTheme === "dark" ? "#ffffff" : "#111111";
    }
  });

  
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navOverlay = document.querySelector(".nav-overlay");
  const navClose = document.querySelector(".nav-close");
  const body = document.body;
  
  function openNavMenu() {
    navOverlay.classList.add("active");
    hamburgerMenu.classList.add("active");
    body.style.overflow = "hidden";
  }
  
  function closeNavMenu() {
    navOverlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    body.style.overflow = "";
  }
  
  hamburgerMenu.addEventListener("click", () => {
    if (navOverlay.classList.contains("active")) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  });
  
  navClose.addEventListener("click", closeNavMenu);
  
  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navOverlay.classList.contains("active")) {
      closeNavMenu();
    }
  });

  
  const navLinks = document.querySelectorAll(".nav-link, .nav-menu-link");
  const pages = document.querySelectorAll(".page");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const pageId = link.getAttribute("data-page");
      
      pages.forEach(page => page.classList.remove("active"));
      document.querySelectorAll(".nav-link, .nav-menu-link").forEach(navLink => {
        navLink.classList.remove("active");
      });
      
      link.classList.add("active");
      document.querySelectorAll(`[data-page="${pageId}"]`).forEach(l => {
        l.classList.add("active");
      });
      
      const targetPage = document.getElementById(pageId);
      if (targetPage) {
        targetPage.classList.add("active");
      }
      
      if (navOverlay.classList.contains("active")) {
        closeNavMenu();
      }
      
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".project-item, .service-block, .contact-method"
  );
  
  animateElements.forEach(el => {
    observer.observe(el);
  });

  
  const projectLinks = document.querySelectorAll(".project-link");
  
  projectLinks.forEach(link => {
    link.addEventListener("mouseenter", function() {
      const projectItem = this.closest(".project-item");
      if (projectItem) {
        projectItem.style.transform = "translateX(15px)";
      }
    });
    
    link.addEventListener("mouseleave", function() {
      const projectItem = this.closest(".project-item");
      if (projectItem) {
        projectItem.style.transform = "translateX(10px)";
      }
    });
  });

  
  let cursorX = 0;
  let cursorY = 0;
  let mouseX = 0;
  let mouseY = 0;
  
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  const currentTheme = html.getAttribute("data-theme");
  const cursorColor = currentTheme === "dark" ? "#ffffff" : "#111111";
  
  cursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: ${cursorColor};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: difference;
    transition: transform 0.2s ease, background-color var(--transition-theme);
    display: none;
  `;
  
  if (window.innerWidth > 1024) {
    document.body.appendChild(cursor);
    cursor.style.display = "block";
    
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform += " scale(2)";
      });
      
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = cursor.style.transform.replace(" scale(2)", "");
      });
    });
  }
  
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        header.style.boxShadow = "0 2px 10px rgba(255, 255, 255, 0.05)";
      } else {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
      }
    } else {
      header.style.boxShadow = "none";
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    
    lastScrollY = currentScrollY;
  });
  
  header.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

  document.body.style.opacity = "1";

  
  const projectItems = document.querySelectorAll(".project-item");
  
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  }, {
    threshold: 0.2
  });
  
  projectItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    projectObserver.observe(item);
  });

  
  const serviceBlocks = document.querySelectorAll(".service-block");
  
  serviceBlocks.forEach(block => {
    block.addEventListener("mouseenter", function() {
      this.style.borderColor = "var(--color-text)";
    });
    
    block.addEventListener("mouseleave", function() {
      this.style.borderColor = "var(--color-border)";
    });
  });

  
  console.log("%c👋 Hello there!", "font-size: 20px; font-weight: bold;");
  console.log("%cInterested in how this was built?", "font-size: 14px;");
  console.log("%cFeel free to reach out!", "font-size: 14px; color: #666;");
});


document.body.style.opacity = "0";