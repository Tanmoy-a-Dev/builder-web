import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud";
import FormFooter from "../../../components/form/FormFooter";
import StringField from "../../../components/FormFields/StringField.jsx";
import SingleInputTable from "../../../components/table/SingleInputTable.jsx";
import { PANEL_ROUTES } from "../../../configs/route.config";
import {
	errFunc,
	inputChangeHandler,
} from "../../../generalFunctions/functions";
import "./main.css";

function AddRole() {
	// state variables
	const [rolename, setRolename] = useState("");
	const [error, setError] = useState("");
	const [permission, setPermission] = useState([]);

	// other variables
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (permission.length === 0) {
			errFunc(setError, "Must give some permission to create a role");
			return;
		}

		const dataToAdd = {
			rolename,
			permissions: permission,
		};

		const { error: submitError } = await changeData(
			"private/create-role",
			"post",
			dataToAdd
		);
		submitError
			? errFunc(setError, submitError)
			: history.push("/admin-panel/roles/show");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				{error && <h1>{error}</h1>}

				<StringField
					label="Role Name:"
					id="rolename"
					name="rolename"
					required={true}
					inputType="text"
					inputValue={rolename}
					setStateValue={setRolename}
					onChangeFunc={inputChangeHandler}
				/>
				<SingleInputTable
					headers={["Slug", "Permission"]}
					tableData={PANEL_ROUTES}
					checkedState={permission}
					setState={setPermission}
				/>
				<FormFooter button="Add Role" />
			</form>
		</>
	);
}

export default AddRole;
