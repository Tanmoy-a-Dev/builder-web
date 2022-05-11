// importing required files
const ErrResponse = require("../utils/errResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const { users: User } = require("../utils/database");

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return next(new ErrResponse("Please enter credentials", 400));
	}

	try {
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return next(new ErrResponse("Invalid credentials", 401));
		}

		if (await user.validPassword(password)) {
			user.loggedIn = true;
			await user.save();
			sendToken(user, 200, res);
		} else {
			return next(new ErrResponse("Try again", 401));
		}
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

// exports.register = async (req, res, next) => {
// 	const { username, password } = req.body;
// 	if (!username || !password) {
// 		return next(new ErrResponse("Please enter credentials", 400));
// 	}

// 	try {
// 		const user = await User.create({username, password})

// 		if (user) {
// 			return next(new ErrResponse("Invalid credentials", 401));
// 		}

		
// 	} catch (err) {
// 		res.status(500).json({
// 			msg: err.message,
// 		});
// 	}
// };

exports.logout = async (req, res, next) => {
	const user = await User.findOne({ where: { id: req.user.id } });
	user.loggedIn = false;
	await user.save();
	try {
		res.clearCookie("access_token", { path: "/" }).json({
			success: true,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			next(new ErrResponse("Couldn't sent email!", 500));
		}
		const resetToken = user.getResetToken();

		await user.save();

		// creating link
		const resetUrl = `${process.env.FRONT_URL}/resetpassword/${resetToken}`;
		const message = `
            <h1>You requested for resetting your password</h1>
            <p>Please go to this link to reset your password</p>
            <a href= ${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
		try {
			sendEmail({
				to: user.email,
				subject: "Password Reset Link",
				text: message,
			});

			res.status(200).json({
				success: true,
				msg: "Email Sent!",
			});
		} catch (err) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse("Email couldn't be sent!", 500));
		}
	} catch (err) {
		next(err);
	}
};

exports.resetPassword = async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");

	try {
		let date = Date.now();
		const user = await User.findOne({
			where: {
				resetPasswordToken,
				resetPasswordExpire: {
					$gt: date,
				},
			},
		});

		if (!user) {
			return next(new ErrResponse("Invalid reset token", 400));
		}

		user.password = req.body.password;
		user.resetPasswordToken = null;
		user.resetPasswordExpire = null;
		await user.save();

		res.status(200).json({
			success: true,
			msg: "Reset password success!",
		});
	} catch (error) {
		next(error);
	}
};

// functions
const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res
		.status(statusCode)
		.cookie("access_token", token, {
			httpOnly: true,
			maxAge: 2 * 60 * 60 * 1000, // 2hours
			path: "/",
		})
		.json({
			success: true,
			user: true,
		});
};
