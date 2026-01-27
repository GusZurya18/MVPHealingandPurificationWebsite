// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .location-card, .package-card, .gallery-item, .testimonial-card, .map-info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hide/show WhatsApp button on scroll
let lastScroll = 0;
const whatsappBtn = document.querySelector('.whatsapp-float');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        whatsappBtn.style.transform = 'scale(1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 500) {
        whatsappBtn.style.transform = 'scale(0.8)';
    } else {
        whatsappBtn.style.transform = 'scale(1)';
    }
    
    lastScroll = currentScroll;
});