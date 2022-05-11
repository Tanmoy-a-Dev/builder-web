const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DATABASE_NAME, // database name here
	process.env.DATABASE_USERNAME, // database username here
	process.env.DATABASE_PASSWORD, // database password here
	{
		dialect: "mysql",
		host: process.env.DATABASE_HOST, // database host name here
		logging: false,
		freezeTableName: true,
		operatorsAliases: {
			$and: Op.and,
			$or: Op.or,
			$eq: Op.eq,
			$gt: Op.gt,
			$lt: Op.lt,
			$lte: Op.lte,
			$like: Op.like,
		},
	}
);

sequelize
	.authenticate()
	.then(() => console.log("connected"))
	.catch((err) => console.log(err));
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models

db.users = require("./models/User")(sequelize, DataTypes);
db.roles = require("./models/Roles")(sequelize, DataTypes);
db.conversations = require("./models/Conversation")(sequelize, DataTypes);
db.messages = require("./models/Message")(sequelize, DataTypes);
db.custom_tables = require("./models/customTables")(sequelize, DataTypes);
db.pages = require("./models/Page.js")(sequelize, DataTypes);
module.exports = db;
