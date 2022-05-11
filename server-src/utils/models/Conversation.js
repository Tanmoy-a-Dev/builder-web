module.exports = (sequelize, DataTypes) => {
	const Conversation = sequelize.define("conversation", {
		members: {
			type: DataTypes.TEXT,
			get: function () {
				return JSON.parse(this.getDataValue("members"));
			},
			set: function (val) {
				return this.setDataValue("members", JSON.stringify(val));
			},
		},
	});

	return Conversation;
};
