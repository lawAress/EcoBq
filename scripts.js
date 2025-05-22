// scripts.js
window.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const carousel = document.querySelector('.carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    document.querySelector('.carousel-next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.carousel-prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });

    // Auto avance
    let carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);

    document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    });

    // Mostrar la primera slide al iniciar
    showSlide(currentSlide);

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const content = accordionItem.querySelector('.accordion-content');
    
            // Alternar la clase 'active' para expandir o contraer
            accordionItem.classList.toggle('active');
    
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    function revealSectionsOnScroll() {
        document.querySelectorAll('.section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.classList.add('visible');
            }
        });

        
}
document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1 && document.querySelector(targetId)) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            const headerOffset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            smoothScrollTo(targetPosition, 1200); // 1200ms = 1.2 segundos
        }
    });
});

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        // easeInOutQuad
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
    });

