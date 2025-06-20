document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            openMenu.style.display = 'none';
            closeMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
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
            const dropdown = this.closest('.dropdown');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.closest('.dropdown').classList.remove('active');
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            const isExpanded = dropdown.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').classList.remove('active');
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
        }
    });
});
