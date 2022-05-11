const { roles: Role, users: User, custom_tables: Tables } = require('../../utils/database');
const { mainRoutes } = require('../../config/mainRoutes');

exports.getDashboard = async (req, res, next) => {
    const roles = await Role.findAll();
    const users = await User.findAll();
    const tables = await Tables.findAll();

    try {
        res.status(200).json({
            roles: roles.length,
            users: users.length,
            tables: tables.length,
            routes: mainRoutes.length
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error while fetching data"
        })
    }
}