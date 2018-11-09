import { Animatron } from './lib/animatron';
import { WIN_WIDTH, NAVBAR_COLLAPSE_BP } from './constants';

const Config = {
  DURATION: 500,
}

export default () => {
  const t = document.querySelector('[data-navbar-toggle]');

  const l = document.getElementById('lining');

  const navbar = document.querySelector('.navbar');
  const sidebar = document.querySelector('.dashboard__side-bar');
  const sidemenu = document.querySelector('.side-menu');

  const elements = [t, l, navbar, sidebar, sidemenu];

  const animatronMobile = new Animatron({ elements, duration: Config.DURATION });
  const animatronDesktop = new Animatron({ elements, duration: Config.DURATION, attrName: 'desktopState', state: 'opened' });

  const toggleHandler = (ev) => {
    t.removeEventListener('click', toggleHandler);

    if($(window).width() <= NAVBAR_COLLAPSE_BP) {
      animatronMobile.toggle(() => {
        t.addEventListener('click', toggleHandler);
      });
    } else {
      animatronDesktop.toggle(() => {
        t.addEventListener('click', toggleHandler);
      });
    }

    return;
  };

  const liningHandler = ev => {
    if(animatronMobile.isBusy()) return;

    l.removeEventListener('click', liningHandler);

    animatronMobile.end(() => {
      l.addEventListener('click', liningHandler);
    });

    return;
  }

  t.addEventListener('click', toggleHandler);
  l.addEventListener('click', liningHandler);
};
