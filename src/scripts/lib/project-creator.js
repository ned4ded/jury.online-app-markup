import { PieChart } from './pie-chart';
import datepicker from 'air-datepicker';

const makeName = (id, inputName) => `project[cycles_attributes][${id}][${inputName}]`;

const Attr = {
  TAB: 'data-project-creator-tab',
  FORM: 'data-create-project',
  CYCLE: 'data-create-project-cycle',
  ATTACH: 'data-create-project-attach',
  MILESTONE: 'data-create-project-milestone',
}

const TabsTemplate = {
  LIST: 'list',
  CONTAINER: 'container',
  LINK: 'link',
  CONTENT: 'content',
  IPFS: 'ipfs',
  IPFS_LABEL: 'ipfs-label',
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

const MilestoneTemplate = {
  LIST: 'list',
  CONTAINER: 'container',
  NUMBER: 'number',
  DATE: 'date',
  ADD: 'add',
}

const AttachTemplate = {
  ROW: 'row',
  LIST: 'list',
  COUNT: 'count',
  ADD: 'add',
  REMOVE: 'remove',
  PLACEHOLDER: 'placeholder',
  INPUT: 'input',
}

const Selector = {
  TAB_LIST: `[${Attr.TAB}="${TabsTemplate.LIST}"]`,
  TAB_CONTAINER: `[${Attr.TAB}="${TabsTemplate.CONTAINER}"]`,
  TAB_LINK: `[${Attr.TAB}="${TabsTemplate.LINK}"]`,
  TAB_CONTENT: `[${Attr.TAB}="${TabsTemplate.CONTENT}"]`,
  TAB_IPFS: `[${Attr.TAB}="${TabsTemplate.IPFS}"]`,
  TAB_IPFS_LABEL: `[${Attr.TAB}="${TabsTemplate.IPFS_LABEL}"]`,

  CYCLE_LIST: `[${Attr.CYCLE}="${CycleTemplate.LIST}"]`,
  CYCLE_CONTAINER: `[${Attr.CYCLE}="${CycleTemplate.CONTAINER}"]`,
  CYCLE_INDEX: `[${Attr.CYCLE}="${CycleTemplate.INDEX}"]`,
  CYCLE_PERCENTAGE: `[${Attr.CYCLE}="${CycleTemplate.PERCENTAGE}"]`,
  CYCLE_DATE: `[${Attr.CYCLE}="${CycleTemplate.DATE}"]`,
  CYCLE_ADD: `[${Attr.CYCLE}="${CycleTemplate.ADD}"]`,
  CYCLE_PIE_CHART: `[${Attr.CYCLE}="${CycleTemplate.PIE_CHART}"]`,

  FORM: `[${Attr.FORM}]`,

  ATTACH_LIST: `[${Attr.ATTACH}="${AttachTemplate.LIST}"]`,
  ATTACH_COUNT: `[${Attr.ATTACH}="${AttachTemplate.COUNT}"]`,
  ATTACH_ADD: `[${Attr.ATTACH}="${AttachTemplate.ADD}"]`,
  ATTACH_ROW: `[${Attr.ATTACH}="${AttachTemplate.ROW}"]`,
  ATTACH_PLACHOLDER: `[${Attr.ATTACH}="${AttachTemplate.PLACHOLDER}"]`,
  ATTACH_REMOVE: `[${Attr.ATTACH}="${AttachTemplate.REMOVE}"]`,
  ATTACH_INPUT: `[${Attr.ATTACH}="${AttachTemplate.INPUT}"]`,

  MILESTONE_LIST: `[${Attr.MILESTONE}="${MilestoneTemplate.LIST}"]`,
  MILESTONE_CONTAINER: `[${Attr.MILESTONE}="${MilestoneTemplate.CONTAINER}"]`,
  MILESTONE_NUMBER: `[${Attr.MILESTONE}="${MilestoneTemplate.NUMBER}"]`,
  MILESTONE_DATE: `[${Attr.MILESTONE}="${MilestoneTemplate.DATE}"]`,
  MILESTONE_ADD: `[${Attr.MILESTONE}="${MilestoneTemplate.ADD}"]`,
}


class Milestone {
  constructor(container, id, cycle) {

    this._container = $( container );

    this._id = id;

    this._number = this._container.find( Selector.MILESTONE_NUMBER );

    this._number.text( this._id );

    this._date = this._container.find( Selector.MILESTONE_DATE ).datepicker({
      onSelect: function(form, date, inst) {
        inst.$el.trigger('change');
      }
    });

    this._date.attr('name', makeName(cycle, `milestone-date-${id}`));
  }
}

class Milestones {
  constructor(container, cycle) {
    console.log(cycle);
    this._list = container.find( Selector.MILESTONE_LIST );

    this._cycle = cycle;

    this._templates = {};

    this._templates.container = this._list.find( Selector.MILESTONE_CONTAINER ).first().clone();

    this._milestones = Array.from(this._list.find( Selector.MILESTONE_CONTAINER )).map((e, i) => new Milestone(e, i + 1, cycle));

    this._add = container.find( Selector.MILESTONE_ADD );

    this._add.click((ev) => {
      ev.preventDefault();

      this.create(this.getLength() + 1);
    })
  }

  create(id) {
    const container = this._getTemplate('container');

    this._list.append(container);

    this._milestones = [...this._milestones, new Milestone(container, id, this._cycle)];

    return this;
  }

  getLength() {
    return this._milestones.length;
  }

  _getTemplate(name) {
    return this._templates[name].clone();
  }
}


class Tab {
  constructor(link, cycle) {
    this.element = $( link );

    const id = this.element.attr('href');

    this.container = $(id);

    this.element.tab();

    this.element.click((ev) => {
      ev.preventDefault();

      this.show();

      return;
    });

    this._milestones = new Milestones(this.container, cycle);

    this._piechart = new PieChart( this.container.find(Selector.CYCLE_PIE_CHART).get(0) );
    this._ipfs = this.container.find(Selector.TAB_IPFS);

    this._ipfs.attr('name', makeName(cycle, 'ipfs'))
    this._date = this.container.find(Selector.CYCLE_DATE).datepicker({
      onSelect: function(form, date, inst) {
        inst.$el.trigger('change');
      }
    });
  }

  getPieChart() {
    return this._piechart;
  }

  getDate() {
    return this._date;
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
  constructor() {
    this._list = $( Selector.TAB_LIST );

    this._content = $( Selector.TAB_CONTENT );

    this._templates = {};

    this._templates.content = this._content.children().first().clone().removeClass('active show');

    this._tabs = Array.from(this._list.find( Selector.TAB_LINK )).map(e => new Tab(e, 1));

    const container = this._list.find( Selector.TAB_CONTAINER ).first();

    this._templates.container = container.clone();

    this._templates.container.find(Selector.TAB_LINK).removeClass('active');

    if(!container.length && !container.find( Selector.TAB_LINK ).length) throw new Error('ProjectCreator: Tabs: No container or link was found');
  }

  create(id) {
    const container = this._getTemplate('container');

    container.find( Selector.TAB_LINK ).attr('href', '#tabs-' + id).text('Cycle ' + id);

    this._list.append(container);

    const content = this._getTemplate('content');

    content.attr('id', 'tabs-' + id);

    this._content.append(content);

    const link = container.find( Selector.TAB_LINK ).get(0);

    this._tabs = [...this._tabs, new Tab(link, id)];

    return this;
  }

  _getTemplate(name) {
    return this._templates[name].clone();
  }

  getTabByIndex(i) {
    return this._tabs[i];
  }
}

class Cycle {
  constructor(container, id) {
    this._container = $( container );

    this._id = id;

    this._index = this._container.find( Selector.CYCLE_INDEX );

    this._index.text( this._id );

    this._piechart = new PieChart( this._container.find( Selector.CYCLE_PIE_CHART ).get(0) );

    this._date = this._container.find( Selector.CYCLE_DATE ).datepicker({
      onSelect: function(form, date, inst) {
        inst.$el.trigger('change');
      }
    });

    this._date.attr('name', makeName(this._id, 'date'));

    this._percentage = this._container.find( Selector.CYCLE_PERCENTAGE );

    this._percentage.attr('name', makeName(this._id, 'percentage'));
  }

  getId() {
    return this._id;
  }

  getPieChart() {
    return this._piechart;
  }

  getDate() {
    return this._date;
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

    const cycle = new Cycle(container, id);

    this._cycles = [...this._cycles, cycle];

    return cycle;
  }

  getLength() {
    return this._cycles.length;
  }

  _getTemplate(name) {
    return this._templates[name].clone();
  }

  forEach(fn) {
    this._cycles.forEach(fn);

    return this;
  }
}

class Attach {
  constructor(form) {
    this._form = form;

    this._add = this._form.find(Selector.ATTACH_ADD);
    this._input = this._form.find(Selector.ATTACH_INPUT);

    this._list = this._form.find(Selector.ATTACH_LIST);
    this._count = this._form.find(Selector.ATTACH_COUNT);
    this._placeholder = this._list.find(Selector.ATTACH_PLACHOLDER);

    this._templates = {};

    this._templates.row = this._list.find( Selector.ATTACH_ROW ).first().clone();
    this._templates.placeholder = this._placeholder.first().clone();
    this._templates = this._input.first().clone();

    this._input.change(() => {

      this._input.detach();
      
      console.log(this._input);

    });
  }

  _makeRow(input) {

  }

  _findRemove(el) {
    const remove = el.find(Selector.ATTACH_REMOVE);
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
    this._attach = new Attach( this._form );

    this._cycles.forEach(cycle => this._bindData(cycle));

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

    const cycle = this._cycles.create(id);

    this._tabs.create(id);

    this._bindData(cycle);
  }

  _bindData(cycle) {
    const cyclePie = cycle.getPieChart();
    const cycleDate = cycle.getDate();
    const cycleId = cycle.getId();

    const tab = this._tabs.getTabByIndex(cycleId - 1);
    const tabPie = tab.getPieChart();
    const tabDate = tab.getDate();

    cyclePie.onUpdate(function(ev, value) {
      tabPie.updateNoTrigger(value);
    });

    tabPie.onUpdate(function(ev, value) {
      cyclePie.updateNoTrigger(value);
    });

    cycleDate.change(function() {
      const val = $( this ).val();

      tabDate.val(val);

      return;
    });

    tabDate.change(function() {
      const val = $( this ).val();

      cycleDate.val(val);

      return;
    });
  }
}

export default () => {
  const pc = Array.from( $(Selector.FORM) ).map(e => new ProjectCreator(e));

  // console.log(pc[0]._tabs._tabs[0]);
}
