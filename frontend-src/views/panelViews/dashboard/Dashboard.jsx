import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table.jsx";
import { LoggedinUserContext } from "../../../contexts/LoggedinUserContext.js";
import useGetData from "../../../hooks/useGetData";

function Dashboard() {
	const {
		dataResponse: usersData,
		responseError: usersError,
		isLoading: usersLoading,
	} = useGetData("private/show-users");

	const {
		dataResponse: dashboardData,
		responseError: dashboardErrors,
		isLoading: dashboardLoading,
	} = useGetData("private/get-dashboard-data");

	const loggedInUserData = useContext(LoggedinUserContext);
	// console.log(loggedInUserData);

	return (
		<>
			{dashboardLoading ? (
				<h1>Loading dashboard data</h1>
			) : (
				<div className="row">
					{dashboardErrors && <h1>{dashboardErrors}</h1>}

					<div className="col-lg-3 col-6">
						<div className="small-box bg-danger">
							<div className="inner">
								<h3>{dashboardData.users}</h3>
								<p>New Users</p>
							</div>
							<div className="icon">
								<svg
									width="50"
									height="50"
									fill="currentColor"
									className="bi bi-people"
									viewBox="0 0 16 16">
									<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
								</svg>
							</div>
							<Link to={"/admin-panel/users/show"} className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right"></i>
							</Link>
						</div>
					</div>

					<div className="col-lg-3 col-6">
						<div className="small-box bg-primary">
							<div className="inner">
								<h3>{dashboardData.roles}</h3>
								<p>New Roles</p>
							</div>
							<div className="icon">
								<svg
									width="50"
									height="50"
									fill="currentColor"
									className="bi bi-bar-chart-line"
									viewBox="0 0 16 16">
									<path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
								</svg>
							</div>
							<Link to={"/admin-panel/roles/show"} className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right"></i>
							</Link>
						</div>
					</div>

					<div className="col-lg-3 col-6">
						<div className="small-box bg-success">
							<div className="inner">
								<h3>{dashboardData.tables}</h3>
								<p>New Tables</p>
							</div>
							<div className="icon">
								<svg
									width="50"
									height="50"
									fill="currentColor"
									className="bi bi-align-top"
									viewBox="0 0 16 16">
									<rect
										width="4"
										height="12"
										rx="1"
										transform="matrix(1 0 0 -1 6 15)"
									/>
									<path d="M1.5 2a.5.5 0 0 1 0-1v1zm13-1a.5.5 0 0 1 0 1V1zm-13 0h13v1h-13V1z" />
								</svg>
							</div>
							<Link
								to={"/admin-panel/tables/show"}
								className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right"></i>
							</Link>
						</div>
					</div>

					<div className="col-lg-3 col-6">
						<div className="small-box bg-warning">
							<div className="inner">
								<h3>{dashboardData.routes}</h3>
								<p>Routes</p>
							</div>
							<div className="icon">
								<svg
									width="50"
									height="50"
									fill="currentColor"
									className="bi bi-bounding-box"
									viewBox="0 0 16 16">
									<path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z" />
								</svg>
							</div>
							<Link to={"/admin-panel/users/show"} className="small-box-footer">
								More info <i className="fas fa-arrow-circle-right"></i>
							</Link>
						</div>
					</div>
				</div>
			)}

			{usersLoading ? (
				<h1>Loading users data</h1>
			) : (
				<div className="card-body table-responsive p-0 mt-5">
					{usersError && <h1>{usersError}</h1>}
					<Table
						headers={[{ Username: "string" }, { Role: "string" }]}
						tableData={usersData.users}
						actionBtns={false}
					/>
				</div>
			)}
		</>
	);
}

export default Dashboard;
