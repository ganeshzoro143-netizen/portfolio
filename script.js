document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Navbar scroll effect and active link
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar shadow
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile navbar if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill Progress Bar Animation on Scroll using Intersection Observer
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
                // Unobserve after animating once
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Contact Form Submission Demo Alert
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Thank you! This form is currently a frontend demo. Please contact me through email.");
            contactForm.reset();
        });
    }

    // ===== Style Switcher Theme Toggle Logic =====
    const styleSwitcher = document.getElementById('style-switcher');
    const switcherToggle = document.getElementById('style-switcher-toggle');
    const switcherClose = document.querySelector('.switcher-close');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Toggle Style Switcher Panel
    if (switcherToggle && styleSwitcher) {
        switcherToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            styleSwitcher.classList.toggle('open');
        });
    }

    if (switcherClose && styleSwitcher) {
        switcherClose.addEventListener('click', (e) => {
            e.stopPropagation();
            styleSwitcher.classList.remove('open');
        });
    }

    // Close switcher when clicking outside
    document.addEventListener('click', (e) => {
        if (styleSwitcher && styleSwitcher.classList.contains('open')) {
            if (!styleSwitcher.contains(e.target)) {
                styleSwitcher.classList.remove('open');
            }
        }
    });

    // Safe storage wrapper functions
    function safeGetItem(key, defaultValue) {
        try {
            return localStorage.getItem(key) || defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    function safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // Ignore security errors
        }
    }

    // Theme switching function
    function setTheme(themeName) {
        // Remove all theme classes
        document.body.classList.remove('theme-gradient', 'theme-cyberpunk', 'theme-neobrutalist', 'theme-minimalist');
        
        // Add new theme class
        document.body.classList.add('theme-' + themeName);
        
        // Update active class on theme options in panel
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === themeName) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Save choice in localStorage
        safeSetItem('portfolio-theme', themeName);
    }

    // Bind click handlers to theme options
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedTheme = this.getAttribute('data-theme');
            setTheme(selectedTheme);
        });
    });

    // Initialize saved theme or default to gradient
    const savedTheme = safeGetItem('portfolio-theme', 'gradient');
    setTheme(savedTheme);
});
