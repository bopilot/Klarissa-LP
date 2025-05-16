// Main JavaScript File
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('is-active');
      nav.classList.remove('is-active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Testimonials Slider
  const testimonialSlider = document.querySelector('.testimonials__slider');
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonials__nav-btn--prev');
  const nextBtn = document.querySelector('.testimonials__nav-btn--next');
  
  if (testimonialSlider && testimonials.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = 'none';
      }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
      testimonials[currentIndex].style.display = 'none';
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      testimonials[currentIndex].style.display = 'block';
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
      testimonials[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].style.display = 'block';
    });
  }
  
  // Form Handling
  const leadForm = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  
  if (leadForm && formSuccess) {
    // Get UTM parameters from URL and set them in hidden fields
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource) document.getElementById('utm_source').value = utmSource;
    if (utmMedium) document.getElementById('utm_medium').value = utmMedium;
    if (utmCampaign) document.getElementById('utm_campaign').value = utmCampaign;
    
    // Form submission
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to your server or a service like Formspree
      // For this demo, we'll just show the success message
      
      // Simulate form submission delay
      setTimeout(() => {
        leadForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to the success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    });
  }
  
  // Sticky Header
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
});
