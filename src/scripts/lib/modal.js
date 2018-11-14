import Util from 'bootstrap/js/src/util';

import { Animatron } from './animatron';

const Events = {
  SHOW: 'show.bs.modal',
  SHOWN: 'shown.bs.modal',
  HIDE: 'hide.bs.modal',
  HIDDEN: 'hidden.bs.modal',
}

const Attrs = {
  RECIPIENT: 'data-modal-state',

}

const Selectors = {
  RECIPIENT: `[${Attrs.RECIPIENT}]`,
}

const DURATION = 300;

class Modal {
  constructor(element) {
    this._element = element;

    const recipients = Array.from($( document ).find(Selectors.RECIPIENT));

    this._animatron = new Animatron({ elements: recipients, attrName: Attrs.RECIPIENT, duration: DURATION, });

    this._backdrop = null;

    const updateBackdrop = (bd) => {
      this._backdrop = bd;

      return;
    }

    this.on('show', () => {
      this._animatron.start();

      return;
    });

    this.on('hide', () => {
      this._animatron.end();

      return;
    });

    this.on('shown', function() {
      updateBackdrop( $( this ).data('bs.modal')._backdrop );

      return;
    });

    this.on('hidden', function() {
      updateBackdrop( null );

      return;
    });
  }

  on(name, cb) {
    const eventName = (() => {
      switch (name) {
        case 'show':
          return Events.SHOW;
        case 'shown':
          return Events.SHOWN;
        case 'hide':
          return Events.HIDE;
        case 'hidden':
          return Events.HIDDEN;
        default:
          throw new TypeError('CustomModal: method on(): Wrong event name');
      }
    })();

    this._element.on(eventName, cb);

    return this;
  }
}

export default function() {
  const modals = $('.modal');
  modals.each((i,el) => {
    const id = $(el).attr('id');
    new Modal( $(`#${id}`) );
  });
}
