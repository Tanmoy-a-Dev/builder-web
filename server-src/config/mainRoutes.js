
const mainRoutes = [
    {
        slug: '/dashboard', 
        displayName: 'Dashboard',
        categoryName: 'Dashboard',
        method: 'get'
    },
    {
        slug: '/chatbox',
        displayName: 'ChatBox',
        categoryName: 'Chat Area',
        method: 'get'
    },
    {
        slug: '/add-role',
        displayName: 'Add Role',
        categoryName: 'Roles',
        method: 'post'
    },
    {
        slug: '/update-role/:id',
        displayName: 'Update Role',
        categoryName: 'Roles',
        method: 'put'
    },
    {
        slug: '/delete-role/:id',
        displayName: 'Delete Role',
        categoryName: 'Roles',
        method: 'delete'
    },
    {
        slug: '/show-roles',
        displayName: 'All Roles',
        categoryName: 'Roles',
        method: 'get'
    },
    {
        slug: '/add-user',
        displayName: 'Add User',
        categoryName: 'Users',
        method: 'post'
    },
    {
        slug: '/update-user/:id',
        displayName: 'Update User',
        categoryName: 'Users',
        method: 'put'
    },
    {
        slug: '/update-password/:id',
        displayName: 'Update Password',
        categoryName: 'Users',
        method: 'put'
    },
    {
        slug: '/delete-user/:id',
        displayName: 'Delete User',
        categoryName: 'Users',
        method: 'delete'
    },
    {
        slug: '/show-users',
        displayName: 'All Users',
        categoryName: 'Users',
        method: 'get'
    },
    {
        slug: '/profile',
        displayName: 'User Profile',
        categoryName: 'Users',
        method: 'put'
    },
    {
        slug: '/create-table',
        displayName: 'Create Table',
        categoryName: 'Tables',
        method: 'post'
    },
    {
        slug: '/drop-table/:id',
        displayName: 'Drop Table',
        categoryName: 'Tables',
        method: 'delete'
    },
    {
        slug: '/show-tables',
        displayName: 'Show Tables',
        categoryName: 'Tables',
        method: 'get'
    },


];

module.exports = { mainRoutes };