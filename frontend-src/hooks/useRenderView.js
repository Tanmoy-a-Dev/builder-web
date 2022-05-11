// imports from node modules
import React, { useCallback } from "react";
import BuilderPages from "../views/builderViews/BuilderPages.jsx";
import NotFound from "../views/notFound/NotFound.jsx";
import Dashboard from "../views/panelViews/dashboard/Dashboard.jsx";
import Profile from "../views/panelViews/profile/Profile.jsx";
import AddRole from "../views/panelViews/Roles/AddRole.jsx";
import ShowRoles from "../views/panelViews/Roles/ShowRoles.jsx";
import UpdateRole from "../views/panelViews/Roles/UpdateRole.jsx";
import CreateTable from "../views/panelViews/Table/CreateTable.jsx";
import ShowTables from "../views/panelViews/Table/ShowTables.jsx";
import AddUser from "../views/panelViews/Users/AddUser.jsx";
import ShowUsers from "../views/panelViews/Users/ShowUsers.jsx";
import UpdatePassword from "../views/panelViews/Users/UpdatePassword.jsx";
import UpdateProfile from "../views/panelViews/Users/UpdateProfile.jsx";
import UpdateUser from "../views/panelViews/Users/UpdateUser.jsx";

function useRenderView(r) {
	const renderView = useCallback(
		(r) => {
			switch (r) {
				case "/admin-panel":
					return <Dashboard />;

				case "/admin-panel/profile":
					return <Profile />;

				case "/admin-panel/users/update-profile/:id":
					return <UpdateProfile />;

				case "/admin-panel/users/update-password/:id":
					return <UpdatePassword />;

				case "/admin-panel/page-builder/build-pages":
					return <BuilderPages />;

				// case "/admin-panel/page-builder/edit/:name":
				// 	return <MainBuilder />;

				case "/admin-panel/roles/create":
					return <AddRole />;

				case "/admin-panel/roles/show":
					return <ShowRoles />;

				case "/admin-panel/roles/update/:id":
					return <UpdateRole />;

				case "/admin-panel/tables/create":
					return <CreateTable />;

				case "/admin-panel/tables/show":
					return <ShowTables />;

				case "/admin-panel/users/create":
					return <AddUser />;

				case "/admin-panel/users/show":
					return <ShowUsers />;

				case "/admin-panel/users/update/:id":
					return <UpdateUser />;

				default:
					return <NotFound />;
			}
		},
		[r]
	);

	const component = renderView(r);
	// console.log(component)

	return component;
}

export default useRenderView;
