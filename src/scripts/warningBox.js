const box = $('.js-warning-box');
const btn = $('.js-warning-box-close');

box.each((i,el) => {
	const container = $(el);
	setTimeout(()=> container.slideUp(), 5000);

	const btn = $('.js-warning-box-close', container);

	btn.on('click', ()=> container.slideUp());
});