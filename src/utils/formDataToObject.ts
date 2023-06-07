export const formDataToObject = (
	data: FormData
) => {
	const result: Record<string, any> = {};
	Array.from(Object.keys(data)).forEach((key) => {
		result[key] = data.get(key);
	});
	return result;
};
