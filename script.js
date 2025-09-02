// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission (replace with actual form handling)
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to projects section
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Parallax effect for vertical text
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const verticalTexts = document.querySelectorAll('.vertical-text');

        verticalTexts.forEach(text => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            text.style.transform = `translateY(calc(-50% + ${yPos}px))`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add hover effects to project previews
    const previews = document.querySelectorAll('.preview');
    previews.forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.opacity = '1';
            this.style.filter = 'none';
        });

        preview.addEventListener('mouseleave', function() {
            if (this.classList.contains('preview-left') || this.classList.contains('preview-right')) {
                this.style.transform = 'scale(1)';
                this.style.opacity = '0.6';
                this.style.filter = 'blur(1px)';
            } else {
                this.style.transform = 'scale(1)';
            }
        });
    });

    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
    `;
    document.body.appendChild(scrollIndicator);

    // Update scroll indicator based on current section
    function updateScrollIndicator() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const currentSection = Math.floor(scrolled / windowHeight);

        const dots = scrollIndicator.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator(); // Initial call
});

// Add CSS for scroll indicator
const style = document.createElement('style');
style.textContent = `
    .scroll-indicator {
        position: fixed;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        z-index: 1000;
    }

    .scroll-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
    }

    .scroll-dot.active {
        background: #ffffff;
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        .scroll-indicator {
            display: none;
        }
    }
`;
document.head.appendChild(style);
