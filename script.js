// DOM Elements
const loader = document.querySelector('.loader-wrapper');
const navbar = document.querySelector('.navbar');
const modeToggle = document.getElementById('modeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const bgAnimation = document.getElementById('bgAnimation');
const resumeBtn = document.getElementById('resumeBtn');
const toast = document.getElementById('toast');
const filterBtns = document.querySelectorAll('.filter-btn');
const educationCards = document.querySelectorAll('.education-card');

// Fix Loading Screen Issue
// This event listener waits for all content to be fully loaded before removing the loader
window.addEventListener('load', () => {
    // Set a small timeout to ensure animations are smooth
    setTimeout(() => {
        // Fade out the loader
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove loader from DOM after the fade-out animation completes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1000);
});

// Education section filtering
if (filterBtns.length > 0 && educationCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter education cards
            educationCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Add animation to education cards on scroll
const observeEducation = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-education');
            observeEducation.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

educationCards.forEach(card => {
    observeEducation.observe(card);
});

// Resume Download Button Functionality
if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        // We don't prevent default here to allow the download to happen
        
        // Show success message after a brief delay to simulate download starting
        setTimeout(() => {
            showToast();
        }, 500);
        
        // Track the download event for analytics (if needed)
        if (typeof gtag === 'function') {
            gtag('event', 'download', {
                'event_category': 'Resume',
                'event_label': 'Resume Download'
            });
        }
    });
}

// Function to show toast notification
function showToast() {
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Dark/Light Mode Toggle
let isDarkMode = true; // Default is dark mode

modeToggle.addEventListener('click', () => {
    if (isDarkMode) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // Switch to dark mode
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    isDarkMode = !isDarkMode;
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBackdrop.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto'; // Re-enable scrolling when menu is closed
    }
});

// Close mobile menu when clicking outside or on a link
mobileMenuBackdrop.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBackdrop.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
    });
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Skill Progress Bar Animation
const animateSkillBars = () => {
    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
};

// Intersection Observer for Skill Progress Bars
// This ensures the animation only plays when the skills section is visible
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

observer.observe(skillsSection);

// Back to Top Button
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

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only prevent default for internal links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll with improved animation
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                // Add a class to the target section for highlighting
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('section-highlight');
                });
                
                setTimeout(() => {
                    targetElement.classList.add('section-highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('section-highlight');
                    }, 1000);
                }, 500);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        let isValid = true;
        
        // Name validation
        if (name.trim() === '') {
            isValid = false;
            document.getElementById('name').classList.add('error');
        } else {
            document.getElementById('name').classList.remove('error');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            document.getElementById('email').classList.add('error');
        } else {
            document.getElementById('email').classList.remove('error');
        }
        
        // Subject validation
        if (subject.trim() === '') {
            isValid = false;
            document.getElementById('subject').classList.add('error');
        } else {
            document.getElementById('subject').classList.remove('error');
        }
        
        // Message validation
        if (message.trim() === '') {
            isValid = false;
            document.getElementById('message').classList.add('error');
        } else {
            document.getElementById('message').classList.remove('error');
        }
        
        if (isValid) {
            // In a real implementation, you would send the form data to a server
            alert('Message sent successfully!');
            contactForm.reset();
        }
    });
}

// Animated Background
const createParticle = () => {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(88, 166, 255, 0.5)';
    particle.style.borderRadius = '50%';
    
    // Random starting position
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight;
    particle.style.left = `${xPos}px`;
    particle.style.top = `${yPos}px`;
    
    // Random movement
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1;
    const xSpeed = Math.cos(angle) * speed;
    const ySpeed = Math.sin(angle) * speed;
    
    bgAnimation.appendChild(particle);
    
    // Animation
    let posX = xPos;
    let posY = yPos;
    
    const animate = () => {
        posX += xSpeed;
        posY += ySpeed;
        
        // Boundary check
        if (posX < 0 || posX > window.innerWidth || posY < 0 || posY > window.innerHeight) {
            particle.remove();
            return;
        }
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        requestAnimationFrame(animate);
    };
    
    animate();
    
    // Remove after a random time to prevent too many particles
    setTimeout(() => {
        if (bgAnimation.contains(particle)) {
            particle.remove();
        }
    }, 5000 + Math.random() * 5000);
};

// Create particles periodically for background effect
setInterval(() => {
    if (isDarkMode) {
        createParticle();
    }
}, 200);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add dark mode class to body by default
    document.body.classList.add('dark-mode');
    
    // Pre-load animations for smoother execution
    setTimeout(() => {
        animateSkillBars();
    }, 1500);
    
    // Initialize tooltips or any other UI components
    initializeComponents();
    
    // Add Schema.org structured data for better SEO
    addStructuredData();
});

// Initialize additional UI components
function initializeComponents() {
    // This function can be used to initialize any additional components
    // such as tooltips, modals, etc.
    console.log("Portfolio components initialized");
}

// Add structured data for better SEO
function addStructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Maitri Gupta",
        "jobTitle": "Security Analyst",
        "worksFor": {
            "@type": "Organization",
            "name": "TechDefenders Consulting Pvt. Ltd."
        },
        "url": window.location.href,
        "email": "maitri@techdefenders.in",
        "telephone": "+919723401337",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "India"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "Amity University",
                "sameAs": "https://www.amity.edu/"
            },
            {
                "@type": "EducationalOrganization",
                "name": "Gujarat University",
                "sameAs": "https://www.gujaratuniversity.ac.in/"
            }
        ],
        "knowsAbout": ["Cybersecurity", "VAPT", "Python", "Linux", "Networking", "Cryptography"]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(personSchema);
    document.head.appendChild(script);
}
