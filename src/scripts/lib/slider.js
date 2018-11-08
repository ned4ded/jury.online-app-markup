import 'jquery-ui/ui/widgets/slider';
import { getElementsMinWidth } from './util.js';

const Classes = {
  SLIDER: 'range-input__slider',
  HANDLE: 'range-input__handler',
  RANGE: 'range-input__scale',
}

const Attrs = {
  MAIN: 'data-range-slider',
  CONTAINER: 'data-range-slider-container',
  VALUE: 'data-range-slider-value',
  AMOUNT: 'data-range-slider-amount',
  INPUT: 'data-range-slider-input',
}

const Selectors = {
  MAIN: `[${Attrs.MAIN}]`,
  CONTAINER: `[${Attrs.CONTAINER}]`,
  VALUE: `[${Attrs.VALUE}]`,
  AMOUNT: `[${Attrs.AMOUNT}]`,
  INPUT: `[${Attrs.INPUT}]`,
}

const Values = {
  MAX: 'max',
  MIN: 'min',
}

class Element {
  constructor(el) {
    this._el = $( el );
  }

  hide() {
    this._el.attr('hidden', true);

    return this;
  }

  show() {
    this._el.removeAttr('hidden');

    return this;
  }

  getElement() {
    return this._el;
  }

  setCss(...args) {
    this._el.css(...args);

    return this;
  }
}

class Span extends Element {
  constructor(el) {
    super(el);
  }

  text(content) {
    this._el.text(content);
  }
}

class Input extends Element {
  constructor(el) {
    super(el);

    this._init = this._el.attr('value') || 0;
  }

  setValue(value) {
    this._el.val(value);
  }

  getValue() {
    return this._el.val();
  }

  getCap() {
    return this._el.attr(Attrs.INPUT);
  }

  getInit() {
    return this._init;
  }

  change(fn) {
    this._el.on('change', fn);

    return this;
  }

  trigger(ev, ...values) {
    this._el.trigger(ev, ...values);

    return this;
  }
}

class ValueHandler {
  constructor({ input, span }) {
    this._input = new Input(input);
    this._span = new Span(span);

    this._input.hide();
    this._span.show();

    this._input.change( this._handler );

    const init = this.getValue();
    this.update(init);
  }

  update(value) {
    this._input.setValue(value);

    this._input.trigger('change', value);

    return this;
  }

  getValue() {
    return this._input.getValue();
  }

  getInit() {
    return this._input.getInit();
  }

  getCap() {
    return this._input.getCap();
  }

  getSpan() {
    return this._span.getElement();
  }

  setSpanCss(...args) {
    return this._span.setCss(...args);
  }

  _handler = (ev, value) => {
    this._span.text(value);
  }
}

class ValueHandlers {
  constructor() {
    this._map = new Map();
  }

  add(type, h) {
    if(this.has(type)) throw new Error(`ValueHandlers: Already have such a type ${type}`);

    this._map.set(type, h);

    return this;
  }

  has(key) {
    return this._map.has(key);
  }

  get(key) {
    return this._map.get(key);
  }

  forEach(fn) {
    return this._map.forEach(fn);
  }

  _process(fn, filter = () => true) {
    const entries = this._map.entries();

    for (let [key, value] of entries) {
      if(filter(key, value)) {
        fn(null, key, value);
      };
    }

    return fn(true);
  }

  getInit() {
    const inits = () => {
      const obj = {};

      return (end, type, handler) => {
        if(end) {
          return obj;
        }

        obj[type] = Number(handler.getInit());

        return;
      };
    };

    return this._process(inits());
  }

  getMax() {
    const fn = () => {
      let max;

      return (end, type, handler) => {
        if(end) {
          return max;
        }

        max = Number(handler.getCap());

        return;
      };
    };

    const filter = (key, value) => {
      return key === Values.MAX;
    };

    return this._process(fn());
  }

  getMinMax() {
    const values = () => {
      const obj = {};

      return (end, type, handler) => {
        if(end) {
          return obj;
        }

        obj[type] = Number(handler.getCap());

        return;
      };
    };

    return this._process(values());
  }

  update(type, value) {
    const update = (end, type, handler) => {
      return end? null : handler.update(value);
    }

    const filter = (key, value) => {
      return key === type;
    };

    this._process(update, filter);

    return this;
  }
}

const validateType = (type) => {
  return Object.values(Values).includes(type);
}

const makeValueHandlers = (containers) => {
  const rec = (arr, acc) => {
    const [first, ...rest] = arr;

    const input = first.querySelector(Selectors.INPUT);
    const span = first.querySelector(Selectors.AMOUNT);

    const type = $(first).attr(Attrs.VALUE);
    if(!validateType(type)) throw new TypeError(`Slider: wrong type of min/max values: ${type}`);

    const handlers = acc.add(type, new ValueHandler({ input, span }));

    return rest.length ? rec(rest, handlers) : handlers;
  }

  return rec(containers, new ValueHandlers());
}


class Slider {
  constructor(el, options) {
    this._el = el;

    const valueHandlersContainers = $( this._el ).find(Selectors.VALUE).get();

    this._valueHandlers = makeValueHandlers(valueHandlersContainers);

    const container = $( el ).find(Selectors.CONTAINER);

    if(!container.length) throw new Error('Slider: no container has been found');

    const opts = {
      ...options,
      ...this._valueHandlers.getMinMax(),
      step: 0.01,
      values: Object.values(this._valueHandlers.getInit())
    }

    const span = this._valueHandlers.get(Values.MAX).getSpan().get(0);

    const text = document.createTextNode([Math.floor(this._valueHandlers.getMax()), '00'].join('.'));

    const clone = span.cloneNode();

    clone.appendChild(text);

    const w = getElementsMinWidth(clone);

    this._valueHandlers.forEach((handler) => handler.setSpanCss('min-width', w));

    this._container = $( container ).slider(opts).on( "slide", ( ev, ui ) => {
      const [ min, max ] = ui.values;

      this._valueHandlers.update(Values.MIN, min).update(Values.MAX, max);

      return;
    } );
  }
}

export default function() {
  const $sliders = $( Selectors.MAIN );

  $sliders.each(function() {
    new Slider(this, {
      classes: {
        "ui-slider": Classes.SLIDER,
        "ui-slider-handle": Classes.HANDLE,
        "ui-slider-range": Classes.RANGE
      },
      range: true
    });
  });
}
