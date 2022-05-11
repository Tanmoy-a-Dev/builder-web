import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud.js";
import Form from "../../../components/form/Form.jsx";
import {
	errFunc,
	fileChangeHandler,
	inputChangeHandler,
	inputObjectChangeHandler,
} from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";

const AddUser = ({ check }) => {
	// declaring essentials
	const history = useHistory();
	// declaring state variables
	const [error, setError] = useState("");
	const [roles, setRoles] = useState([]);
	const [tempImageState, setTempImageState] = useState("");

	const [inputObj, setInputObj] = useState({
		username: "",
		email: "",
		password: "",
		role: "",
	});

	const [confirmpassword, setConfirmPassword] = useState("");
	const [fileInputState, setFileInputState] = useState("");
	const [selectedFile, setSelectedFile] = useState([]);

	// useEffect function
	const {
		dataResponse: allRoles,
		responseError,
		isLoading,
	} = useGetData("private/show-roles");

	useEffect(() => {
		if (allRoles) setRoles(allRoles.roles);
	}, [allRoles]);

	const AddUser = async (e) => {
		e.preventDefault();

		const checked = statesEqualityCheck(
			inputObj,
			"password",
			"",
			confirmpassword,
			setInputObj,
			"",
			setConfirmPassword,
			"Passwords do not matched",
			setError
		);
		if (checked === false) {
			return;
		}

		if (inputObj.role === "") {
			errFunc(setError, "Role is required");
			return;
		}

		if (!tempImageState) {
			errFunc(setError, "Image is required");
			return;
		}

		const data = {
			...inputObj,
			profileImage: tempImageState,
		};

		const { data: subData, error: submitError } = await changeData(
			"private/create-user",
			"post",
			data
		);
		submitError
			? errFunc(setError, submitError)
			: history.push("/admin-panel/users/show");
	};
	const inputArray = [
		{
			fieldType: "string",
			label: "UserName",
			id: "username",
			name: "username",
			required: true,
			inputType: "text",
			inputValue: inputObj.username,
			stateValue: inputObj,
			setStateValue: setInputObj,
			inputDefaultValue: "",
			onChangeFunc: inputObjectChangeHandler,
		},
		{
			fieldType: "string",
			label: "Email",
			id: "email",
			name: "email",
			required: true,
			inputType: "email",
			inputValue: inputObj.email,
			stateValue: inputObj,
			setStateValue: setInputObj,
			inputDefaultValue: "",
			onChangeFunc: inputObjectChangeHandler,
		},
		{
			fieldType: "string",
			label: "Password",
			id: "password",
			name: "password",
			required: true,
			inputType: "password",
			inputValue: inputObj.password,
			stateValue: inputObj,
			setStateValue: setInputObj,
			inputDefaultValue: "",
			onChangeFunc: inputObjectChangeHandler,
		},
		{
			fieldType: "string",
			label: "Confirm Password",
			id: "confirmpassword",
			name: "confirmpassword",
			required: true,
			inputType: "password",
			inputValue: confirmpassword,
			setStateValue: setConfirmPassword,
			inputDefaultValue: "",
			onChangeFunc: inputChangeHandler,
		},
		{
			fieldType: "select",
			label: "Choose Role",
			id: "role",
			name: "role",
			value: inputObj.role,
			defaultValue: "select",
			optionsArray: roles,
			optionName: "rolename",
			disabledOption: true,
			disabledOptionValue: "select",
			disabledOptionTag: "Select",
			stateValue: inputObj,
			setStateValue: setInputObj,
			onChangeFunc: inputObjectChangeHandler,
		},
		{
			fieldType: "file",
			label: "Image box",
			id: "formFile",
			name: "profileImage",
			filename: "profileImage",
			tempImageState,
			setTempImageState,
			value: fileInputState,
			stateValue: selectedFile,
			setStateValue: setSelectedFile,
			onChangeFunc: fileChangeHandler,
		},
	];

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{responseError && <h1>{responseError}</h1>}

			{/* {!check ? <h1 className="bg-danger">You Dont have Permission for this route. Contact with your admin</h1> : ( */}
			<Form
				errorText={error}
				fields={inputArray}
				onSubmitMethod={AddUser}
				submitBtnTxt="Add User"
			/>

			{/* <form onSubmit={AddUser} encType="multipart/form-data" className="row">
				{error && (
					<div className="bg-danger msgDiv">
						<p>{error}</p>
					</div>
				)}
				{message && (
					<div className="bg-success msgDiv">
						<p>{message}</p>
					</div>
				)}

				<StringField
					label="UserName"
					id="username"
					name="username"
					required={true}
					inputType="text"
					inputValue={inputObj.username}
					setValue={setInputObj}
					inputDefaultValue=""
					onChangeFunc={sendInputChangeHandler}
				/>
				<StringField
					label="Email"
					id="email"
					name="email"
					required={true}
					inputType="email"
					inputValue={inputObj.email}
					setValue={setInputObj}
					inputDefaultValue=""
					onChangeFunc={sendInputChangeHandler}
				/>
				<StringField
					label="PassWord"
					id="password"
					name="password"
					required={true}
					inputType="password"
					inputValue={inputObj.password}
					setValue={setInputObj}
					inputDefaultValue=""
					onChangeFunc={sendInputChangeHandler}
				/>
				<StringField
					label="Confirm PassWord"
					id="confirmpassword"
					name="confirmpassword"
					required={true}
					inputType="password"
					inputValue={confirmpassword}
					setValue={setConfirmPassword}
					inputDefaultValue=""
					onChangeFunc={inputChangeHandler}
				/>

				<SelectField
					label="Choose Role"
					id="role"
					name="role"
					value={inputObj.role}
					defaultValue="select"
					optionsArray={roles}
					optionName="rolename"
					disabledOption={true}
					disabledOptionValue="select"
					disabledOptionTag="Select"
					setValue={setInputObj}
					onChangeFunc={sendInputChangeHandler}
				/>

				<FileField
					label="Image box"
					id="formFile"
					name="profileImage"
					filename="profileImage"
					// ref={ref}
					onChangeFunc={changeHandler}
				/>

				<FormFooter button="Add User" />
			</form> */}
			{/* check end */}
		</>
	); // return end
};

export default AddUser;
