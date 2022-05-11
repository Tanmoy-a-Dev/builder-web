import React from "react";
import FileField from "../FormFields/FileField.jsx";
import SelectField from "../FormFields/SelectField.jsx";
import StringField from "../FormFields/StringField.jsx";
import FormFooter from "./FormFooter";

function Form({
	errorText = "",
	msgText = "",
	fields = [],
	onSubmitMethod = function (param) {
		return;
	},
	submitBtnTxt = "",
}) {
	return (
		<>
			{/* {console.log(fields)} */}
			<form
				onSubmit={onSubmitMethod}
				encType="multipart/form-data"
				className="row">
				{errorText && (
					<div className="bg-danger msgDiv">
						<p>{errorText}</p>
					</div>
				)}
				{msgText && (
					<div className="bg-success msgDiv">
						<p>{msgText}</p>
					</div>
				)}

				{fields.map((field) => {
					// console.log(field.setStateValue);
					return field.fieldType === "string" ? (
						<StringField
							key={field.id}
							label={field.label}
							id={field.id}
							name={field.name}
							required={field.required}
							inputType={field.inputType}
							inputValue={field.inputValue}
							stateValue={field.stateValue}
							setStateValue={field.setStateValue}
							inputDefaultValue={field.inputDefaultValue}
							onChangeFunc={field.onChangeFunc}
						/>
					) : field.fieldType === "select" ? (
						<SelectField
							key={field.id}
							label={field.label}
							id={field.id}
							name={field.name}
							value={field.value}
							defaultValue={field.defaultValue}
							optionsArray={field.optionsArray}
							optionName={field.optionName}
							disabledOption={field.disabledOption}
							disabledOptionValue={field.disabledOptionValue}
							disabledOptionTag={field.disabledOptionTag}
							stateValue={field.stateValue}
							setStateValue={field.setStateValue}
							onChangeFunc={field.onChangeFunc}
						/>
					) : field.fieldType === "file" ? (
						<FileField
							key={field.id}
							label={field.label}
							id={field.id}
							name={field.name}
							filename={field.filename}
							tempImageState={field.tempImageState}
							setTempImageState={field.setTempImageState}
							stateValue={field.stateValue}
							setStateValue={field.setStateValue}
							// ref={ref}
							onChangeFunc={field.onChangeFunc}
						/>
					) : (
						<input type="text"></input>
					);
				})}

				<FormFooter button={submitBtnTxt} />
			</form>
		</>
	);
}

export default Form;
