import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getData } from "../../apiUtils/api-crud";
import { resolve } from "../../apiUtils/resolver";
import { LoggedinUserContext } from "../../contexts/LoggedinUserContext";
import { errFunc } from "../../generalFunctions/functions";
import "./header.css";

const Header = ({ handleToggle, loggedUserInfo }) => {
	const history = useHistory();
	// const { id, name } = loggedUserInfo.userInfo;

	const { userInfo } = useContext(LoggedinUserContext);

	const LogoutHandler = async () => {
		const { error } = await resolve(getData("auth/logout"));
		error ? errFunc(setError, error) : history.push("/login");
	};

	return (
		<header className="header">
			<div className="hamburger" onClick={handleToggle}>
				<svg className="icon" viewBox="0 0 100 80" width="30" height="30">
					<rect width="100" height="15"></rect>
					<rect y="30" width="100" height="15"></rect>
					<rect y="60" width="100" height="15"></rect>
				</svg>
			</div>
			<div className="user">
				<span>{userInfo.name}</span>
				<button className="button log-out-btn" onClick={LogoutHandler}>
					Logout
				</button>
			</div>
			{/* <div className="img">
						<img
							src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&w=1000&q=80"
							alt=""
						/>
					</div> */}
		</header>
	);
};

export default Header;
