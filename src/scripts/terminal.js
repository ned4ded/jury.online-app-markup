// import 'bootstrap/js/dist/bootstrap.js';
// import './tooltip'; 
// import './select';

(() => {
  const t = document.querySelector('[data-navbar-toggle]');

  const l = document.getElementById('lining');

  const navbar = document.querySelector('.navbar');
  const sidemenu = document.querySelector('.dashboard__side-bar');

  const targets = [l , navbar, sidemenu];

  const handler = fn => ev => {
    ev.preventDefault();

    fn();
  }

  const toggleHandler = (ev) => handler(() => {
    t.removeEventListener('click', toggleHandler);

    l.addEventListener('click', liningHandler);

    targets.forEach(t => t.dataset.state = 'open');

    return;
  })(ev);

  const liningHandler = (ev) => handler(() => {
    l.removeEventListener('click', liningHandler);

    t.addEventListener('click', toggleHandler);

    targets.forEach(t => t.dataset.state = 'close');

    return;
  })(ev);

  t.addEventListener('click', toggleHandler);
})();
