import datepicker from 'air-datepicker';
import { OPEN, BODY } from './constants';

const parentWrap = $('.js-icon-calendar');
parentWrap.each((i,el) => {
	const parent = $(el);
	const input = $('.js-icon-calendar-input', parent);
	const startText = input.data('placeholder');
	const startDate = input.data('start-select-date');
	const endDate = input.data('end-select-date');
	
	let dp = input.datepicker({
		dateFormat: 'dd.mm.yyyy',
		onSelect(formattedDate, date, inst) {
			const textWrap = parent.find('.js-icon-calendar-text');

			if (date.length === 2)  parent.removeClass(OPEN);

			(formattedDate)
				? textWrap.text(formattedDate)
				: textWrap.text(startText);
		}
	}).data('datepicker');

	if (startDate && endDate) {
		dp.selectDate(new Date(startDate));
		dp.selectDate(new Date(endDate));
	}
});

const trigger = $('.js-icon-calendar-trigger');
trigger.on('click', function(){
	const that = $(this);
	const parent = that.parents('.js-icon-calendar');
	(!parent.hasClass(OPEN))
		? parent.addClass(OPEN)
		: parent.removeClass(OPEN);
});
