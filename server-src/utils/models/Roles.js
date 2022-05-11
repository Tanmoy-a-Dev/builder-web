

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        rolename: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Duplicate Rolename"
            },
        },
        permissions: {
            type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue('permissions'));
            },
            set: function (val) {
                return this.setDataValue('permissions', JSON.stringify(val));
            }
        }
    });

    return Role;
}