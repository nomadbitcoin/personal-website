/**
 * Main JavaScript for Yan Luiz's Website
 * Simplified for stability
 */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  // 1. Mobile Menu Toggle
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-menu a");

  function setActiveNavLink() {
    if (!sections.length || !navItems.length) return;
    
    const headerHeight = header ? header.offsetHeight : 70;
    const scrollPosition = window.pageYOffset + headerHeight + 50;

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  }

  // Listeners
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        setActiveNavLink();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // Initial call
  setActiveNavLink();

  // 4. Read More Functionality
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.parentElement;
      const shortText = content.querySelector(".short-text");
      const expandedText = content.querySelector(".expanded-text");

      if (expandedText && shortText) {
        if (expandedText.style.display === "none" || !expandedText.style.display) {
          expandedText.style.display = "block";
          shortText.style.display = "none";
          this.textContent = "Show less ←";
        } else {
          expandedText.style.display = "none";
          shortText.style.display = "block";
          this.textContent = "Read more →";
        }
      }
    });
  });
});
