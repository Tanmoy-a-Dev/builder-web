// importing required models
const { roles: Role, users: User } = require('../../utils/database');


exports.addRole = async (req, res, next) => {
    const { rolename, permissions } = req.body;
    try {
        const role = await Role.create({ rolename, permissions });
        res.status(200).json({
            success: true,
            role
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
};

exports.UpdateRole = async (req, res, next) => {
    try {
        const { rolename, permissions } = req.body;
        const role = await Role.findOne({ where: { id: req.params.id } });
        await role.update({ permissions });
        await User.update({ permissions }, { where: { role: rolename } });
        res.status(200).json({
            success: true,
            role
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } });
        await User.update({ permissions: [], role: null }, { where: { role: role.rolename } });

        await role.destroy();
        res.status(200).json({
            success: true,
            role: role.rolename
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.allRoles = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({
            success: true,
            roles,
            role: req.user.role,
            permissions: req.user.permissions
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.singleRole = async (req, res, next) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } });
        res.status(200).json({
            success: true,
            role
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

