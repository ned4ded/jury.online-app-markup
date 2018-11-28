import { OPEN, BODY } from './constants';
import { Select } from './lib/select';
import datepicker from 'air-datepicker';

class Bonuscreator {
	constructor() {
		this.bonusesWrap = $('.js-bonuses');
		this.bonuses = $('.js-bonuses .js-bonus-template');
		this.bonusesLength = this.bonuses.length;
		this.btn = $('.js-add-bonus');
		this.template = $('.js-bonus-template-parent .js-bonus-template');

		this.bonusSerialNumb = $('.js-bonus-serial-numb');
		this.bonusDate = $('.js-bonus-date');
		this.bonusParcent = $('.js-bonus-parcent');
		this.bonusTextParcent = $('.js-bonus-text-parcent');

		this.bonusColors = this.bonusesWrap.data('bonuses-shadow').replace(/\s/g, '').split(',') || [];
		this.bonusColorsIndex = 0;

		this.initBonus();
		this.addBonus();
	}
	initBonus() {
		this.bonuses.each((i,el)=> {
			const bonus = $(el);
			
			// set bonus id
			this.bonusId('.js-bonus-serial-numb', i, bonus);
			
			// parcent
			const inputParcent = $('.js-bonus-parcent', bonus);
			inputParcent.on('keyup', () => {
				this.copyValue({
					parent: bonus,
					containerFrom: '.js-bonus-parcent',
					containerTo: '.js-bonus-text-parcent'
				});
			});
			this.copyValue({
				parent: bonus,
				containerFrom: '.js-bonus-parcent',
				containerTo: '.js-bonus-text-parcent'
			});

			// date from
			this.copyValue({
				parent: bonus,
				containerFrom: '[data-bonus-input="from"]',
				containerTo: '[data-bonus-text="from"]',
				placeholder: '__.__.____'
			});
			// date to
			this.copyValue({
				parent: bonus,
				containerFrom: '[data-bonus-input="to"]',
				containerTo: '[data-bonus-text="to"]',
				placeholder: '__.__.____'
			});
			
			// init datepicker
			const datepickerInput = $('.js-bonus-datepicker', bonus);
			this.initDatepicker(datepickerInput, bonus);


			// set shadow
			this.setShadow(bonus,i);

		});
	}
	setShadow(el,i) {
		el.css('box-shadow', `0 0 8px ${this.bonusColors[this.bonusColorsIndex]}`);
		(this.bonusColorsIndex < this.bonusColors.length - 1 ) 
			? this.bonusColorsIndex += 1
			: this.bonusColorsIndex = 0;
	}
	bonusId(el, i, parent) {
		const numbContainer = $(el, parent);
		numbContainer.text(i + 1);
	}
	copyValue(props) {
		const valueFrom = $(props.containerFrom, props.parent).val() || props.placeholder || 0;
		const containerTo = $(props.containerTo, props.parent);
		containerTo.text(valueFrom);
	}
	addBonus() {
		this.btn.on('click', ()=> {
			const clone = this.template.clone();

			clone.appendTo(this.bonusesWrap);

			const datepickerInput = $('.js-bonus-datepicker', clone);
			this.initDatepicker(datepickerInput, clone);

			const inputParcent = $('.js-bonus-parcent', clone);
			inputParcent.on('keyup', () => {
				this.copyValue({
					parent: clone,
					containerFrom: '.js-bonus-parcent',
					containerTo: '.js-bonus-text-parcent'
				});
			});

			const numbContainer = $('.js-bonus-serial-numb', clone);
			numbContainer.text(this.bonusesLength += 1);

			// set input name
			const inputs = $('input', clone);
			inputs.each((i,el) => {
				const input = $(el);
				const nameText = input.attr('name') + this.bonusesLength;
				input.attr('name', nameText);
			});

			// set shadow
			this.setShadow(clone,clone.index());
		});
	}
	initDatepicker(input, parent) {
		const bonusInputs = $('.js-bonus-parent');
		bonusInputs.on('click', function(e){
			const that = $(this);
			bonusInputs.removeClass(OPEN);
			(!that.hasClass(OPEN))
				? that.addClass(OPEN)
				: that.removeClass(OPEN);
			e.stopPropagation();
		});
		BODY.on('click', () => bonusInputs.removeClass(OPEN) );
		
		// set value from calendar input
		const setDate = (input) => {
			const value = input.val();
			const key = input.data('bonus-input');
			const textContainer = $(`[data-bonus-text="${key}"]`, parent);
			textContainer.text(value);
		}
		
		input.each((i,el)=>{
			const input = $(el);
			if (input.hasClass('is-init')) return;
			let dp = input.datepicker({
				onSelect: function(form, date, inst) {
					inst.$el.trigger('change');
					setDate(input);
				}
			}).data('datepicker');
			const startDate = input.data('start-select-date');
			if (startDate) dp.selectDate(new Date(startDate));
			input.addClass('is-init');
		});
	}
}
const bonusesWrap = $('.js-bonuses');
if (bonusesWrap.length) new Bonuscreator();
