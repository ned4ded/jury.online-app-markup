const trigger = $('[data-project-trigger]');

trigger.on('click', function() {
  const that = $(this);
  const open = 'is-open-project';
  const id = that.data('project-trigger');
  const blocks = $('[data-project-id]');
  const thisBlock = $(`[data-project-id="${id}"]`);
  if (!that.hasClass(open)) {
    trigger.removeClass(open);
    that.addClass(open);
    blocks.slideUp();
    thisBlock.slideDown();
  }
  else {
    console.log('www');
    that.removeClass(open);
    thisBlock.slideUp();
  }
});