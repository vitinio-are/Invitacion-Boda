document.addEventListener('DOMContentLoaded', function() {
    // ===== SLIDER =====
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideCount = slides.length;
    const slideInterval = 5000;

    function goToSlide(index) {
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 20}%)`;
    }

    nextBtn.addEventListener('click', () => {
        resetAutoSlide();
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        resetAutoSlide();
        goToSlide(currentIndex - 1);
    });

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, {passive: true});

    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (diff > 50) goToSlide(currentIndex + 1);
        if (diff < -50) goToSlide(currentIndex - 1);
        startAutoSlide();
    }, {passive: true});


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // ===== CUENTA REGRESIVA =====
function updateCountdown() {
    const ceremonyDate = new Date('2025-06-26T16:30:00');
    const now = new Date();
    
    let diff = ceremonyDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('ceremonia-dias').textContent = days;
        document.getElementById('ceremonia-horas').textContent = hours.toString().padStart(2, '0');
        document.getElementById('ceremonia-minutos').textContent = minutes.toString().padStart(2, '0');
    } else {
        document.getElementById('ceremonia-countdown').innerHTML = '<p class="highlight">¡La ceremonia ha comenzado!</p>';
    }
}
updateCountdown();

setInterval(updateCountdown, 60000);
//COMPORTAMIENTO DEL MENU

function createJacarandaPetals() {
    const container = document.querySelector('.jacaranda-fall');
    const petalCount = 50; 
    
    const petalImage = new Image();
    petalImage.src = './images/jacaranda-petal.jpg'; 
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('jacaranda-petal');
        
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() * 20 - 10); 
        
        const size = 20 + Math.random() * 15;
        
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        
        petal.style.backgroundImage = `url('${petalImage.src}')`;
        petal.style.setProperty('--end-x', `${endX - startX}vw`);
        petal.style.left = `${startX}vw`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
    
        const hueRotate = Math.random() * 30 - 15; 
        petal.style.filter = `hue-rotate(${hueRotate}deg)`;
        
        container.appendChild(petal);
    }
}
window.addEventListener('load', createJacarandaPetals);


});