import datepicker from 'air-datepicker';

const Attr = {
  DATEPICKER: 'data-datepicker',
}

const Selector = {
  DATEPICKER: `[${Attr.DATEPICKER}]`,
}

class Datepicker {
  constructor(element) {

  }
}

export default () => {
 const datepickers = $( Selector.DATEPICKER ).datepicker();
}
