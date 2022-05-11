import React from "react";
import "./main.css";

const Main = ({ children }) => {
	// console.log(children);
	return (
		<main className="main">
			{/* {console.log(userInfo)} */}
			{children}
		</main>
	);
};

export default Main;
