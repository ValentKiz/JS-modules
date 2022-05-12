function slider({
	container, 
	slide, 
	numberOfSlides = 1, 
	numberToSlide = 1, 
	nextArrow, 
	prevArrow, 
	totalCounter, 
	currentCounter, 
	enableDots = true,
	dotsClass, 
	dotClass, 
	dotActiveClass
	}) {

	const slider = document.querySelector(container),
		slides = slider.querySelectorAll(slide),
		prev = slider.querySelector(prevArrow),
		next = slider.querySelector(nextArrow),
		total = slider.querySelector(totalCounter),
		current = slider.querySelector(currentCounter),
		dots = [];

	let slideIndex = 1;
	
	if (total) {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
		} else {
			total.textContent = slides.length;
		}
	}

	if (enableDots) {
		addDots(dots);
	}

	function addDots(dots) {
		const indicators = document.createElement('div');
	
		indicators.classList.add(dotsClass);
		slider.append(indicators);

		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement('button');
			dot.classList.add(dotClass);
			dot.setAttribute('data-slide-to', i + 1);
			if (i == 0) {
				dot.classList.add(dotActiveClass);
			}
			indicators.append(dot);
			dots.push(dot);
		}
	
		dots.forEach(dot => {
			dot.addEventListener('click', (e) => {
				const slideTo = e.target.getAttribute('data-slide-to');
	
				slideIndex = slideTo;
	
				showSlides(slideIndex);
				setSliderElements(current, dots);
			});
		});
	}

	function setSliderElements(counter, dots) {
		if (counter) {
			if (slides.length < 10) {
				counter.textContent = `0${slideIndex}`;
			} else {
				counter.textContent = slideIndex;
			}
		}

		if (dots) {
			dots.forEach(dot => dot.classList.remove(dotActiveClass));
			dots[slideIndex - 1].classList.add(dotActiveClass);
		}
	}

	setSliderElements(current, dots);

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => item.classList.add('hide'));
		
		console.log(slideIndex);

		for (let i = 0; i < numberOfSlides; i++) {
			if ((slideIndex - 1 + i) >= slides.length) {
				slideIndex = 1;
				slides[slideIndex - 1 + i].classList.remove('hide');
			} else {
				slides[slideIndex - 1 + i].classList.remove('hide');
			}
		}

		setSliderElements(current, dots);
	}

	showSlides(slideIndex);


	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	prev.addEventListener('click', () => {
		plusSlides(-numberToSlide);
		setSliderElements(current, dots);
	});
	next.addEventListener('click', () => {
		plusSlides(numberToSlide);
		setSliderElements(current, dots);
	});
}

export default slider;