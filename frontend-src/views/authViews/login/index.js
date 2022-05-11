import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud";
import { errFunc } from "../../../generalFunctions/functions";

const LoginScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	const loginHandler = async (e) => {
		e.preventDefault();
		const credentials = { username, password };
		
		const { error: loginError } = await changeData("auth/login", "post", credentials);
		loginError ?
			errFunc(setError, loginError) : history.push("/admin-panel");
	};

	return (
		<>
			<form
				onSubmit={loginHandler}
				className="d-flex flex-column align-items-center justify-content-center auth-page">
				<h3>Login </h3>
				<div className="mt-2 mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						fill="currentColor"
						className="bi bi-shield-lock-fill"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
						/>
					</svg>
				</div>
				{error && <span className="error-message">{error}</span>}

				<div className="input-group mb-3 col-md-8 d-flex justify-content-center">
					<div className="input-group-prepend">
						<span className="input-group-text">@</span>
					</div>

					<input
						className="form-control col-sm-4"
						type="text"
						required
						id="name"
						placeholder="Enter username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="input-group mb-3 col-md-8 d-flex justify-content-center">
					{/* <label htmlFor="name">Username:</label> */}
					<div className="input-group-prepend">
						<span className="input-group-text">#</span>
					</div>

					<input
						className="form-control col-sm-4"
						type="password"
						required
						id="password"
						autoComplete="true"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Link to={"/forgot-password"} className="auth-link">
					Forgot Password?
				</Link>

				<button type="submit" className="btn mt-3 auth-button">
					Login
				</button>
			</form>
		</>
	);
};

export default LoginScreen;
