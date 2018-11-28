import { OPEN, BODY } from './constants';

const trigger = $('body .js-accordion-trigger');
BODY.on('click', '.js-accordion-trigger', function() {
	const that = $(this);
	const parent = that.parents('.js-accordion');
	const wrap = $('.js-accordion-wrap', parent);
	if (!parent.hasClass(OPEN)) {
		parent.addClass(OPEN);
    	wrap.slideDown();
	}
	else {
		parent.removeClass(OPEN);
		wrap.slideUp();
	}
});

const accordeons = $('.js-accordion');
accordeons.each((i,el) => {
	const parent = $(el);
	const wrap = $('.js-accordion-wrap', parent);
	
	if (parent.hasClass(OPEN)) wrap.slideDown();
});
