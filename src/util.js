export const deepMerge = (obj1, obj2) => {
	for (let key in obj2) {
		if (key !== 'title' && key !== 'name') {
			obj1[key] = obj1[key] && (obj1[key].toString() === "[object Object]" || Array.isArray(obj1[key])) ?
				deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];

		}

	}
	return obj1;
}