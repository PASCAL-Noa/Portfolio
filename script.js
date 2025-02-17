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
    const thumbnails = document.querySelectorAll(".game-thumbnails img");
    let autoScroll = setInterval(nextSlide, 5000);

    function isVideoSlide(index) {
        return items[index].querySelector("iframe") !== null; // Vérifie si la slide contient une vidéo
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScroll = setInterval(nextSlide, 5000);
    }

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

        // 🚀 STOP AUTO-SCROLL SI LA VIDÉO EST AFFICHÉE
        if (isVideoSlide(index)) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
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

    showSlide(currentIndex);
});


const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("zoomed-image");
const closeBtn = document.querySelector(".close");

// Ouvrir le zoom en cliquant sur une image du carousel
document.querySelectorAll(".carousel-item img").forEach(img => {
    img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
    });
});

// Fermer le zoom en cliquant sur la croix ou en dehors de l’image
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});




