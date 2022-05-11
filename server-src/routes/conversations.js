// importing essentials
const router = require("express").Router();
const ErrorResponse = require("../utils/errResponse");
const { protect } = require("../middlewares/auth");
// importing required models
const { conversations: Conversation } = require("../utils/database");

// create conversation
router.route("/").post(async (req, res, next) => {
	const { senderId, recieverId } = req.body;
	const conversations = [senderId, recieverId];

	const newConversation = Conversation.build({
		members: conversations,
	});
	try {
		const savedConversation = await newConversation.save();
		res.status(200).json({
			data: savedConversation,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

// get conversations of a user
router.route("/:userId").get(protect, async (req, res, next) => {
	console.log("h");
	const { userId } = req.params;
	const desiredConversations = [];

	try {
		const allConversations = await Conversation.findAll({
			attributes: ["members"],
		});
		allConversations.forEach((conversation) => {
			conversation.members.includes(userId) &&
				desiredConversations.push(conversation.members);
		});
		if (desiredConversations.length === 0)
			return next(
				new ErrorResponse("Sorry, No conversations for this user", 500)
			);
		res.status(200).json({ desiredConversations });
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

module.exports = router;
