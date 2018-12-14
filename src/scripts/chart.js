import EasyPieChart from 'easy-pie-chart';
import { ACTIVE, HIDE, BODY } from './constants';

var containers = document.querySelectorAll('.js-chart');

containers.forEach( el => {
	const that = $(el);
	const valueContainer = $('.js-chart-value', that);

	const lineWidth = that.data('line-width');
	const size = that.data('size');
	const trackColor = that.data('track-color') || '#F6F6F6';
	const barColor = that.data('bar-color') || '#75A3BF';
	new EasyPieChart(el, {
		animate: 2000,
		lineWidth: lineWidth,
		size: size,
		lineCap: 'square',
		trackColor: trackColor,
		barColor: barColor,
		scaleColor: 'transparent',
		onStep: function(from, to, currentValue) {
        	valueContainer.text(~~currentValue);
        }
	});
});


const roundsChart = $('.js-rounds-chart');

roundsChart.each((i,el)=>{
	const parent = $(el);
	const bonus = $('[data-chart-bonus]', parent);
	const alldates = $('.js-rounds-chart-date', parent);
	bonus.on('click', function() {
		const that = $(this);
		const bonusId = that.data('chart-bonus');
		const currentDates = $(`[data-chart-date="${bonusId}"]`);
		console.log(currentDates, bonusId);
		if (!that.hasClass(ACTIVE)) {
			bonus.removeClass(ACTIVE);
			that.addClass(ACTIVE);
			alldates.addClass(HIDE);
			currentDates.removeClass(HIDE);
		}
		else {
			bonus.removeClass(ACTIVE);
			alldates.removeClass(HIDE);
		}
	});
	BODY.on('click touchend', e => {
      if ($(e.target).closest(bonus).length) return;
      bonus.removeClass(ACTIVE);
      alldates.removeClass(HIDE);
    });
});


