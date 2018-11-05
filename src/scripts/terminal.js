import 'bootstrap';
import './tooltip';
import './select';
import './tags';
import './changeToggle';
import swiper from './vendor/swiper';
import './projectAccordeon';
import './calendar';
import initNavbarToggle from './navbarToggle';


$(document).ready(function () {
  const body = document.querySelector('body');

  body.classList.remove('no-js');

  swiper();
  initNavbarToggle();
});
