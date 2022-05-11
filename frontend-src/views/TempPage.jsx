import React from "react";
import { Link } from "react-router-dom";

function TempPage() {
	return (
		<div>
			<h1>This is a temporary homepage</h1>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default TempPage;
