document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false,
        },
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const slideWidth = carousel.offsetWidth; 
    let currentIndex = 0;
    const totalSlides = slides.length;

    
function updateCarousel() {
    const offset = -(currentIndex * slideWidth); 
    slidesContainer.style.transform = `translateX(${offset}px)`;     
}

    
function moveNext() {
    currentIndex = (currentIndex + 1) % totalSlides; 
    updateCarousel();
}

function movePrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; 
    updateCarousel();
}

    rightArrow.addEventListener('click', () => {
    moveNext();
});


    leftArrow.addEventListener('click', () => {
    movePrev();
});

    let autoScrollInterval;
    function startAutoScroll() {
    autoScrollInterval = setInterval(moveNext, 3000);
}

    
    function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

    carousel.addEventListener('mouseenter', stopAutoScroll);

    carousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
});
