import React from "react";
import {
	defaultCheckedFunc,
	handleArrayStateChange,
} from "../../generalFunctions/functions";

function CheckField({
	id,
	defaultFuncParam,
	checkedState = "",
	setState,
	// defaultCheckedFunc = function (param) {
	// 	return false;
	// },
	onChangeFunc = function (param) {
		return;
	},
}) {
	return (
		<div className="custom-control custom-switch">
			{/* {console.log(checkedState, defaultFuncParam)}
			{console.log(defaultCheckedFunc(checkedState, defaultFuncParam))} */}

			<input
				type="checkbox"
				className="custom-control-input"
				id={id}
				defaultChecked={defaultCheckedFunc(checkedState, defaultFuncParam)}
				onChange={() =>
					handleArrayStateChange(checkedState, defaultFuncParam, setState)
				}
			/>

			<label className="custom-control-label" htmlFor={id}></label>
		</div>
	);
}

export default CheckField;
