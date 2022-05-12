function accordion({
	listClass, 
	listItemClass, 
	listItemsTitleClass, 
	listItemsContentClass, 
	activeClass, 
	hideClass = '.hide'
}) {
	const list = document.querySelector(listClass),
				listItems = list.querySelectorAll(listItemClass),
				listItemsTitle = list.querySelectorAll(listItemsTitleClass),
				listItemsContent = list.querySelectorAll(listItemsContentClass);

	function clearAccordion() {
		listItemsTitle.forEach(item => {
			item.classList.remove(activeClass.slice(1));
		});

		listItemsContent.forEach(item => {
			item.classList.add(hideClass.slice(1));
		});
	}

	listItems.forEach((item, i) => {
		item.addEventListener('click', e => {
			e.preventDefault();

			clearAccordion();

			if (listItemsTitle[i].classList.contains(activeClass.slice(1)) && e.target.classList.contains(activeClass.slice(1))) {
				listItemsTitle[i].classList.remove(activeClass.slice(1));
				listItemsContent[i].classList.add(hideClass.slice(1));
			} else {
				listItemsTitle[i].classList.add(activeClass.slice(1));
				listItemsContent[i].classList.remove(hideClass.slice(1));
			}
	
			console.log(e.target, i);
		});
	});

	console.log(list);
	console.log(listItems);
	console.log(listItemsTitle);
	console.log(listItemsContent);
}

export default accordion;