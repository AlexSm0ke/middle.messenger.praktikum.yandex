// [1, 2, 3, 4] => 4

function last(list) {
	if (!Array.isArray(list)) {
		return undefined;
	}

	const length = list.length;
	return length ? list[length - 1] : undefined;
}

/*
	* range(4); // => [0, 1, 2, 3] 
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

const baseRange = (start, end, step) => {
	let index = -1;
	let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
	const result = new Array(length);

	while (length--) {
		result[++index] = start;
		start += step;
	}

	return result;
}

// Проверку на типы данных не добавлял, но студенты должны будут
function range(start = 0, end, step = 1, isRight = false) {
	let result = [];

	if (isRight === false) {
		if (end === undefined) {
			if (start === 0) return result;
			const endArray = start;
			const startArray = 0;

			if (endArray < 0) {
				for (let i = startArray; i > endArray; i -= step) {
					result.push(i);
				}
				return result;
			} else {
				for (let i = startArray; i < endArray; i += step) {
					result.push(i);
				}
				return result;
			}
		}

		if (end < 0) {
			for (let i = start; i > end; i -= step) {
				result.push(i);
			}
		} else {
			for (let i = start; i < end; i += step) {
				result.push(i);
			}
			return result;
		}


	} else {
		if (end === undefined) {
			if (start === 0) return result;
			const startArray = start;
			const endArray = 0;

			if (startArray < 0) {
				for (let i = startArray + step; i <= endArray; i += step) {
					result.push(i);
				}
				return result;
			} else {
				for (let i = startArray - step; i >= endArray; i -= step) {
					result.push(i);
				}
				return result;
			}
		}

		if (end < 0) {
			for (let i = end + step; i <= start; i -= step) {
				result.push(i);
			}
		} else {
			for (let i = end - step; i >= start; i -= step) {
				result.push(i);
			}
			return result;
		}
	}
};

function rangeRight(start, end, step) {
	return range(start, end, step, true);
};
