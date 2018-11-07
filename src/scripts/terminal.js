import { DOC } from './constants';

import 'bootstrap';

import carousel from './lib/carousel';
import select from './lib/select';
import './lib/horizontal-timeline';

import './tooltip';
import './select';
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
  select();
  initNavbarToggle();
});
