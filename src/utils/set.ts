/**
 * Функция, которая получает путь к вложенному свойству объекта  и устанавливает значение в это свойство.
 * Если поля не существует, то оно создается по указанному пути.
 * @param object 
 * @param {string} path - путь к вложенному объекту
 * @param value 
 * @returns 
 */

import merge from "./merge";


export type Indexed<T = unknown> = {
	[key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (typeof object !== 'object' || object === null) {
		return object;
	}

	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
		[key]: acc,
	}), value as any);
	return merge(object as Indexed, result);
}
