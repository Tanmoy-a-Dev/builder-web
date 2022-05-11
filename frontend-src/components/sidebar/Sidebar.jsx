import React from "react";
import { sideMenu } from "../../configs/menu.config";
import NavItem from "./navItem/NavItem.jsx";
import "./sidebar-styles.css";

const Sidebar = () => {
	return (
		<nav className="sidebar">
			{sideMenu.map((item, index) => {
				return <NavItem key={`${item.label}-${index}`} item={item} />;
			})}
		</nav>
	);
};

export default Sidebar;
