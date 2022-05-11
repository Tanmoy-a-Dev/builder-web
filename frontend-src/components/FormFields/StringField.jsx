import React from "react";

function StringField({
	id,
	label,
	name = "",
	required = false,
	readOnly = false,
	inputType,
	inputValue = "",
	stateValue = "",
	setStateValue,
	inputDefaultValue = "",
	index = null,
	onChangeFunc = function () {
		return;
	},
}) {
	return (
		<div className="col-sm-6">
			{/* {console.log(inputValue)}
			{console.log(setStateValue)} */}
			<div className="form-group">
				<label htmlFor={id}>{label}</label>
				{inputType === "password" ? (
					<input
						type={inputType}
						required={required}
						id={id}
						name={name}
						autoComplete="new-password"
						className="form-control"
						value={inputValue}
						onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}
					/>
				) : name === "username" ? (
					<input
						type={inputType}
						required={required}
						id={id}
						name={name}
						autoComplete="username"
						className="form-control"
						value={inputValue}
						onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}
					/>
				) : inputType === "email" ? (
					<input
						type={inputType}
						required={required}
						id={id}
						name={name}
						// autoComplete="email"
						className="form-control"
						value={inputValue}
						onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}
					/>
				) : (
					<input
						type={inputType}
						required={required}
						id={id}
						name={name}
						className="form-control"
						value={inputValue}
						onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}
					/>
				)}
			</div>
		</div>
	);
}

/*
<input
						type={inputType}
						readOnly={readOnly}
						required={required}
						id={id}
						name={name}
						// autoComplete="new-password"
						className="form-control"
						value={inputDefaultValue}
						onChange={(e) => onChangeFunc(e, setStateValue)}
					/>
*/

export default StringField;
