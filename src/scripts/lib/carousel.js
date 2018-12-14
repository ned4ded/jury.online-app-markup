import Swiper from 'swiper';
import { NAVBAR_COLLAPSE_BP, WIN_WIDTH } from '../constants';

export default function() {
  if(WIN_WIDTH >= NAVBAR_COLLAPSE_BP) {
    Array.from(document.querySelectorAll('[data-carousel="swiper"]')).forEach(n => new Swiper(n, {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 2,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
    }));
    const slides = document.querySelectorAll('[data-carousel="swiper-attach"] .swiper-slide');
    const sliders = document.querySelectorAll('[data-carousel="swiper-attach"]');
    if (slides.length <=3) return;
    $(sliders).addClass('is-init');
    Array.from(sliders).forEach(n => new Swiper(n, {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 2,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
    }));
  }
}
