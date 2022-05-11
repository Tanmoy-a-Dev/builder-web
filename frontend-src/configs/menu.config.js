import {
  CogIcon,
  HomeIcon,
  UserCircleIcon,
  UserIcon
} from "@heroicons/react/outline";

export const sideMenu = [
	{
		label: "Dashboard",
		Icon: HomeIcon,
		to: "/admin-panel",
	},
	{
		label: "Profile",
		Icon: UserIcon,
		to: "/admin-panel/profile",
	},
	{
		label: "Roles",
		Icon: CogIcon,
		to: "/admin-panel/roles",
		children: [
			{
				label: "Create Role",
				Icon: UserCircleIcon,
				to: "create",
			},
			{
				label: "Show Roles",
				Icon: UserCircleIcon,
				to: "show",
			},
			// {
			//   label: 'Security',
			//   Icon: ShieldCheckIcon,
			//   to: 'security',
			//   children: [
			//     {
			//       label: 'Credentials',
			//       Icon: LockOpenIcon,
			//       to: 'credentials',
			//     },
			//     {
			//       label: '2-FA',
			//       Icon: DeviceMobileIcon,
			//       to: '2fa',
			//     },
			//   ],
			// },
		],
	},

	{
		label: "Tables",
		Icon: CogIcon,
		to: "/admin-panel/tables",
		children: [
			{
				label: "Create Table",
				Icon: UserCircleIcon,
				to: "create",
			},
			{
				label: "Show Tables",
				Icon: UserCircleIcon,
				to: "show",
			},
		],
	},

	{
		label: "Users",
		Icon: CogIcon,
		to: "/admin-panel/users",
		children: [
			{
				label: "Create User",
				Icon: UserCircleIcon,
				to: "create",
			},
			{
				label: "Show Users",
				Icon: UserCircleIcon,
				to: "show",
			},
		],
	},

	{
		label: "Builder",
		Icon: CogIcon,
		to: "/admin-panel/page-builder",
		children: [
			{
				label: "Pages",
				Icon: UserCircleIcon,
				to: "build-pages",
			},
		],
	},
];
