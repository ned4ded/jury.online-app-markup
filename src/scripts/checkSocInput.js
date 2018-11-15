const checkInputValue = () => {
  const control = $('.js-soc-control');
  control.on('keyup', function () {
    const value = $(this).val();
    const parent = $(this).parents('.js-soc-control-parent');
    const filled = 'is-filled';
    if (value) {
      parent.addClass(filled);
    } else {
      parent.removeClass(filled);
    }
  });
};
checkInputValue();