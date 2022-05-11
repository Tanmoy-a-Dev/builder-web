module.exports = (sequelize, DataTypes) => {
    const CustomTable = sequelize.define('custom_table', {
        tablename: DataTypes.STRING,
        tableColumns: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('tableColumns'));
            },
            set(val) {
                return this.setDataValue('tableColumns', JSON.stringify(val));
            },
        },
    });

    return CustomTable;
};
