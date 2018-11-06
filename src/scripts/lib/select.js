import '../vendor/chosen.jquery.js';
import { once } from './util';

class SelectContainer {
  constructor(el) {
    this.el = $( el );

    this._unstyleContainer();
  }

  _unstyleContainer = once(() => {
    const $container = this.getContainer();

    if(!$container) return;

    $container.removeAttr('style');

    return;
  });

  addClass(c) {
    const $container = this.getContainer();

    if(!$container) return;

    $container.addClass(c);

    return this;
  }

  getContainer() {
    return this.el;
  }

  setMinWidth(width) {
    const w = (width || 0) + 'px';

    this.el.css({ 'min-width' : w });

    return this;
  }
}

class Select {
  constructor(el, options) {
    this.el = el;

    this.$el = $( el ).chosen(options);
    this.options = options;

    this._registrateContainer();
  }

  _clearElementClasses = once(() => {
    const classes = Array.from(this.el.classList.values());

    classes.forEach( c => this.el.classList.remove(c) );

    return;
  });

  _getElementMinWidth() {
    const clone = this.el.cloneNode(true);

    const classes = Array.from(clone.classList.values());

    classes.forEach( c => clone.classList.remove(c) );

    clone.removeAttribute('style');

    clone.setAttribute('style', 'position: absolute; visibility: hidden; left: -9999px;');

    const body = document.querySelector('body');

    body.appendChild( clone );

    const width = clone.offsetWidth;

    body.removeChild( clone );

    return width;
  }

  _getData() {
    const data = this.$el.data('chosen');

    return data || false;
  }

  _registrateContainer() {
    const { container } = this._getData() || { container: null };

    if(!container) return;

    this._container = new SelectContainer( container );

    const classes = this.el.classList;

    classes.forEach(c => this._container.addClass(c));

    const width = this._getElementMinWidth();

    this._container.setMinWidth(width);

    return this;
  }
}

export default () => {
  const $chosen = $('[data-select]').each(function() {
    const options = this.dataset.select ? JSON.parse(this.dataset.select) : {};

    new Select(this, options)

    return;
  });
}
