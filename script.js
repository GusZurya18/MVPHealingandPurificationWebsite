// Modal functions
let selectedPackage = null;

// Open modal function with optional package parameter
function openBookingModal(packageName = null) {
    // Store the selected package
    if (packageName) {
        selectedPackage = packageName;
    }
    
    // Show modal
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Auto-select the package if provided
    if (selectedPackage) {
        const packageSelect = document.getElementById('packageSelect');
        for (let i = 0; i < packageSelect.options.length; i++) {
            if (packageSelect.options[i].value === selectedPackage) {
                packageSelect.selectedIndex = i;
                break;
            }
        }
    }
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedPackage = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        package: document.getElementById('packageSelect').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        participants: document.getElementById('participants').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        nationality: document.getElementById('nationality').value,
        message: document.getElementById('message').value
    };
    
    // Get package price and duration based on selected package
    let packageDetails = '';
    switch(formData.package) {
        case 'Purification':
            packageDetails = 'Rp 350K (2 Hours)';
            break;
        case 'Healing Energy':
            packageDetails = 'Rp 500K (3 Hours)';
            break;
        case 'Complete':
            packageDetails = 'Rp 750K (5 Hours)';
            break;
        case 'Group Session':
            packageDetails = 'Rp 2.5M (4 Hours)';
            break;
        case 'Couple Retreat':
            packageDetails = 'Rp 900K (4 Hours)';
            break;
        case 'Monthly Program':
            packageDetails = 'Rp 1.8M (4 Sessions/Month)';
            break;
        default:
            packageDetails = 'Not specified';
    }
    
    // Format date for display
    const formattedDate = formData.date ? new Date(formData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';
    
    // Create WhatsApp message - FIXED VERSION
    // The issue was with the & character not being properly handled in the URL
    // We'll use encodeURIComponent for the entire message to be safe
    const messageContent = 
        `*NEW BOOKING REQUEST - HEALING ENERGY & PURIFICATION*

*PACKAGE DETAILS*
📦 Selected Package: ${formData.package}
💰 Package Details: ${packageDetails}

*CUSTOMER INFORMATION*
👤 Full Name: ${formData.name}
📧 Email Address: ${formData.email}
📱 WhatsApp Number: ${formData.phone}
🌍 Nationality: ${formData.nationality}
👥 Number of Participants: ${formData.participants}
📅 Preferred Date: ${formattedDate}
⏰ Preferred Time: ${formData.time}

*SPECIAL REQUESTS/NOTES*
${formData.message || 'No special requests'}

_This booking request was submitted via Healing Energy & Purification website._`;
    
    const whatsappMessage = encodeURIComponent(messageContent);
    
    // Your WhatsApp number
    const whatsappNumber = '628983181563';
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    // Close modal after submission
    closeModal();
    
    // Show success message
    alert('Thank you! You will be redirected to WhatsApp to complete your booking.');
});

// Format phone input
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('0')) {
        value = '62' + value.substring(1);
    }
    e.target.value = value;
});

// Your existing JavaScript continues below...
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