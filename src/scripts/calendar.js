import datepicker from 'air-datepicker';
import { OPEN, BODY } from './constants';
const trigger = $('.js-icon-calendar-trigger');
const input = $('.js-icon-calendar-input');
const parentWrap = '.js-icon-calendar';

var flag = false;
input.datepicker({
	onSelect(formattedDate, date, inst) {
		const parent = $(inst.el).parents(parentWrap);
		if (date.length === 2) {
			parent.removeClass(OPEN);
			flag = true;
		}
	}
});

trigger.on('click', function(){
	const that = $(this);
	const parent = that.parents(parentWrap);
	(!parent.hasClass(OPEN))
		? parent.addClass(OPEN)
		: parent.removeClass(OPEN);
});
