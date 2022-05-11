import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud";
import Form from "../../../components/form/Form.jsx";
import {
	errFunc,
	fileChangeHandler,
	inputObjectChangeHandler,
} from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";

function UpdateProfile() {
	const history = useHistory();

	const [inputObj, setInputObj] = useState({
		username: "",
		email: "",
	});
	const [error, setError] = useState("");
	// for file
	const [tempImageState, setTempImageState] = useState("");
	const [selectedFile, setSelectedFile] = useState("");

	const { id } = useParams();

	const {
		dataResponse: userData,
		responseError: userResponseError,
		isLoading: userLoading,
	} = useGetData(`private/get-user/${id}`);

	useEffect(() => {
		if (userData) {
			setInputObj({
				username: userData.user.username,
				email: userData.user.email,
			});
			setSelectedFile(userData.user.profileImage);
		}
	}, [userData]);

	const UpdateProfile = async (e) => {
		e.preventDefault();

		const data = {
			...inputObj,
			profileImage: tempImageState,
		};

		const { error: submitError } = await changeData(
			`private/update-profile/${id}`,
			"put",
			data
		);
		submitError
			? errFunc(setError, submitError)
			: history.push("/admin-panel/profile");
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
			{userLoading ? (
				<h1>Loading...</h1>
			) : userResponseError ? (
				<h1>{userResponseError}</h1>
			) : (
				<Form
					errorText={error}
					fields={inputArray}
					onSubmitMethod={UpdateProfile}
					submitBtnTxt="Update Profile"
				/>
			)}
		</>
	);
}

export default UpdateProfile;
