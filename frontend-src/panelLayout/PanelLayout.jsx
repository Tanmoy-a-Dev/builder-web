import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Aside from "../components/aside/Aside.jsx";
import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/Header.jsx";
import Main from "../components/main/Main.jsx";
import "./panel-layout-style.css";

const PanelLayout = (props) => {
	// states
	const [width, setWidth] = useState(window.innerWidth);
	const [show, setShow] = useState(width <= 820 ? true : false);

	// necessary variables
	const { children } = props;
	const location = useLocation();
	const toggleClassName = show ? "show" : "";

	// functions to use
	const handleToggle = () => {
		setShow(!show);
	};
	// const {
	// 	dataResponse: verifiedUserData,
	// 	responseError,
	// 	isLoading,
	// } = useGetData("private");
	// console.log(verifiedUserData);

	// const loggedUser = async () => {
	// 	const res = await loggedInUserData();
	// 	console.log(res);
	// 	res.error
	// 		? setError(res.error)
	// 		: setUserInfo(res.data && res.data.userInfo);
	// 	setIsLoading(false);
	// };

	// useEffect(() => {
	// 	loggedUser();
	// }, []);

	useLayoutEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		handleToggle();
		return () => window.removeEventListener("resize", handleResize);
	}, [location]);

	return (
		<>
			{/* {isLoading ? (
				<h1>PanelLoading...</h1>
			) : responseError ? (
				<h1>Fetching data failed!</h1> 
			) : !verifiedUserData ? (
				<h3>You are not authorized</h3>
			) : ( */}
			<div className="layout">
				<div className={`left ${toggleClassName}`}>
					<Aside />
				</div>
				<div className="right">
					<Header
						handleToggle={handleToggle}
						// loggedUserInfo={verifiedUserData}
					/>
					<Main children={children} />
					<Footer />
				</div>
			</div>
			{/* )} */}
		</>
	);
};

export default PanelLayout;
