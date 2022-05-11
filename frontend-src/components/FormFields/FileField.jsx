import React from "react";
import "./field.css";

function FileField({
	label = "",
	id = "",
	name = "",
	filename = "",
	tempImageState,
	setTempImageState,
	value,
	stateValue,
	setStateValue,
	// ref,
	onChangeFunc = function () {
		return;
	},
}) {
	return (
		<div className="mb-3 col-sm-6">
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				type="file"
				name={name}
				filename={filename}
				id={id}
				className="form-control"
				value={value}
				onChange={(e) => onChangeFunc(e, setStateValue, setTempImageState)}
			/>
			{typeof stateValue !== "object" && stateValue !== "null" && (
				<div className="previewImageBox">
					<img src={stateValue} className="previewImage" />
				</div>
			)}
			{tempImageState && (
				<div className="previewImageBox">
					<img src={tempImageState} className="previewImage" />
				</div>
			)}
		</div>
	);
}

export default FileField;
