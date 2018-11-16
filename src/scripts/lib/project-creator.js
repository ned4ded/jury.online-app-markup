import { PieChart } from './pie-chart';
import datepicker from 'air-datepicker';

const makeName = (id, inputName) => `project[cycles_attributes][${id}][${inputName}]`;

const Attr = {
  TAB: 'data-project-creator-tab',
  FORM: 'data-create-project',
  CYCLE: 'data-create-project-cycle',
}

const TabsTemplate = {
  LIST: 'list',
  CONTAINER: 'container',
  LINK: 'link',
  CONTENT: 'content',
}

const CycleTemplate = {
  LIST: 'list',
  CONTAINER: 'container',
  INDEX: 'index',
  PERCENTAGE: 'percentage',
  DATE: 'date',
  ADD: 'add',
  PIE_CHART: 'pie-chart',
}

const Selector = {
  TAB_LIST: `[${Attr.TAB}="${TabsTemplate.LIST}"]`,
  TAB_CONTAINER: `[${Attr.TAB}="${TabsTemplate.CONTAINER}"]`,
  TAB_LINK: `[${Attr.TAB}="${TabsTemplate.LINK}"]`,
  TAB_CONTENT: `[${Attr.TAB}="${TabsTemplate.CONTENT}"]`,
  CYCLE_LIST: `[${Attr.CYCLE}="${CycleTemplate.LIST}"]`,
  CYCLE_CONTAINER: `[${Attr.CYCLE}="${CycleTemplate.CONTAINER}"]`,
  CYCLE_INDEX: `[${Attr.CYCLE}="${CycleTemplate.INDEX}"]`,
  CYCLE_PERCENTAGE: `[${Attr.CYCLE}="${CycleTemplate.PERCENTAGE}"]`,
  CYCLE_DATE: `[${Attr.CYCLE}="${CycleTemplate.DATE}"]`,
  CYCLE_ADD: `[${Attr.CYCLE}="${CycleTemplate.ADD}"]`,
  CYCLE_PIE_CHART: `[${Attr.CYCLE}="${CycleTemplate.PIE_CHART}"]`,
  FORM: `[${Attr.FORM}]`,
}

class Tab {
  constructor(link) {
    this.element = $( link );

    const id = this.element.attr('href');

    this.container = $(id);

    this.element.tab();

    this.element.click((ev) => {
      ev.preventDefault();

      this.show();

      return;
    });
  }

  destroy() {
    this.element.tab('dispose');

    return this;
  }

  show(){
    this.element.tab('show');

    return this;
  }
}

class Tabs {
  constructor(list) {
    this._list = $( Selector.TAB_LIST );

    this._content = $( Selector.TAB_CONTENT );

    this._tabs = Array.from(this._list.find( Selector.TAB_LINK )).map(e => new Tab(e));

    const container = this._list.find( Selector.TAB_CONTAINER ).first();

    if(!container.length && !container.find( Selector.TAB_LINK ).length) throw new Error('ProjectCreator: Tabs: No container or link was found');

    this._templates = {};

    this._templates.container = container.clone();

    this._templates.container.find(Selector.TAB_LINK).removeClass('active');

    this._templates.content = this._content.children().first().clone().removeClass('active show');
  }

  create(id) {
    const container = this._getTemplate('container');

    container.find( Selector.TAB_LINK ).attr('href', '#tabs-' + id).text('Cycle ' + id);

    this._list.append(container);

    const content = this._getTemplate('content');

    content.attr('id', 'tabs-' + id);

    this._content.append(content);

    const link = container.find( Selector.TAB_LINK ).get(0);

    this._tabs = [...this._tabs, new Tab(link)];

    return this;
  }

  _getTemplate(name) {
    return this._templates[name].clone();
  }
}

class Cycle {
  constructor(container, id) {
    this._container = $( container );

    this._id = id;

    this._index = this._container.find( Selector.CYCLE_INDEX );

    this._index.text( this._id );

    this._piechart = new PieChart( this._container.find( Selector.CYCLE_PIE_CHART ).get(0) );

    this._date = this._container.find( Selector.CYCLE_DATE ).datepicker();

    this._date.attr('name', makeName(this._id, 'date'));

    this._percentage = this._container.find( Selector.CYCLE_PERCENTAGE );

    this._percentage.attr('name', makeName(this._id, 'percentage'));
  }
}

class Cycles {
  constructor() {
    this._list = $( Selector.CYCLE_LIST );

    this._templates = {};

    this._templates.container = this._list.find( Selector.CYCLE_CONTAINER ).first().clone();

    this._cycles = Array.from(this._list.find( Selector.CYCLE_CONTAINER )).map((e, i) => new Cycle(e, i + 1));
  }

  create(id) {
    const container = this._getTemplate('container');

    this._list.append(container);

    this._cycles = [...this._cycles, new Cycle(container, id)];

    return this;
  }

  onCreate(cb) {

  }

  getLength() {
    return this._cycles.length;
  }

  _getTemplate(name) {
    return this._templates[name].clone();
  }
}

class ProjectCreator {
  constructor(form) {
    this._form = $(form);
    this._tabs = new Tabs();
    this._cycles = new Cycles();

    $( Selector.CYCLE_ADD ).click((ev) => {
      ev.preventDefault();

      this.create();
    });

    this._form.find('[type="submit"]').click((ev) => {
      ev.preventDefault();

      console.log(this._form.serializeArray());
    })
  }

  create() {
    const id = this._cycles.getLength() + 1;

    this._cycles.create(id);

    this._tabs.create(id);
  }
}

export default () => {
  const pc = Array.from( $(Selector.FORM) ).map(e => new ProjectCreator(e));

  // console.log(pc[0]._cycles);
}
