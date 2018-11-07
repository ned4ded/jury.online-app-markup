import EasyPieChart from 'easy-pie-chart';

var containers = document.querySelectorAll('.js-chart');

containers.forEach( el => {
	new EasyPieChart(el, {
		animate: 2000,
		onStep: function(from, to, currentValue) {
        	$(this.el).find('span').text(~~currentValue);
        }
	});
});