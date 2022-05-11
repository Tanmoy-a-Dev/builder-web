const router = require("express").Router();
const { mainRoutes } = require("../config/mainRoutes");

router.route("/").get(async (req, res, next) => {
	try {
		const filteredMainRoutes = mainRoutes.filter(
			(item) => item.method !== "delete"
		);
		console.log("a");
		res.status(200).json({
			filteredMainRoutes,
			mainRoutes,
		});
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
});

module.exports = router;
