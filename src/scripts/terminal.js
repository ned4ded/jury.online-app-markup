import { DOC } from './constants';

import 'bootstrap';

import './lib/horizontal-timeline';
import carousel from './lib/carousel';
import slider from './lib/slider';
import select from './lib/select';
import rating from './lib/rating';

import './tooltip';
import './tags';
import './changeToggle';
import './projectAccordeon';
import './calendar';
import initNavbarToggle from './navbarToggle';
import './chart';


DOC.ready(function () {
  const body = document.querySelector('body');

  body.classList.remove('no-js');

  carousel();
  slider();
  select();
  rating();
  initNavbarToggle();
});
