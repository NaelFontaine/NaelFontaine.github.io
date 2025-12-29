document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const subTabLinks = document.querySelectorAll('.sub-tab-link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Main tab functionality
    tabLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');

            // Remove active and loading classes
            tabContents.forEach(function(content) {
                content.classList.remove('active', 'loading');
            });
            tabLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            // Add 'loading' class to new content
            const newTabContent = document.getElementById(tabId);
            newTabContent.classList.add('active', 'loading');
            this.classList.add('active');

            // Simulate loading with a delay
            setTimeout(function() {
                newTabContent.classList.remove('loading');
            }, 500); // 500ms delay

            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Sub-tab functionality
    subTabLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const subTabId = this.getAttribute('data-subtab');
            const parentSection = this.closest('.tab-content');

            // Remove active classes from sub-tabs
            parentSection.querySelectorAll('.sub-tab-content').forEach(function(content) {
                content.classList.remove('active');
            });
            parentSection.querySelectorAll('.sub-tab-link').forEach(function(link) {
                link.classList.remove('active');
            });

            // Add active class to selected sub-tab
            this.classList.add('active');
            parentSection.querySelector('#' + subTabId).classList.add('active');
        });
    });

    // Section Navigation within Career Development
    const sectionNavButtons = document.querySelectorAll('.section-nav-btn');

    sectionNavButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Carousel functionality
    const carouselImages = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        });

        // Initialize carousel
        showImage(currentIndex);
    }

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Fade-in on scroll effect
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    

    // Ensure no parallax effect on the welcome photo
    // Removed the parallax code completely
});
