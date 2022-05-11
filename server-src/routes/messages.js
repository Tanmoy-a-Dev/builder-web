// importing essentials
const router = require("express").Router();
const ErrorResponse = require("../utils/errResponse");
const { protect } = require("../middlewares/auth");
// importing required models
const { messages: Message } = require("../utils/database");

// add message
router.route("/").post(async (req, res, next) => {
	const newMessage = Message.build(req.body);

	try {
		const savedMessage = await newMessage.save();
		res.status(200).json({
			message: savedMessage,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

// get messages from a conversation
router.route("/:conversationId").get(async (req, res, next) => {
	const { conversationId } = req.params;
	try {
		const allMessages = await Message.findAll({
			where: {
				conversationId,
			},
		});
		res.status(200).json({ allMessages });
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

module.exports = router;
