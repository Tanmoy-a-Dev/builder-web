import React, { useEffect, useState } from "react";
import { changeData } from "../../../apiUtils/api-crud";
import LinkedBtn from "../../../components/buttons/LinkedBtn.jsx";
import Table from "../../../components/table/Table.jsx";
import { errFunc, msgFunc } from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";
import "./roles.css";
function ShowRoles() {
	const [roles, setRoles] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const {
		dataResponse: allRoles,
		responseError,
		isLoading,
	} = useGetData("private/show-roles");

	useEffect(() => {
		if (allRoles) setRoles(allRoles.roles);
	}, [allRoles]);

	const deleteRoleHandler = async (id) => {
		const { data: deletedData, error: deleteError } = await changeData(
			`private/delete-role/${id}`,
			"delete"
		);
		deleteError
			? errFunc(setError, deleteError)
			: msgFunc(setMessage, "deleted");

		const newRoles = roles.filter((role) => role.rolename !== deletedData.role);
		setRoles(newRoles);
	};
	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : responseError ? (
				<span className="error-message" style={{ color: "red" }}>
					{responseError}
				</span>
			) : (
				<div>
					<h1>{message}</h1>
					<h1>{error}</h1>
					<LinkedBtn
						link="/admin-panel/roles/create"
						btnTxt="Add Role"
						btnClass="btn-success add-btn"
					/>
					<div className="card-body table-responsive p-0">
						<Table
							headers={[{ Rolename: "string" }]}
							tableData={roles}
							link="/admin-panel/roles/update"
							func={deleteRoleHandler}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default ShowRoles;
