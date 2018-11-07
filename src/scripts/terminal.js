import 'bootstrap';
import './tooltip';
import './tags';
import './changeToggle';
import carousel from './lib/carousel';
import slider from './lib/slider';
import select from './lib/select';
import './projectAccordeon';
import './calendar';
import initNavbarToggle from './navbarToggle';


$(document).ready(function () {
  const body = document.querySelector('body');

  body.classList.remove('no-js');

  carousel();
  slider();
  select();
  initNavbarToggle();
});
