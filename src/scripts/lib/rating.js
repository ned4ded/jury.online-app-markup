const Attrs = {
  MAIN: 'data-rating',
  INPUT: 'data-rating-input',
  STAR: 'data-rating-star',
  STARS_CONTAINER: 'data-rating-stars',
}

const Selectors = {
  MAIN: `[${Attrs.MAIN}]`,
  INPUT: `[${Attrs.INPUT}]`,
  STAR: `[${Attrs.STAR}]`,
  STARS_CONTAINER: `[${Attrs.STARS_CONTAINER}]`,
}

const Classes = {
  STAR_HOVER: 'rating__icon--hover',
}

const Range = {
  MAX: 10,
  MIN: 0,
  STEP: 1,
  INIT: 6,
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
}

class Input extends Element {
  constructor(el) {
    super(el);

    this._max = this._el.attr('max') || Range.MAX;
    this._min = this._el.attr('min') || Range.MIN;
    this._step = this._el.attr('step') || Range.STEP;
    this._init = this._el.val() || Range.INIT;
  }

  getInit() {
    return this._init;
  }

  set(v) {
    if(v < this._min || v > this.min) throw new Error('Rating:Input: Wrong set value');

    this._el.val(v);

    return this;
  }

  getMax() {
    return this._max;
  }
}

class Star extends Element {
  constructor(el) {
    super(el);
  }

  click(fn) {
    this._el.click(fn);

    return this;
  }

  hover() {
    this._el.addClass(Classes.STAR_HOVER);

    return this;
  }

  unhover() {
    this._el.removeClass(Classes.STAR_HOVER);

    return this;
  }
}

class Stars {
  constructor(el, type, points) {
    this._container = $(el);

    this._stars = Array.from( $( el ).find(Selectors.STAR) ).map(e => new Star(e));

    this._type = type;

    this._maxPoints = points;

    this._weight = points / this._stars.length;
  }

  getStars(points) {
    const all = this._stars.slice();

    const { active, percentage } = this._getStarFracture(points);

    const activeArr = all.slice(0, active);

    const fractured = percentage ? all.slice(active, active + 1) : null;

    const rest = percentage ? all.slice(active + 1) : all.slice(active);

    return { all, active: activeArr, fractured, percentage, rest };
  }

  getContainer() {
    return this._container;
  }

  _findIndex(element) {
    const i = this._stars.findIndex((e) => e === element);

    return i;
  }

  show() {
    this._stars.forEach(s => s.show());

    return this;
  }

  isActive() {
    return this._type == 'active';
  }

  getPercentage(v) {
    const { all, active, percentage } = this.getStars(v);

    const percentageToPoints = this._weight * ((percentage || 0) / 100);

    return 100 - (((all.length - active.length) * this._weight) - percentageToPoints) * (100 / this._maxPoints);
  }

  _getStarFracture(v) {
    const remainder = v % this._weight;

    return {
      active: (v - remainder) / this._weight,
      percentage: (remainder / this._weight * 100) || false
    };
  }

  init(fn) {
    this._stars.forEach(star => {
      star.click((ev) => {
        const width = ev.currentTarget.offsetWidth;

        const x = ev.originalEvent.layerX;

        const index = this._findIndex(star);

        fn((index + 1) * this._weight - (width / 2 >= x ? this._weight / 2 : 0));

        return;
      });
    });

    return this;
  }
}

class Rating {
  constructor(container) {
    this._container = $( container );

    this._input = new Input(this._container.find(Selectors.INPUT).first());

    this._stars = Array
      .from(this._container.find(Selectors.STARS_CONTAINER))
      .map(e => new Stars(e, $( e ).attr(Attrs.STARS_CONTAINER), this._input.getMax()));

    this._input.hide();

    this._stars.forEach(c => c.show());
  }

  set(v) {
    this._input.set(v);

    const active = this._stars.find(c => c.isActive());

    const activeContainer = active.getContainer();

    $( activeContainer ).css('width', active.getPercentage(v) + '%');

    return this;
  }

  init() {
    this.set( this._input.getInit() );

    this._stars.forEach(c => c.init((v) => {
      this.set(v);
    }));

    return this;
  }
}

export default () => {
  const ratings = Array.from($(Selectors.MAIN).get()).map(e => new Rating(e));

  ratings.forEach(r => r.init());
}
