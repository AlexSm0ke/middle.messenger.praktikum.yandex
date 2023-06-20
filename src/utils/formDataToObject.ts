export const formDataToObject = (
	data: FormData
) => {
	const result: Record<string, any> = {};
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	Array.from(data.keys()).forEach((key) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		result[key] = data.get(key);
	});
	return result;
};
