document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a[data-page]");
  const pages = document.querySelectorAll(".page");
  const nav = document.querySelector("nav");
  const body = document.body;

  // Define colors for each page
  const pageColors = {
    about: "#f5a000",     // orange
    projects: "#6cd4ff",  // blue
    contact: "#8ef59b"    // green
  };

// Set default (About page)
const defaultPage = document.getElementById("about");
if (defaultPage) defaultPage.classList.add("active");

// Highlight ABOUT link on load
const defaultLink = document.querySelector('nav a[data-page="about"]');
if (defaultLink) defaultLink.classList.add("active");

nav.style.backgroundColor = pageColors.about;
body.style.backgroundColor = pageColors.about;


  // Handle navigation
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");

      // Hide all pages
      pages.forEach(page => page.classList.remove("active"));

      // Show clicked one
      const targetPage = document.getElementById(pageId);
      if (targetPage) targetPage.classList.add("active");

      // Change nav + body color to match page
      const color = pageColors[pageId];
      if (color) {
        nav.style.backgroundColor = color;
        body.style.backgroundColor = color;
      }

      // Change link color (active effect)
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ---- Project Scroll Buttons ----
  const grid = document.querySelector(".projects-grid");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  function scrollProjects(direction) {
    if (!grid) return;
    const scrollAmount = grid.clientWidth / 2; // roughly two cards width
    grid.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }

  // Button click events
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => scrollProjects(-1));
    rightBtn.addEventListener("click", () => scrollProjects(1));
  }

  // Optional: show arrows only when hover over project section
  const wrapper = document.querySelector(".projects-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => {
      leftBtn.style.opacity = "1";
      rightBtn.style.opacity = "1";
    });
    wrapper.addEventListener("mouseleave", () => {
      leftBtn.style.opacity = "0.2";
      rightBtn.style.opacity = "0.2";
    });
  }

  // ---- Custom Cursor ----
  const cursorHTML = `
    <div class="cursor">
      <div class="cursor-inner"></div>
      <div class="cursor-outer"></div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", cursorHTML);

  const inner = document.querySelector(".cursor-inner");
  const outer = document.querySelector(".cursor-outer");

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  // Track mouse
 document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  inner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

const follow = () => {
  outerX += (mouseX - outerX) * 0.15;
  outerY += (mouseY - outerY) * 0.15;
  outer.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
  requestAnimationFrame(follow);
};

  follow();
});
// Cursor hover effect
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    outer.style.transform += " scale(1.6)";
    inner.style.transform += " scale(0.7)";
  });
  el.addEventListener("mouseleave", () => {
    outer.style.transform = outer.style.transform.replace(" scale(1.6)", "");
    inner.style.transform = inner.style.transform.replace(" scale(0.7)", "");
  });
});
document.addEventListener("mousemove", e => {
  cursorVisible = true;
  document.querySelector(".cursor").style.opacity = "1";
});
document.addEventListener("mousemove", e => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
  outer.style.transform = `translate(${outerX + moveX}px, ${outerY + moveY}px) translate(-50%, -50%)`;
});
