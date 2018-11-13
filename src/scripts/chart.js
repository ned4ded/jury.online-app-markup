import EasyPieChart from 'easy-pie-chart';

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
