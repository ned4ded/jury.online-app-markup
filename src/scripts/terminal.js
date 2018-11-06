import 'bootstrap';
import './tooltip';
import './select';
import './tags';
import './changeToggle';
import carousel from './lib/carousel';
import select from './lib/select';
import './projectAccordeon';
import './calendar';
import initNavbarToggle from './navbarToggle';


$(document).ready(function () {
  const body = document.querySelector('body');

  body.classList.remove('no-js');

  carousel();
  select();
  initNavbarToggle();
});
