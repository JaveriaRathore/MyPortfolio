// Javeria Rathore — Portfolio interactions
"use strict";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const currentYear = document.getElementById("currentYear");

// Keep the footer year up to date automatically.
currentYear.textContent = new Date().getFullYear();

// Mobile navigation: open/close the menu and close it after selecting a section.
function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", closeMenu);
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        const matches = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", matches);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

// This is a front-end demonstration only. It validates inputs and opens an email
// draft only after you replace YOUR_EMAIL@example.com with your real email address.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("error");

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent = "Please complete all fields with valid information.";
    formStatus.classList.add("error");
    return;
  }

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();
  const emailLink = document.getElementById("emailLink");
  const recipient = emailLink.getAttribute("href").replace(/^mailto:/i, "");

  if (!recipient || recipient === "jaweriyarathore@gmail.com" || !recipient.includes("@")) {
    formStatus.textContent = "The form is valid. To send messages, replace jaweriyarathore@gmail.com in index.html with your real email address.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  formStatus.textContent = "Your email app should open with the message ready to review.";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});


const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  // Restore the saved theme
  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light-mode");
  }

  function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");

   themeToggle.textContent = isLight ? "☾" : "☼";

    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const theme = document.body.classList.contains("light-mode")
      ? "light"
      : "dark";

    localStorage.setItem("portfolio-theme", theme);
    updateThemeButton();
  });
}
