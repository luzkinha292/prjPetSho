document.addEventListener("DOMContentLoaded", function () {
    let splide = new Splide("#image-carousel", {
    type: "loop",
    perPage: 1,
    arrows: false, 
    pagination: true
}).mount();

function nextSlide() {
    splide.go("+1"); 
    setTimeout(nextSlide, 3500); 
}

    setTimeout(nextSlide, 5000);
});

