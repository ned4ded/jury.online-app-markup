import 'jquery-ui/ui/widgets/slider';

const Classes = {
  SLIDER: 'range-input__slider',
  HANDLE: 'range-input__handler',
  RANGE: 'range-input__scale',
}

const Attrs = {
  MAIN: 'data-range',
  CONTAINER: 'data-range-container',
  VALUE: 'data-range-value',
  AMOUNT: 'data-range-amount',
  INPUT: 'data-range-input',
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
  }

  show() {
    this._el.removeAttr('hidden');
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
  }

  setValue(value) {
    this._el.val(value);
  }

  getValue() {
    return this._el.val();
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

  _handler = (ev, value) => {
    this._span.text(value);
  }
}

class ValueHandlers {
  constructor(arr) {

  }
}

class Slider {
  constructor(el, options) {
    this._el = el;

    const values = $( this._el ).find(Selectors.VALUE).get().map(e => {
      const input = e.querySelector(Selectors.INPUT);

      const span = e.querySelector(Selectors.AMOUNT);

      const type = (() => {
        switch ($(e).attr(Attrs.VALUE)) {
          case Values.MIN:
            return Values.MIN;
          case Values.MAX:
            return Values.MAX;
          default:
            throw new TypeError(`Value type of ${Attrs.VALUE} is wrong`);
        };

        return;
      })();

      return new ValueHandler({ input, span });
    });

    const container = $( el ).find(Selectors.CONTAINER);

    if(!container.length) throw new Error('Slider: no container has been found');

    const opts = {
      ...options,
      min: 0,
      max: 100,
      values: [values[0].getValue(), values[1].getValue()]
    }

    this._container = $( container ).slider(opts).on( "slide", function( ev, ui ) {
      values[0].update(ui.values[0]);
      values[1].update(ui.values[1]);
    } );
  }

  _uploadValueHandlers() {

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
