function gallery({
	section, 
	previewClass, 
	popupClass, 
	popupInner = '.popup__inner', 
	closeClickOverlay = true,
	enableArrows = true,
	nextArrow, 
	prevArrow,
	enablePopupNames = true,
	enableNames = false, 
	namesClass,
	popupNameBlockClass = '.popup__name'
}) {
	
	const workSection = document.querySelector(section),
				images = workSection.querySelectorAll(previewClass),
				popup = document.querySelector(popupClass),
				popupWindow = popup.querySelector(popupInner),
				prev = popup.querySelector(prevArrow),
				next = popup.querySelector(nextArrow),
				bigImage = document.createElement('img'),
				paths = [],
				names = [];


	if (enableNames) {
		images.forEach(item => {
			let nameBlock = document.createElement('div');
			nameBlock.classList.add(namesClass);

			let image = item.querySelector('img');
			let name = image.getAttribute('alt');

			nameBlock.textContent = name;
			item.appendChild(nameBlock);
		});
	}

	function setPopupName() {
		let popupNameBlock = popupWindow.querySelector(popupNameBlockClass);
		let		image = popupWindow.querySelector('img'),
					name = image.getAttribute('alt');

		if (!popupNameBlock) {
			popupNameBlock = document.createElement('div');
			popupNameBlock.classList.add(popupNameBlockClass.slice(1)); 
		}
		
		popupNameBlock.textContent = name;
		popupWindow.appendChild(popupNameBlock);
	}

	popupWindow.insertBefore(bigImage, popupWindow.children[0]);

	if (enableArrows) {
		next.addEventListener('click', (e) => {
			e.preventDefault();

			if ((paths.indexOf(bigImage.getAttribute('src')) + 1) >= paths.length) {
				bigImage.setAttribute('alt', names[0]);
				bigImage.setAttribute('src', paths[0]);
			} else {
				bigImage.setAttribute('alt', names[paths.indexOf(bigImage.getAttribute('src')) + 1]);
				bigImage.setAttribute('src', paths[paths.indexOf(bigImage.getAttribute('src')) + 1]);
			}

			if (enablePopupNames) {
				setPopupName();
			}
		});

		prev.addEventListener('click', (e) => {
			e.preventDefault();

			if ((paths.indexOf(bigImage.getAttribute('src')) - 1) < 0) {
				bigImage.setAttribute('alt', names[names.length - 1]);
				bigImage.setAttribute('src', paths[paths.length - 1]);				
			} else {
				bigImage.setAttribute('alt', names[paths.indexOf(bigImage.getAttribute('src')) - 1]);
				bigImage.setAttribute('src', paths[paths.indexOf(bigImage.getAttribute('src')) - 1]);
			}
			
			if (enablePopupNames) {
				setPopupName();
			}
		});
	} else {
		prev.style.display = 'none';
		next.style.display = 'none';
	}



	images.forEach( (item, i) => {
				let image = item.querySelector('img'),
				imagePath = image.getAttribute('src'),
				imageAlt = image.getAttribute('alt');

		paths.push(imagePath);
		names.push(imageAlt);

		item.addEventListener('click', (e) => {
			e.preventDefault();
			bigImage.setAttribute('src', paths[i]);
			bigImage.setAttribute('alt', names[i]);
			popup.style.display = 'block';
			if (enablePopupNames) {
				setPopupName();
			}
		});
	});

	popup.addEventListener('click', (e) => {
		e.preventDefault();

		if (e.target != popupInner &&
		 !e.target.parentNode.classList.contains(popupInner.slice(1)) &&
		 e.target != next &&
		 e.target != prev &&
		  closeClickOverlay) {

			popup.style.display = 'none';
		}
	});
}

export default gallery;