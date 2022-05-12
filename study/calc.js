function calc () {
		///CALCULATOR

		const result = document.querySelector('.calculating__result span');

		let sex, height, weight, age, ratio;
	
		if(localStorage.getItem('sex')) {
			sex = localStorage.getItem('sex');
		} else {
			sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id');
			localStorage.setItem('sex', sex);
		}
	
		if(localStorage.getItem('ratio')) {
			ratio = localStorage.getItem('ratio');
		} else {
			ratio = document.querySelector('.calculating__choose_big .calculating__choose-item_active')
			.getAttribute('data-ratio');
			localStorage.setItem('ratio', ratio);
		}
	
		function initLocalStaticSettings(selector, activeClass) {
			const elements = document.querySelectorAll(selector);
	
			elements.forEach(elem => {
				elem.classList.remove(activeClass);
	
				if (elem.getAttribute('id') === localStorage.getItem('sex')) {
					elem.classList.add(activeClass);
				}
	
				if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
					elem.classList.add(activeClass);
				}
			});
		}
	
		initLocalStaticSettings('#gender div', 'calculating__choose-item_active');
		initLocalStaticSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	
		function calcTotal() {
			console.log(sex, age, weight, height, ratio);
			if (!sex || !height || !weight || !age || !ratio) {
				result.textContent = '____';
				return;
			}
	
			if (sex === 'female') {
				result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
			} else {
				result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
			}
		}
	
		calcTotal();
	
		function getStaticInformation(selector, activeClass) {
			const elements = document.querySelectorAll(selector);
	
			elements.forEach(elem => {
				elem.addEventListener('click', (e) => {
					if (e.target.getAttribute('data-ratio')) {
						ratio = +e.target.getAttribute('data-ratio');
						localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
					} else {
						sex = e.target.getAttribute('id');
						localStorage.setItem('sex', e.target.getAttribute('id'));
					}
		
					elements.forEach(elem => {
						elem.classList.remove(activeClass);
					});
		
					e.target.classList.add(activeClass);
		
					calcTotal();
				});
			});
		}
	
		getStaticInformation('#gender div', 'calculating__choose-item_active');
		getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	
	
		function setDynamicInformation(selector) {
			const input = document.querySelector(`#${selector}`);
	
			switch(input.getAttribute('id')) {
				case 'height':
					height = localStorage.getItem('height');
					input.value = height;
					break;
				case 'weight':
					weight = localStorage.getItem('weight');
					input.value = weight;
					break;
				case 'age':
					age = localStorage.getItem('age');
					input.value = age;
					break;
			}
	
			calcTotal();
	
			input.addEventListener('input', () => {
	
				if (input.value.match(/\D/g)) {
					input.style.border = '1px solid red';
				} else {
					input.style.border = 'none';
				}
	
				switch(input.getAttribute('id')) {
					case 'height':
						height = localStorage.getItem('height');
						height = +input.value;
						localStorage.setItem('height', height);
						break;
					case 'weight':
						weight = localStorage.getItem('weight');
						weight = +input.value;
						localStorage.setItem('weight', weight);
						break;
					case 'age':
						age = localStorage.getItem('age');
						age = +input.value;
						localStorage.setItem('age', age);
						break;
				}
	
				calcTotal();
			});
		}
	
		setDynamicInformation('height');
		setDynamicInformation('weight');
		setDynamicInformation('age');
}

export default calc;