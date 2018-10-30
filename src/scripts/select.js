import selectpicker from 'bootstrap-select';
const BODY = $('body');
const DOC = $(document);

DOC.ready(() => {
  const select = $('.js-select');
  select
    .selectpicker()
    .on('loaded.bs.select', function() {
      const parent = $(this).parents('.js-select');
      const iconName = parent.find('select').data('icon-arrow');
      const button = parent.find('.dropdown-toggle');
      const icon = `<svg class="icon icon-${iconName}"><use xlink:href="img/sprite.svg#icon-${iconName}"></use></svg>`;
      if (!iconName) return;
      button.append(icon);
    });
  BODY.find('.js-select .btn').removeClass('btn');
});

