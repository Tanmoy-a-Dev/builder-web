// importing essentials
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud.js";
import Form from "../../../components/form/Form.jsx";
import {
	errFunc,
	fileChangeHandler,
	inputObjectChangeHandler,
} from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";

const UpdateUser = () => {
	const history = useHistory();
	// const permissions = userInfo.permissions;

	const [inputObj, setInputObj] = useState({
		username: "",
		email: "",
		role: "",
	});
	const [error, setError] = useState("");
	const [roles, setRoles] = useState("");
	// for file
	const [tempImageState, setTempImageState] = useState("");
	const [selectedFile, setSelectedFile] = useState("");

	const { id } = useParams();

	const {
		dataResponse: allRoles,
		responseError: rolesResponseError,
		isLoading: rolesLoading,
	} = useGetData("private/show-roles");
	const {
		dataResponse: userData,
		responseError: userResponseError,
		isLoading: userLoading,
	} = useGetData(`private/get-user/${id}`);

	useEffect(() => {
		if (allRoles) setRoles(allRoles.roles);
		if (userData) {
			setInputObj({
				username: userData.user.username,
				email: userData.user.email,
				role: userData.user.role,
			});
			setSelectedFile(userData.user.profileImage);
		}
	}, [allRoles, userData]);

	const UpdateUser = async (e) => {
		e.preventDefault();

		const data = {
			...inputObj,
			profileImage: tempImageState,
		};

		const { error: submitError } = await changeData(
			`private/update-user/${id}`,
			"put",
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
			fieldType: "select",
			label: "Choose Role",
			id: "role",
			name: "role",
			value: inputObj.role,
			defaultValue: "",
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
			stateValue: selectedFile,
			setStateValue: setSelectedFile,
			onChangeFunc: fileChangeHandler,
		},
	];

	return (
		<>
			{rolesLoading || userLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<Form
						errorText={error}
						fields={inputArray}
						onSubmitMethod={UpdateUser}
						submitBtnTxt="Update User"
					/>
				</>
			)}
		</>
	);
};

export default UpdateUser;
