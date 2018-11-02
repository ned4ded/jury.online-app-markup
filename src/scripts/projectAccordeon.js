const trigger = $('[data-project-trigger]');

trigger.on('click', function() {
  const that = $(this);
  const open = 'is-open-project';
  const id = that.data('project-trigger');
  const thisBlock = $(`[data-project-id="${id}"]`);
  if (!that.hasClass(open)) {
    that.addClass(open);
    thisBlock.slideDown();
  }
  else {
    that.removeClass(open);
    thisBlock.slideUp();
  }
});