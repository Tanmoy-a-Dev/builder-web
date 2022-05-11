import React, { useContext } from "react";
import { LoggedinUserContext } from "../contexts/LoggedinUserContext";
import useRenderView from "../hooks/useRenderView";

function PageToView({ route }) {
	const pageToRender = useRenderView(route);
	// console.log(pageToRender);

	const { userInfo } = useContext(LoggedinUserContext);
	const checked = userInfo.permissions.includes(route);

	return (
		<>
			{!checked ? (
				<h1>
					You are not authorized for this route. Please contact with your admin.
				</h1>
			) : (
				pageToRender
			)}
		</>
	);
}

export default PageToView;
