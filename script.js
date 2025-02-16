function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const thumbnails = document.querySelectorAll(".carousel-thumbnails img");

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove("active", "previous", "next");

            if (i === index) {
                item.classList.add("active");
            } else if (i < index) {
                item.classList.add("previous");
            } else {
                item.classList.add("next");
            }
        });

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Auto-play 
    let autoPlayInterval = setInterval(nextSlide, 5000);

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Pause autoplay sur hover
    document.querySelector(".carousel").addEventListener("mouseenter", stopAutoPlay);
    document.querySelector(".carousel").addEventListener("mouseleave", startAutoPlay);

    showSlide(currentIndex); // Initialise l'affichage
});


