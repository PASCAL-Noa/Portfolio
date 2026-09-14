(function () {
  "use strict";

  function initNavigation() {
    const hamburgerButton = document.querySelector(".hamburger-icon");
    const menuLinks = document.querySelector(".menu-links");

    if (!hamburgerButton || !menuLinks) return;

    function toggleNavigation(forceState) {
      const isOpen = typeof forceState === "boolean"
        ? forceState
        : !menuLinks.classList.contains("open");

      menuLinks.classList.toggle("open", isOpen);
      hamburgerButton.classList.toggle("open", isOpen);
      hamburgerButton.setAttribute("aria-expanded", String(isOpen));
    }

    hamburgerButton.addEventListener("click", () => toggleNavigation());

    menuLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggleNavigation(false);
      }
    });

    document.addEventListener("click", (event) => {
      const isClickInside = hamburgerButton.contains(event.target) || menuLinks.contains(event.target);
      if (!isClickInside && menuLinks.classList.contains("open")) {
        toggleNavigation(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuLinks.classList.contains("open")) {
        toggleNavigation(false);
        hamburgerButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200 && menuLinks.classList.contains("open")) {
        toggleNavigation(false);
      }
    });
  }

  function initImageModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("zoomed-image");
    const closeButton = modal ? modal.querySelector(".close") : null;
    const carouselImages = document.querySelectorAll(".carousel-item img");

    if (!modal || !modalImg) return;

    function openModal(imageSource, imageAlt) {
      modalImg.src = imageSource;
      modalImg.alt = imageAlt || "Image agrandie";
      modal.classList.add("modal-visible");
      modal.setAttribute("aria-hidden", "false");
      if (closeButton) closeButton.focus();
    }

    function closeModal() {
      modal.classList.remove("modal-visible");
      modal.setAttribute("aria-hidden", "true");
      modalImg.src = "";
    }

    carouselImages.forEach((image) => {
      image.addEventListener("click", () => {
        openModal(image.currentSrc || image.src, image.alt);
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("modal-visible")) {
        closeModal();
      }
    });
  }

  function initCarousel() {
    const carouselContainer = document.querySelector(".carousel");
    if (!carouselContainer) return;

    const slides = Array.from(carouselContainer.querySelectorAll(".carousel-item"));
    if (slides.length <= 1) return;

    const prevButton = carouselContainer.querySelector(".prev-btn");
    const nextButton = carouselContainer.querySelector(".next-btn");
    const thumbnails = Array.from(document.querySelectorAll(".game-thumbnails .thumbnail"));
    const thumbnailsContainer = document.querySelector(".game-thumbnails");

    let activeIndex = 0;
    let autoPlayTimerId = null;

    function hasInteractiveMedia(slideElement) {
      return Boolean(slideElement.querySelector("iframe, video"));
    }

    function syncThumbnailsScroll(index) {
      const activeThumb = thumbnails[index];
      if (!thumbnailsContainer || !activeThumb) return;

      const offset = activeThumb.offsetLeft - (thumbnailsContainer.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
      thumbnailsContainer.scrollTo({ left: offset, behavior: "smooth" });
    }

    function updateSlides(targetIndex) {
      slides.forEach((slide, index) => {
        slide.classList.remove("active", "previous", "next");
        if (index === targetIndex) {
          slide.classList.add("active");
        } else if (index < targetIndex) {
          slide.classList.add("previous");
        } else {
          slide.classList.add("next");
        }
      });

      thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === targetIndex);
      });

      syncThumbnailsScroll(targetIndex);
    }

    function stopAutoPlay() {
      if (autoPlayTimerId !== null) {
        clearInterval(autoPlayTimerId);
        autoPlayTimerId = null;
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      if (hasInteractiveMedia(slides[activeIndex])) return;
      autoPlayTimerId = setInterval(() => {
        goToSlide((activeIndex + 1) % slides.length);
      }, 5000);
    }

    function goToSlide(newIndex) {
      activeIndex = (newIndex + slides.length) % slides.length;
      updateSlides(activeIndex);
      startAutoPlay();
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => goToSlide(activeIndex - 1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => goToSlide(index));
    });

    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);

    carouselContainer.setAttribute("tabindex", "0");
    carouselContainer.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });

    updateSlides(0);
    startAutoPlay();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initImageModal();
    initCarousel();
  });
})();
