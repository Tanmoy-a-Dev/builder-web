import React from "react";

function SelectField({
	label = "",
	id = "",
	name = "",
	value = "",
	defaultValue = "select",
	optionsArray = [],
	optionName = "",
	disabledOption = true,
	disabledOptionValue = "select",
	disabledOptionTag = "Select",
	index = null,
	stateValue,
	setStateValue,
	onChangeFunc = function () {
		return;
	},
}) {
	return (
		<div className="col-sm-6">
			<label htmlFor={id}>{label}</label>
			{defaultValue ? (
				<select
					className="form-control form-select"
					required
					name={name}
					id={id}
					defaultValue={defaultValue}
					onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}>
					{disabledOption && (
						<option value={disabledOptionValue} disabled>
							{disabledOptionTag}
						</option>
					)}
					{optionName &&
						optionsArray.map((item) => (
							<option
								key={item[optionName]}
								name={item[optionName]}
								value={item[optionName]}>
								{item[optionName]}
							</option>
						))}
					{!optionName &&
						optionsArray.map((item) => (
							<option key={item.id} name={item.name} value={item.name}>
								{item.name}
							</option>
						))}
				</select>
			) : (
				<select
					className="form-control form-select"
					required
					name={name}
					value={value}
					onChange={(e) => onChangeFunc(e, setStateValue, stateValue, index)}>
					{disabledOption && (
						<option value={disabledOptionValue} disabled>
							{disabledOptionTag}
						</option>
					)}
					{optionName &&
						optionsArray.map((item) => (
							<option
								key={item[optionName]}
								name={item[optionName]}
								value={item[optionName]}>
								{item[optionName]}
							</option>
						))}
					{optionsArray.map((item) => (
						<option key={item.id} name={item.name} value={item.name}>
							{item.name}
						</option>
					))}
				</select>
			)}
		</div>
	);
}

export default SelectField;
