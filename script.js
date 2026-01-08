// Loading Screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
});

// Theme Toggle (works on both pages)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon', !isLight);
      icon.classList.toggle('fa-sun', isLight);
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

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
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

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

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Animated Skill Bars
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-fill');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Animated Counter for Hero Stats
function animateCounter(element, target, suffix = '+') {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target) + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.meta-value');
      counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text);
        if (!isNaN(number) && number > 0) {
          counter.textContent = '0+';
          animateCounter(counter, number);
        }
      });
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroMeta = document.querySelector('.hero-meta');
if (heroMeta) {
  heroObserver.observe(heroMeta);
}

// Typing Animation
const typingText = document.getElementById('typing-text');
if (typingText) {
  const text = "I build modern, user-focused software solutions while developing strong foundations in SDLC, service computing, web design, and project management.";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    } else {
      const cursor = document.querySelector('.typing-cursor');
      if (cursor) cursor.style.display = 'none';
    }
  }

  setTimeout(() => {
    type();
  }, 800);
}

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category) {
          if (filter === 'all' || category.includes(filter)) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.classList.add('hidden');
            }, 300);
          }
        }
      });
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

// Enhanced Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText ? btnText.textContent : 'Send Message';
      
      submitBtn.disabled = true;
      if (btnText) {
        btnText.textContent = 'Sending...';
      } else {
        submitBtn.textContent = 'Sending...';
      }
      
      // Simulate form submission
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
          formStatus.className = 'form-status success';
        }
        contactForm.reset();
        inputs.forEach(input => {
          input.classList.remove('error');
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.textContent = '';
            errorMsg.classList.remove('error-message');
          }
        });
        
        submitBtn.disabled = false;
        if (btnText) {
          btnText.textContent = originalText;
        } else {
          submitBtn.textContent = originalText;
        }
        
        setTimeout(() => {
          if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }
        }, 5000);
      }, 1500);
    } else {
      if (formStatus) {
        formStatus.textContent = 'Please fix the errors below.';
        formStatus.className = 'form-status error';
      }
    }
  });

  function validateField(field) {
    const errorMsg = field.nextElementSibling;
    let isValid = true;
    let message = '';

    // Remove previous error styling
    field.classList.remove('error');
    if (errorMsg && errorMsg.classList.contains('error-message')) {
      errorMsg.textContent = '';
    }

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      message = 'This field is required.';
    }
    // Email validation
    else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    }
    // Name validation
    else if (field.id === 'name' && field.value.trim().length > 0 && field.value.trim().length < 2) {
      isValid = false;
      message = 'Name must be at least 2 characters.';
    }
    // Message validation
    else if (field.id === 'message' && field.value.trim().length > 0 && field.value.trim().length < 10) {
      isValid = false;
      message = 'Message must be at least 10 characters.';
    }

    if (!isValid) {
      field.classList.add('error');
      if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add('error-message');
      }
    }

    return isValid;
  }
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// WhatsApp click tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', function() {
    console.log('WhatsApp link clicked');
  });
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
