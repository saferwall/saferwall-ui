
export function getPaginationNumbers(current: number, total: number) {
	let ret = new Set<number>();
	function add(n: number) {
		n = Math.round(n);
		if (n > 0 && n <= total)
			ret.add(n);
	}
	add(1);
	const middleCount = 5;
	let offset = Math.floor(middleCount / 2);
	if (current - offset <= 0) {
		while (current - offset <= 0) {
			offset--;
		}
	} else if (current + ((middleCount - 1) - offset) > total) {
		while (current + ((middleCount - 1) - offset) > total) {
			offset++;
		}
	}
	Array(middleCount).fill(0).map((_, index) => {
		let ret = index + current - offset
		// console.log({ret});
		return ret;
	}).forEach(add);
	add(total);
	return ret;
}