

module.exports = (sequelize, DataTypes) => {
    const Page = sequelize.define("page", {
        pageName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Duplicate page name"
            },
        },
        pageSlug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Duplicate Slug name"
            },
        },
        datas: {
            type: DataTypes.TEXT('medium'),
            get: function () {
                return JSON.parse(this.getDataValue("datas"));
            },
            set: function (value) {
                return this.setDataValue("datas", JSON.stringify(value));
            }
        },
        htmlContent: {
            type: DataTypes.TEXT
        },
        cssContent: {
            type: DataTypes.TEXT
        }
    });

    return Page;
}