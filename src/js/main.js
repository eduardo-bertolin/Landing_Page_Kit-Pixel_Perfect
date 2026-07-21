// Landing Page Kit - Main JavaScript
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Habilita rolar a rodinha do mouse e clicar-e-arrastar nos carrosséis
  const carousels = document.querySelectorAll('.overflow-x-auto, .scrollbar-hide');

  carousels.forEach((carousel) => {
    // Permitir Clicar e Arrastar com o mouse no computador/simulador com inércia fluida
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let lastX = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      lastX = e.pageX;
      velX = 0;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'default';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'default';
      if (Math.abs(velX) > 1) {
        carousel.scrollBy({ left: -velX * 6, behavior: 'smooth' });
      }
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      velX = e.pageX - lastX;
      lastX = e.pageX;
      const walk = (x - startX) * 1.4;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
});
