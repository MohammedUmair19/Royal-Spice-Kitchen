document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when a link is clicked
        const navItemsList = document.querySelectorAll('.nav-links .nav-item, .nav-links .btn');
        navItemsList.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.click(); // Trigger the toggle logic to close
                }
            });
        });
    }

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle reservation form submission
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const formContainer = resForm.parentElement;
            resForm.style.display = 'none';
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message fade-in';
            successMsg.innerHTML = `
                <h3 style="color: var(--accent-color); font-family: 'Playfair Display', serif; margin-bottom: 1rem; font-size: 2rem;">Thank you!</h3>
                <p style="color: var(--text-muted); font-size: 1.1rem;">Your reservation request has been sent.</p>
                <button class="btn btn-outline" style="margin-top: 2rem;" onclick="location.reload()">Make Another Reservation</button>
            `;
            successMsg.style.textAlign = 'center';
            successMsg.style.padding = '3rem 0';
            
            formContainer.appendChild(successMsg);
        });
    }

    // Set active link based on current page
    const currentPath = window.location.pathname;
    let page = currentPath.split('/').pop();
    
    if (!page || page === '') {
        page = 'index.html';
    }
    
    const navItems = document.querySelectorAll('.nav-links a.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === page) {
            item.classList.add('active');
        }
    });

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in-section');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve if you only want it to fade in once
                    // observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Menu category filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');

    if (filterBtns.length > 0 && menuItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                menuItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'flex';
                        // Trigger reflow for fresh animation
                        item.style.animation = 'none';
                        item.offsetHeight; /* trigger reflow */
                        item.style.animation = null; 
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
