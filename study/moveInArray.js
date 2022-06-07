function moveInArray(arr, start, end) {
	if (start === end) return arr;

	if (arr && start && end) {
		let target = arr[start]
		let inc = end < start ? -1 : 1;

		for (let k = start; k!== end; k+= inc) {
			arr[k] = arr[k + inc];
		}

		arr[end] = target;

		return arr;
	}
}

export default moveInArray;