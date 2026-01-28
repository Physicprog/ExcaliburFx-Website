/* ============================================
   RESPONSIVE JAVASCRIPT - OPTIMIZED
   Navbar toujours visible
   ============================================ */

/**
 * Responsive navbar scaling function
 * Scales navbar based on viewport dimensions with mobile optimization
 */
function scaleNavbarToWidth() {
    const header = document.getElementById("header");
    const hero = document.getElementById("skill-section");

    if (!header || !hero) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const marginRatio = 0.15;

    // Reset transform for larger screens
    if (viewportWidth - (viewportWidth * marginRatio) > viewportHeight) {
        header.style.transform = "none";
        hero.style.transform = "none";
        return;
    }

    // Calculate scale factor for smaller screens
    const scaleFactor = (viewportWidth / header.offsetWidth) * (1 - marginRatio);

    header.style.transformOrigin = "top center";
    hero.style.transformOrigin = "top center";
    header.style.transform = `scale(${scaleFactor})`;
    hero.style.transform = `scale(${scaleFactor})`;
}

/**
 * Debounce function to optimize resize performance
 */
function debounce(func, wait = 150) {
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

/**
 * Responsive carousel handler
 * Handles touch events and drag on mobile devices
 */
class ResponsiveCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.inner = this.carousel.querySelector('.carousel-inner');
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Mouse events
        this.inner.addEventListener('mousedown', this.touchStart.bind(this));
        this.inner.addEventListener('mouseup', this.touchEnd.bind(this));
        this.inner.addEventListener('mouseleave', this.touchEnd.bind(this));
        this.inner.addEventListener('mousemove', this.touchMove.bind(this));

        // Touch events for mobile
        this.inner.addEventListener('touchstart', this.touchStart.bind(this));
        this.inner.addEventListener('touchend', this.touchEnd.bind(this));
        this.inner.addEventListener('touchmove', this.touchMove.bind(this));

        // Start auto-scroll
        this.startAutoScroll();
    }

    touchStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
        this.inner.style.cursor = 'grabbing';

        // Stop auto-scroll when user interacts
        this.stopAutoScroll();
    }

    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);

        const movedBy = this.currentTranslate - this.prevTranslate;

        // Snap to nearest slide if moved significantly
        if (Math.abs(movedBy) > 50) {
            if (movedBy < 0) {
                this.currentIndex += 1;
            } else if (movedBy > 0) {
                this.currentIndex -= 1;
            }
        }

        this.setPositionByIndex();
        this.inner.style.cursor = 'grab';

        // Resume auto-scroll
        this.startAutoScroll();
    }

    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        }
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    animation() {
        this.setSliderPosition();
        if (this.isDragging) {
            requestAnimationFrame(this.animation.bind(this));
        }
    }

    setSliderPosition() {
        this.inner.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    setPositionByIndex() {
        const slides = this.inner.querySelectorAll('.slide');
        const slideWidth = slides[0].offsetWidth;
        this.currentTranslate = this.currentIndex * -slideWidth;
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (!this.isDragging) {
                this.currentTranslate -= 1;
                this.prevTranslate = this.currentTranslate;
                this.setSliderPosition();

                // Reset when reaching the end
                const innerWidth = this.inner.scrollWidth;
                if (Math.abs(this.currentTranslate) > innerWidth / 2) {
                    this.currentTranslate = 0;
                    this.prevTranslate = 0;
                }
            }
        }, 30);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
}

/**
 * Responsive viewport height setter for mobile
 * Handles dynamic viewport height changes on mobile browsers
 */
function setResponsiveVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Mobile menu handler
 * Handles mobile navigation toggling
 */
function handleMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-navigation');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
}

/**
 * Smooth scroll handler for anchor links
 */
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Responsive image loading
 * Lazy loads images based on viewport
 */
function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Settings panel handler
 */
function handleSettingsPanel() {
    const settingsIcon = document.querySelector('.settingsIcon');
    const settingsPanel = document.querySelector('.settingsPanel');

    if (!settingsIcon || !settingsPanel) return;

    settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('active');
    });

    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });
}

/**
 * Orientation change handler
 */
function handleOrientationChange() {
    const handleChange = () => {
        setResponsiveVH();
        scaleNavbarToWidth();

        // Add a small delay to ensure proper rendering
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    };

    window.addEventListener('orientationchange', handleChange);
    screen.orientation?.addEventListener('change', handleChange);
}

/**
 * Initialize all responsive features
 */
function initResponsiveFeatures() {
    // Set responsive viewport height
    setResponsiveVH();

    // Scale navbar
    scaleNavbarToWidth();

    // Initialize carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        new ResponsiveCarousel(carousel);
    }

    // Handle mobile menu
    handleMobileMenu();

    // Handle smooth scrolling
    handleSmoothScroll();

    // Handle responsive images
    handleResponsiveImages();

    // Handle settings panel
    handleSettingsPanel();

    // Handle orientation changes
    handleOrientationChange();

    // Add optimized resize listener
    window.addEventListener('resize', debounce(() => {
        setResponsiveVH();
        scaleNavbarToWidth();
    }, 150));

    // NAVBAR TOUJOURS VISIBLE - Code scroll désactivé
    // Le code qui cachait la navbar au scroll a été retiré
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResponsiveFeatures);
} else {
    initResponsiveFeatures();
}

// Re-initialize on page load (for cached pages)
window.addEventListener('load', () => {
    setResponsiveVH();
    scaleNavbarToWidth();
});

// Export functions for external use
window.ResponsiveUtils = {
    scaleNavbarToWidth,
    setResponsiveVH,
    debounce
};