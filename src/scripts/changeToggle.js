const parent = $('.js-change-password-parent');

parent.each(function(i, el) {
	console.log('sss');
	const that = $(el);
	const head = that.find('.js-change-password-head');
	const body = that.find('.js-change-password-body');
	const btnHeadHide = that.find('.js-change-password-head-hide');
	const btnBodyHide = that.find('.js-change-password-body-hide');
		
		console.log(that, head, body, btnHeadHide, btnBodyHide)
	btnHeadHide.on('click', () => {
		head.slideUp();
		body.slideDown();
	});
	btnBodyHide.on('click', () => {
		head.slideDown();
		body.slideUp();
	});
});


