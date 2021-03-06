export const resolve = async (promise) => {
	const resolved = {
		data: null,
		error: null,
	};

	try {
		resolved.data = await promise;
	} catch (e) {
		resolved.error = e.response.data.msg;
	}
	return resolved;
};