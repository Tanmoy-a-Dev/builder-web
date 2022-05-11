module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define("message", {
		conversationId: {
			type: DataTypes.STRING,
		},
		sender: {
			type: DataTypes.STRING,
		},
		text: {
			type: DataTypes.TEXT,
		},
	});

	return Message;
};
