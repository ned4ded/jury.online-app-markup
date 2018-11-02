import { Animatron } from './lib/animatron';

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

  const animatron = new Animatron({ elements, duration: Config.DURATION });

  const toggleHandler = (ev) => {
    t.removeEventListener('click', toggleHandler);

    animatron.toggle(() => {
      t.addEventListener('click', toggleHandler);
    });

    return;
  };

  const liningHandler = ev => {
    if(animatron.isBusy()) return;

    l.removeEventListener('click', liningHandler);

    animatron.end(() => {
      l.addEventListener('click', liningHandler);
    });

    return;
  }

  t.addEventListener('click', toggleHandler);
  l.addEventListener('click', liningHandler);
};
