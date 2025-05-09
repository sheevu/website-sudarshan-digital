// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            if (menuIcon) {
                menuIcon.classList.toggle('active');

                // Add animation styles for the menu icon
                if (!document.getElementById('menu-icon-style')) {
                    const style = document.createElement('style');
                    style.id = 'menu-icon-style';
                    style.textContent = `
                        .menu-icon.active span:nth-child(1) {
                            transform: translateY(10px) rotate(45deg);
                        }

                        .menu-icon.active span:nth-child(2) {
                            opacity: 0;
                        }

                        .menu-icon.active span:nth-child(3) {
                            transform: translateY(-10px) rotate(-45deg);
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
    }

    // Services tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .section-header, .hero-content, .hero-image');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.classList.add('animate');
        });
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Add CSS for animations that are added by JS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .service-card.hovered {
            transform: translateY(-15px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
        }

        header.scrolled {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            background: rgba(255, 255, 255, 0.95);
        }

        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
            }

            .nav-links.active a {
                padding: 1rem 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
    `;

    document.head.appendChild(style);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.05}px`;
    }
});

// Enhanced hero heading with gradient animation
function setupHeroHeadingEffects() {
    const headingElement = document.querySelector('.hero-content h1');
    if (!headingElement) return;

    // Add shimmer effect on mousemove
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        // Update gradient position based on mouse
        headingElement.style.backgroundPosition = `${x}% ${y}%`;
    });

    // Add 3D tilt effect
    headingElement.addEventListener('mousemove', (e) => {
        const boundingRect = headingElement.getBoundingClientRect();
        const x = e.clientX - boundingRect.left;
        const y = e.clientY - boundingRect.top;
        const xPercent = x / boundingRect.width;
        const yPercent = y / boundingRect.height;

        const rotateX = (0.5 - yPercent) * 10;
        const rotateY = (xPercent - 0.5) * 10;

        headingElement.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    // Reset transform on mouseout
    headingElement.addEventListener('mouseleave', () => {
        headingElement.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)';
    });

    // Add enhanced text effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes border-gradient {
            0% { border-image-source: linear-gradient(90deg, #ff3d9a, #ff8c00); }
            25% { border-image-source: linear-gradient(90deg, #ff8c00, #8a3df5); }
            50% { border-image-source: linear-gradient(90deg, #8a3df5, #3d8bff); }
            75% { border-image-source: linear-gradient(90deg, #3d8bff, #3df5c5); }
            100% { border-image-source: linear-gradient(90deg, #3df5c5, #ff3d9a); }
        }

        .hero-content h1 {
            border-bottom: 4px solid transparent;
            border-image-slice: 1;
            border-image-source: linear-gradient(90deg, #ff3d9a, #8a3df5);
            animation: border-gradient 8s linear infinite;
            padding-bottom: 10px;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        /* Add a subtle white outline to make text more visible */
        .hero-content h1.gradient-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize hero heading effects when page loads
window.addEventListener('load', setupHeroHeadingEffects);

// Dynamic number animation for stats
function animateDynamicNumbers() {
    const statItems = document.querySelectorAll('.stat-item h3');

    statItems.forEach(item => {
        // Get the base value from the original text
        const originalValue = parseInt(item.textContent.replace(/[^\d]/g, ''));
        const prefix = item.textContent.includes('+') ? '+' : '';
        const suffix = item.textContent.includes('%') ? '%' : '';

        // Store the original value as a data attribute
        item.setAttribute('data-base-value', originalValue);

        // Create a fluctuation range (±10% of the original value)
        const fluctuationRange = Math.floor(originalValue * 0.1);

        // Initial counter animation to the base value
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / originalValue);

        const initialCounter = setInterval(() => {
            count++;
            item.textContent = `${prefix}${count}${suffix}`;

            if (count >= originalValue) {
                clearInterval(initialCounter);

                // After reaching the base value, start the fluctuation animation
                startFluctuationAnimation(item, originalValue, fluctuationRange, prefix, suffix);
            }
        }, interval);
    });
}

// Function to continuously fluctuate numbers
function startFluctuationAnimation(element, baseValue, range, prefix, suffix) {
    // Create a subtle pulsing effect with random number generation
    setInterval(() => {
        // Generate a random number within the fluctuation range
        const randomFluctuation = Math.floor(Math.random() * (range * 2)) - range;
        const newValue = baseValue + randomFluctuation;

        // Update the display with a smooth transition
        element.style.transform = 'translateY(-5px)';
        element.style.opacity = '0.8';

        setTimeout(() => {
            element.textContent = `${prefix}${newValue}${suffix}`;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 200);
    }, 3000); // Change values every 3 seconds
}

// Initialize dynamic number animation when stats are visible
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const statsContainer = document.querySelector('.stats-container');

        if (statsContainer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateDynamicNumbers();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsContainer);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        setTimeout(animateDynamicNumbers, 1000);
    }
});
