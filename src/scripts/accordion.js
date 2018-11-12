import { OPEN } from './constants';

const accordeons = $('.js-accordion');

accordeons.each((i,el) => {
	const parent = $(el);
	const trigger = $('.js-accordion-trigger', parent);
	const wrap = $('.js-accordion-wrap', parent);
	
	if (parent.hasClass(OPEN)) wrap.slideDown();

	trigger.on('click', ()=> {
		if (!parent.hasClass(OPEN)) {
			parent.addClass(OPEN);
	    	wrap.slideDown();
		}
		else {
			parent.removeClass(OPEN);
			wrap.slideUp();
		}
	});
});






