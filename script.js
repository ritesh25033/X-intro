document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Ensure all dropdowns are closed initially
    dropdownToggles.forEach(toggle => {
        toggle.classList.remove('link-open');
        toggle.setAttribute('aria-expanded', 'false');
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            // Open menu
            navMenu.classList.add('active');
            overlay.classList.add('active');
            openMenu.style.display = 'none';
            closeMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        openMenu.style.display = 'block';
        closeMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Dropdown functionality
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = this.classList.contains('link-open');
            
            // Close all dropdowns first
            dropdownToggles.forEach(otherToggle => {
                otherToggle.classList.remove('link-open');
                otherToggle.setAttribute('aria-expanded', 'false');
            });
            
            // If this dropdown wasn't open, open it
            if (!isCurrentlyOpen) {
                this.classList.add('link-open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('link-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Close all dropdowns on resize
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('link-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
});
