export const PANEL_ROUTES = [
	{
		slug: "/admin-panel",
		displayName: "Dashboard",
	},

	// profile panel
	{
		slug: "/admin-panel/profile",
		displayName: "Show profile page",
	},
	{
		slug: "/admin-panel/users/update-profile/:id",
		displayName: "Update User Profile",
	},
	{
		slug: "/admin-panel/users/update-password/:id",
		displayName: "Update User Password",
	},

	// builder panel
	{
		slug: "/admin-panel/page-builder/build-pages",
		displayName: "Build a website page",
	},
	// {
	// 	slug: "/admin-panel/page-builder/edit/:name",
	// 	displayName: "Edit a website page",
	// },

	// roles panel
	{
		slug: "/admin-panel/roles/create",
		displayName: "Create a role",
	},
	{
		slug: "/admin-panel/roles/show",
		displayName: "Show roles",
	},
	{
		slug: "/admin-panel/roles/update/:id",
		displayName: "Update a role",
	},
	{
		slug: "/admin-panel/roles/delete/:id",
		displayName: "Delete a role",
	},

	// Table panel
	{
		slug: "/admin-panel/tables/create",
		displayName: "Create a table",
	},
	{
		slug: "/admin-panel/tables/show",
		displayName: "Show tables",
	},

	// users panel
	{
		slug: "/admin-panel/users/create",
		displayName: "Create a user",
	},
	{
		slug: "/admin-panel/users/show",
		displayName: "Show users",
	},
	{
		slug: "/admin-panel/users/update/:id",
		displayName: "Update a user",
	},
	{
		slug: "/admin-panel/users/delete/:id",
		displayName: "Delete a user",
	},
];
