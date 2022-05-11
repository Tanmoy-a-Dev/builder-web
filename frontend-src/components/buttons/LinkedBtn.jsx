import React from "react";
import { Link } from "react-router-dom";

function LinkedBtn({ link, id = "", btnTxt, btnClass = "" }) {
	return (
		<Link to={`${link}/${id}`} className={`btn ${btnClass}`}>
			{btnTxt}
		</Link>
	);
}

export default LinkedBtn;
