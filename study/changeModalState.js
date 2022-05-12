import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
				windowWidth = document.querySelectorAll('#width'),
				windowHeight = document.querySelectorAll('#height'),
				windowType = document.querySelectorAll('#view_type'),
				windowProfile = document.querySelectorAll('.checkbox');


	function bindActionToElems(event, elem, prop) {
		elem.forEach((item, i) => {
			item.addEventListener(event, () => {
				switch(item.nodeName) {
					case 'SPAN': 
						state[prop] = item.lastChild.getAttribute('alt');
						break;
					case 'INPUT': 
						if (item.getAttribute('type') === 'checkbox') {
							if (i === 0) {
								state[prop] = 'Холодное';
							} else {
								state[prop] = 'Теплое';
							}

							elem.forEach((box, j) => {
								box.checked = false;
								if (i == j) {
									box.checked = true;
								}
							});
						} else {
							state[prop] = item.value;
						}
						break;
					case 'SELECT': 
						state[prop] = item.value;
						break;
				}

				console.log(state);
			});
		});
	}
	checkNumInputs('#width');
	checkNumInputs('#height');

	bindActionToElems('click', windowForm, 'form');
	bindActionToElems('input', windowWidth, 'width');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');


	
};

export default changeModalState;