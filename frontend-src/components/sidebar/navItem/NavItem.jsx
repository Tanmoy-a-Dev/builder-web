import React from "react";
import { NavLink } from "react-router-dom";
import "./navItem-styles.css";
import NavItemHeader from "./NavItemHeader.jsx";

const NavItem = (props) => {
	const { label, Icon, to, children } = props.item;

	if (children) {
		return <NavItemHeader item={props.item} />;
	}

	return (
		<NavLink
			exact
			to={to}
			className="navItem"
			activeClassName={`activeNavItem`}>
			<Icon className="navIcon" />
			<span className="navLabel">{label}</span>
		</NavLink>
	);
};

export default NavItem;
