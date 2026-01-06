// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
  
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
  
  // Sticky header effect on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
  
  // CV Modal logic
  const cvBtn = document.getElementById('cvBtn');
  const cvModal = document.getElementById('cvModal');
  const closeModal = document.getElementById('closeModal');
  
  if (cvBtn && cvModal && closeModal) {
    cvBtn.addEventListener('click', () => {
      cvModal.classList.add('open');
    });
  
    closeModal.addEventListener('click', () => {
      cvModal.classList.remove('open');
    });
  
    cvModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        cvModal.classList.remove('open');
      }
    });
  }
  
  // Projects button scrolls to projects section
  const viewProjects = document.getElementById('viewProjects');
  const projectsSection = document.getElementById('projects');
  
  if (viewProjects && projectsSection) {
    viewProjects.addEventListener('click', () => {
      const offsetTop = projectsSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    });
  }
  
  // Contact form fake submit (frontend only)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
      contactForm.reset();
  
      setTimeout(() => {
        formStatus.textContent = '';
      }, 5000);
    });
  }
  
  // Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }