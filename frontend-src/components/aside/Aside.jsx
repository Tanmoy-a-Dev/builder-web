import React from "react";
import Sidebar from "../sidebar/Sidebar.jsx";
import "./aside.css";

const Aside = () => {
	return (
		<aside className={`aside `}>
			<div className="brand">
				<h3>SPA Builder</h3>
			</div>
			<Sidebar />
		</aside>
	);
};

export default Aside;
