import React, { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const LoggedinUserContext = createContext();

export const LoggedinUserProvider = (props) => {
	const {
		dataResponse: verifiedUserData,
		responseError,
		isLoading,
	} = useGetData("private");

	return (
		<>
			{isLoading ? (
				<h1>Authenticating User...</h1>
			) : responseError ? (
				<h1>{responseError}</h1>
			) : !verifiedUserData ? (
				<h1>You are not authenticated!</h1>
			) : (
				<LoggedinUserContext.Provider value={verifiedUserData}>
					{props.children}
				</LoggedinUserContext.Provider>
			)}
		</>
	);
};
