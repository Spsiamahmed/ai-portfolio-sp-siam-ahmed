// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize skill level bars
function initializeSkillLevels() {
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.setProperty('--width', `${level}%`);
  });
}

// Enhanced scroll handling for header
function handleScroll() {
  const nav = document.querySelector('nav');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.skill-card, .project-card, .stat');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
  });
}

// Form handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const subject = this.querySelector('#subject').value.trim();
    const message = this.querySelector('#message').value.trim();
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

// Email validation helper
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Active section highlighting
function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === `#${current}`) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSkillLevels();
  animateOnScroll();
  
  // Update active section on scroll
  window.addEventListener('scroll', () => {
    updateActiveSection();
    handleScroll();
  });
  
  // Initial checks
  updateActiveSection();
  handleScroll();
});