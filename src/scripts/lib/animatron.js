import { array } from './util.js';

const States = {
  START: 'closed',
  PROCESS_FORWARD: 'opening',
  PROCESS_REVERT: 'closing',
  END: 'opened',
}

const INITIAL_STATE = States.START;

const DURATION = 500;

const ATTR_NAME = 'state';

class Element {
  constructor(element, attr) {
    this.element = element;

    this._attrName = attr;
  }

  notify(state) {
    this.element.dataset[this._attrName] = state;

    return;
  }
}


export class Animatron {
  constructor({ state, duration, elements, attrName }) {
    if(!elements) throw new Error('Animatrong: constructor: elements were not passed');

    this._vacate();

    this._elements = array(elements).map(v => new Element(v, attrName || ATTR_NAME));

    this._setState(state || INITIAL_STATE)

    this.duration = duration || DURATION;
  }

  _setState(state) {
    this._state = state;

    this._notify(state);

    return this;
  }

  _notify(state) {
    this._elements.forEach(e => e.notify(state));

    return this;
  }

  getState() {
    return this._state;
  }

  isState(state) {
    return this.getState() === state;
  }

  isBusy() {
    return !!this._busy;
  }

  _occupy() {
    this._busy = true;

    return this;
  }

  _vacate() {
    this._busy = false;

    return this;
  }

  _process(cb, processState, endState) {
    this._occupy()._setState(processState);

    setTimeout(() => {
      this._setState(endState)._vacate();

      return cb();
    }, this.duration);

    return this;
  }

  start(cb = () => {}) {
    if(this.isState(States.END) || this.isBusy()) return false;

    return this._process(cb, States.PROCESS_FORWARD, States.END);
  }

  end(cb = () => {}) {
    if(this.isState(States.START) || this.isBusy()) return false;

    return this._process(cb, States.PROCESS_REVERT, States.START);
  }

  toggle(cb) {
    if(this.isBusy()) return;

    return this.isState(States.START) ? this.start(cb) : this.end(cb);
  }
}
