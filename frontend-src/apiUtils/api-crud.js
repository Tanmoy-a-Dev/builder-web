import axios from "axios";
import { API_URL } from "./apiUrl";
import { resolve } from "./resolver";

export async function changeData(url, method, payload = {}) {
	return method === "delete"
		? await resolve(
				axios
					.delete(`${API_URL}/${url}`, { withCredentials: true })
					.then((res) => res.data)
		  )
		: await resolve(
				axios[method](`${API_URL}/${url}`, payload, {
					withCredentials: true,
				}).then((res) => {
					return res.data;
				})
		  );
}

export function getData(url, cancelToken, componentMounted) {
	return axios
		.get(`${API_URL}/${url}`, {
			cancelToken: cancelToken,
			withCredentials: true,
		})
		.then((res) =>
			componentMounted && res.data.constructor !== Object
				? "Invalid Url"
				: res.data
		)
		.catch((err) => {
			if (!componentMounted) return; // comp already unmounted, nothing to do
			throw axios.isCancel(err) ? "Cancelled" : err.response;
		});
}
