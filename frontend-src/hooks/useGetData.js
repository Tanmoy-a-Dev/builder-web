import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getData } from "../apiUtils/api-crud";
import { resolve } from "../apiUtils/resolver";

function useGetData(url) {
	const [dataResponse, setDataResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const componentMounted = useRef(true);

	const fetchData = async (cancelToken, componentMounted) => {
		const { data, error } = await resolve(
			getData(url, cancelToken, componentMounted)
		);
		error ? setResponseError(error) : setDataResponse(data);
		setIsLoading(false);
	};

	useEffect(() => {
		const source = axios.CancelToken.source();
		let cancelToken = source.token;

		fetchData(cancelToken, componentMounted.current);

		return () => {
			componentMounted.current = false;
			source.cancel();
		};
	}, []);

	return { dataResponse, responseError, isLoading };
}

export default useGetData;
