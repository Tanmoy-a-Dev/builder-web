const { login, forgotPassword, resetPassword, logout } = require("../controllers/auth");
const { protect } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);

module.exports = router;