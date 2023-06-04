type PlainObject<T = any> = {
	[k in string]: T;
};

// проверка на Объект
function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

// проверка на массив
function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

// Проверка на массив или объект
function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
	// если длина количество ключей на этом уровне вложенности отличается
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];

		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			// если value является объектом или массивом, то рекурсивно вызываем функцию со значениями вложенного уровня
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		} else if (value !== rightValue) {
			return false;
		}
	}

	return true;
}
