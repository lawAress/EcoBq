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
});
