/* ==========================================================================
   ⚠️ GOOGLE APPS SCRIPT CONFIGURATION (यहाँ अपना URL बदलें)
   ========================================================================== */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzjKYDZ5fTuScrCYWlGn47bJseEVIaC7NOWc5N2rgMHh1bq8MKFb7F-RWPOMAYM50pZA/exec";
/* ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Subtle Cascade Animation Engine
  const animatedCards = document.querySelectorAll('.cyber-card, .district-card');

  const cascadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedCards.forEach((card, index) => {
    card.style.transitionDelay = `${(index % 2) * 0.08}s`;
    cascadeObserver.observe(card);
  });

  // 2. Active Anchor Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".desktop-nav-links .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
});

// Mobile Drawer Handler
function toggleDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.toggle('open');
}

// Modal Handlers
function openDemoPopup(preSelectedClass) {
  if (preSelectedClass) {
    const classSelect = document.getElementById('student_class');
    if (classSelect) classSelect.value = preSelectedClass;
  }
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.add('active');
}

function closeDemoPopup() {
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.remove('active');
}

// 1. Modal Popup Form Submit
document.getElementById('googleSheetForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;

  const formData = {
    name: document.getElementById('student_name').value.trim(),
    phone: document.getElementById('student_phone').value.trim(),
    class: document.getElementById('student_class').value,
    board: document.getElementById('student_board').value,
    district: document.getElementById('student_district').value.trim(),
    block: document.getElementById('student_block').value.trim(),
    submissionDate: new Date().toLocaleString()
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(() => {
    alert("Registration Successful! 🎉 Our academic mentor will call you shortly.");
    closeDemoPopup();
    document.getElementById('googleSheetForm').reset();
  }).catch(() => {
    alert("Submitted! We will connect with you soon.");
  }).finally(() => {
    submitBtn.innerText = "Submit & Get Call Back →";
    submitBtn.disabled = false;
  });
});

// 2. Main Page Form Submit
document.getElementById('contactPageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('c_submitBtn');
  btn.innerText = "Submitting Details...";
  btn.disabled = true;

  const payload = {
    name: document.getElementById('c_name').value.trim(),
    phone: document.getElementById('c_phone').value.trim(),
    class: document.getElementById('c_class').value,
    board: document.getElementById('c_board').value,
    district: document.getElementById('c_district').value.trim(),
    block: document.getElementById('c_block').value.trim(),
    submissionDate: new Date().toLocaleString()
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    alert("Registration Received! Welcome to Purix Academy 🎉");
    document.getElementById('contactPageForm').reset();
  }).catch(() => {
    alert("Registration submitted! Our mentor will call you.");
  }).finally(() => {
    btn.innerText = "Submit & Request Demo →";
    btn.disabled = false;
  });
});
