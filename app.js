// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initSmoothScrolling();
    initAnimatedCounters();
    initGallery();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    initTimelineAnimations();
    initMorphCardEffects();
    initSubjectCardEffects();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1500);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (navHamburger && navMenu) {
        navHamburger.addEventListener('click', function(e) {
            e.preventDefault();
            navHamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navHamburger && navMenu) {
                navHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Smooth Scrolling - Fixed
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 70;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated Counters
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 60;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }

    // Trigger animation when hero section is in view
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 1500);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heroSection);
    }
}

// Gallery Functionality - Fixed
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = modal ? modal.querySelector('.modal-title') : null;
    const modalDescription = modal ? modal.querySelector('.modal-description') : null;

    // Filter functionality - Fixed
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items with animation
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal functionality - Fixed
    if (modal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    const title = overlay.querySelector('h4') ? overlay.querySelector('h4').textContent : 'Gallery Image';
                    const description = overlay.querySelector('p') ? overlay.querySelector('p').textContent : 'Image description';
                    
                    if (modalTitle) modalTitle.textContent = title;
                    if (modalDescription) modalDescription.textContent = description;
                }
                
                modal.classList.remove('hidden');
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        const modalOverlay = modal.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
}

// Contact Form - Enhanced
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-control');
    
    // Form validation - Enhanced
    function validateField(field) {
        const value = field.value.trim();
        const errorMsg = field.parentNode.querySelector('.error-message');
        let isValid = true;

        // Clear previous error state
        field.classList.remove('error');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }

        if (value === '') {
            showError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.name === 'name' && value.length < 2) {
            showError(field, 'Name must be at least 2 characters');
            isValid = false;
        } else if (field.name === 'message' && value.length < 10) {
            showError(field, 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.classList.add('show');
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            submitForm();
        } else {
            // Focus on first error field
            const firstError = form.querySelector('.form-control.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    function submitForm() {
        const btnText = form.querySelector('.btn-text');
        const btnLoading = form.querySelector('.btn-loading');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Show loading state
        if (btnText) btnText.classList.add('hide');
        if (btnLoading) btnLoading.classList.add('show');
        if (submitBtn) submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Clear any error states
            inputs.forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                }
            });
            
            // Reset button state
            if (btnText) btnText.classList.remove('hide');
            if (btnLoading) btnLoading.classList.remove('show');
            if (submitBtn) submitBtn.disabled = false;

            // Show success message
            showSuccessMessage();
        }, 2000);
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Thank you for your message! We'll get back to you soon.
        `;
        successDiv.style.cssText = `
            background: rgba(var(--color-success-rgb), 0.1);
            color: var(--color-success);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            border: 1px solid rgba(var(--color-success-rgb), 0.3);
            margin-bottom: var(--space-16);
            display: flex;
            align-items: center;
            gap: var(--space-8);
        `;

        form.insertBefore(successDiv, form.firstChild);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Back to Top Button - Fixed
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Click handler - Fixed
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.value-card, .subject-card, .gallery-item, .contact-item, .requirement-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Morph Card Effects - Fixed
function initMorphCardEffects() {
    const morphCards = document.querySelectorAll('.morph-card');
    
    morphCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Subject Card Hover Effects - Fixed
function initSubjectCardEffects() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
            // Add card lift effect
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            // Reset card position
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Download Button Functionality
function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Simulate PDF download
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Download Started!';
            this.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Smooth reveal animations on scroll
function initRevealAnimations() {
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.section-header, .principal-message, .admission-requirements');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.style.opacity = '1';
                reveal.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize reveal animations
    const revealElements = document.querySelectorAll('.section-header, .principal-message, .admission-requirements');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load
}

// Enhanced gallery item interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Enhanced form interactions
function initFormInteractions() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.parentNode.querySelector('.form-label');
            if (label) {
                label.style.color = 'var(--color-primary)';
            }
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = 'var(--focus-ring)';
        });

        input.addEventListener('blur', function() {
            const label = this.parentNode.querySelector('.form-label');
            if (label) {
                label.style.color = '';
            }
            if (!this.classList.contains('error')) {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    });
}

// Accessibility enhancements
function initAccessibility() {
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for gallery items
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('gallery-item')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all additional features
document.addEventListener('DOMContentLoaded', function() {
    initDownloadButton();
    initParallaxEffect();
    initRevealAnimations();
    initGalleryInteractions();
    initFormInteractions();
    initAccessibility();
    
    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-link, .subject-card, .gallery-item, .value-card'
    );
    
    interactiveElements.forEach(element => {
        if (!element.style.transition) {
            element.style.transition = 'all 0.3s ease';
        }
    });
});

// Final initialization when everything loads
window.addEventListener('load', function() {
    // Ensure all animations are ready
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Initialize intersection observer for sections
    initSectionObserver();
});

// Section observer for advanced animations
function initSectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, options);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}