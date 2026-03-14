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
});
