import EasyPieChart from 'easy-pie-chart';

const Default = {
  animate: 2000,
  lineWidth: 6,
  size: 118,
  lineCap: 'square',
  trackColor: '#F6F6F6',
  barColor: '#75A3BF',
  scaleColor: 'transparent',
}

const Attr = {
  PIE_CHART: 'data-pie-chart',
  PIE_CHART_PERCENT: 'data-percent',
  VALUE_ELEMENT: 'data-pie-chart-value',
}

const Selector = {
  PIE_CHART: `[${Attr.PIE_CHART}]`,
  PIE_CHART_PERCENT: `[${Attr.PIE_CHART_PERCENT}]`,
  VALUE_ELEMENT: `[${Attr.VALUE_ELEMENT}]`,
}

const EVENT_KEY = '.pie-chart';

const Event = {
  UPDATE: `update${EVENT_KEY}`,
}

export class PieChart {
  constructor(element, config = {}) {
    this.element = element;

    this.value = Number(
      (() => {
        const valueEl = $(element).attr(Attr.PIE_CHART_PERCENT) ? $(element) :
          $(element).find(Selector.PIE_CHART_PERCENT);

        if(!valueEl) throw new Error('PieChart: Value element was not found');

        return valueEl.attr(Attr.PIE_CHART_PERCENT);
      })()
    );

    if(isNaN(this.value)) throw new TypeError('PieChart: value is undefined or NaN');

    this.valueElement = $( this.element ).find(Selector.VALUE_ELEMENT).get(0);

    const setupValueElements = (element) => {
        const $e = $( element );

        const isInput = $e.is('input');

        if(isInput) {
          const handler = (e) => {
            this.update( $(e).val() );

            return;
          };

          $e.on('change', function(ev) {
            handler( this );

            return;
          });
        }

        return;
      }

    if(this.valueElement) setupValueElements(this.valueElement);

    this.epc = new EasyPieChart(element, Object.assign(Default, config));
  }

  update(v) {
    this.updateNoTrigger(v);

    $( this.element ).trigger(Event.UPDATE, v);

    return this;
  }

  updateNoTrigger(v) {
    $( this.valueElement ).val(v);

    this.value = v;

    this.epc.update(v);

    return this;
  }

  onUpdate(cb) {
    $( this.element ).on(Event.UPDATE, cb);

    return this;
  }
}

export default () => {
  const charts = Array.from( $(Selector.PIE_CHART) ).map(e => new PieChart( e ));
}
