import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud";
import FormFooter from "../../../components/form/FormFooter";
import StringField from "../../../components/FormFields/StringField.jsx";
import SingleInputTable from "../../../components/table/SingleInputTable.jsx";
import { PANEL_ROUTES } from "../../../configs/route.config";
import useGetData from "../../../hooks/useGetData";
import "./main.css";

function UpdateRole() {
	// state variables
	const [error, setError] = useState("");
	const [permission, setPermission] = useState([]);

	// other variables
	const history = useHistory();
	const { id } = useParams();

	const { dataResponse, responseError, isLoading } = useGetData(
		`private/get-role/${id}`
	);

	useEffect(() => {
		if (dataResponse) setPermission(dataResponse.role.permissions);
	}, [dataResponse]);

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const dataToUpdate = {
			rolename: dataResponse.role.rolename,
			permissions: permission,
		};
		const { error: submitError } = await changeData(
			`private/update-role/${id}`,
			"put",
			dataToUpdate
		);
		submitError
			? errFunc(setError, submitError)
			: history.push("/admin-panel/roles/show");
	};
	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<form onSubmit={handleOnSubmit}>
					{responseError && (
						<span className="error-message">{responseError}</span>
					)}
					{error && <span className="error-message">{error}</span>}

					<StringField
						label="Role Name:"
						required={true}
						readOnly={true}
						inputType="text"
						inputValue={dataResponse.role.rolename}
					/>

					<SingleInputTable
						headers={["Slug", "Permission"]}
						tableData={PANEL_ROUTES}
						checkedState={permission}
						setState={setPermission}
					/>

					<FormFooter button="Update Role" />
				</form>
			)}
		</>
	);
}

export default UpdateRole;
