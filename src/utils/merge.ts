/**
 * Функция объединения 2-х вложенных объектов
 * @param lhs - объект, в который заливаем второй объект
 * @param rhs 
 * @returns lhs merged
 */

type Indexed<T = any> = {
	[key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (let key in rhs) {
		if (!rhs.hasOwnProperty(key)) {
			continue;
		}

		try {
			if (rhs[key].constructor === Object) {
				rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
			} else {
				lhs[key] = rhs[key];
			}
		} catch (e) {
			lhs[key] = rhs[key];
		}
	}

	return lhs;
}

export default merge
