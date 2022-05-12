function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, dotsClass, dotClass, dotActiveClass}) {
	const slider = document.querySelector(container),
		slidesWrapper = slider.querySelector(wrapper),
		slidesField = slider.querySelector(field),
		slides = slider.querySelectorAll(slide),
		prev = slider.querySelector(prevArrow),
		next = slider.querySelector(nextArrow),
		total = slider.querySelector(totalCounter),
		current = slider.querySelector(currentCounter),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (total && current) {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	slidesField.style.width = 100 * slides.length  + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
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

	const indicators = document.createElement('div'),
	dots = [];

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

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		setSliderElements(current, dots);
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		setSliderElements(current, dots);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			setSliderElements(current, dots);
		});
	});
}

export default slider;