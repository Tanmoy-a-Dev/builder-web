import React, { useEffect, useState } from "react";
import { changeData } from "../../../apiUtils/api-crud";
import LinkedBtn from "../../../components/buttons/LinkedBtn.jsx";
import Table from "../../../components/table/Table.jsx";
import { errFunc, msgFunc } from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";

function ShowUsers() {
	// state variables
	const [error, setError] = useState("");
	const [users, setUsers] = useState("");
	const [userPermissions, setUserPermissions] = useState([]);
	const [message, setMessage] = useState("");

	function importAll(r) {
		let images = {};
		r.keys().map((item, index) => {
			images[item.replace("../", "")] = r(item);
		});
		return images;
	}

	const imgs = importAll(
		require.context("../../../../Images/avatars", false, /\.(png|jpe?g|svg)$/i)
	);

	// custom hook call
	const {
		dataResponse: usersData,
		responseError,
		isLoading,
	} = useGetData("private/show-users");

	// setting state from custom hook data
	useEffect(() => {
		if (usersData) {
			setUsers(usersData.users);
			// setUserPermissions(usersData.permissions);
		}
	}, [usersData]);

	const deleteUserHandler = async (id) => {
		const { data: deletedData, error: deleteError } = await changeData(
			`private/delete-user/${id}`,
			"delete"
		);
		deleteError
			? errFunc(setError, deleteError)
			: msgFunc(setMessage, "deleted");

		console.log(deletedData);

		const newUsers = users.filter(
			(user) => user.username !== deletedData.user.username
		);
		setUsers(newUsers);
	};

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					{responseError && (
						<span className="error-message">{responseError}</span>
					)}
					<div className="upper-div">
						{message && <h1>{message}</h1>}
						{error && <h1>{error}</h1>}
						<LinkedBtn
							link="/admin-panel/users/create"
							btnTxt="Add User"
							btnClass="btn-success add-btn"
						/>
					</div>
					<Table
						headers={[
							{ Username: "string" },
							{ Role: "string" },
							{ Email: "string" },
							{ "Profile Image": "image" },
						]}
						tableData={users}
						imgFolder={imgs}
						link="/admin-panel/users/update"
						func={deleteUserHandler}
					/>
				</div>
			)}
		</>
	);
}

export default ShowUsers;
