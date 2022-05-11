// importing required files
const { cloudinary } = require("../../utils/cloudinary");
const ErrorResponse = require("../../utils/errResponse");
const fs = require("fs");

// importing model
const { users: User, roles: Role } = require("../../utils/database");

// add user
exports.addUser = async (req, res, next) => {
	let newUser;
	// console.log(req.body)
	try {
		const { role, profileImage } = req.body;
		// console.log(role);
		const rolename = await Role.findOne({ where: { rolename: role } });
		const permissions = rolename.permissions;

		const cloudinaryUpload = await cloudinary.v2.uploader.upload(profileImage, {
			folder: "spa-builder",
		});

		newUser = User.build({
			...req.body,
			profileImage: cloudinaryUpload.secure_url,
			cloudinaryId: cloudinaryUpload.public_id,
			permissions,
		});
		// if (req.file) {
		// 	newUser = User.build({
		// 		...req.body,
		// 		profileImage: req.file.filename,
		// 		permissions,
		// 	});
		// } else {
		// 	newUser = User.build({
		// 		...req.body,
		// 		profileImage: "null",
		// 		permissions,
		// 	});
		// }
		await newUser.save();

		res.status(200).json({
			success: true,
			user: newUser,
			cloudinaryUpload,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			success: false,
			msg: err.message,
		});
	}
};

// update user profile
exports.updateProfile = async (req, res, next) => {
	let newUser;
	try {
		const { profileImage } = req.body;
		const user = await User.findOne({ where: { id: req.params.id } });

		if (profileImage) {
			const cloudinaryUpload = await cloudinary.v2.uploader.upload(
				profileImage,
				{ folder: "spa-builder" }
			);
			if (user.profileImage) {
				await cloudinary.uploader.destroy(user.cloudinaryId);
			}
			newUser = {
				...req.body,
				profileImage: cloudinaryUpload.secure_url,
				cloudinaryId: cloudinaryUpload.public_id
			};
		} else {
			newUser = {
				...req.body,
				profileImage: user.profileImage
			};
		}
		await user.update(newUser);

		res.status(200).json({
			success: true,
			newUser,
		});
	} catch (err) {
		next(new ErrorResponse(err.message, 500));
	}
};
// update user by id
exports.updateUser = async (req, res, next) => {
	let newUser;
	
	try {
		const { role, profileImage } = req.body;
		const user = await User.findOne({ where: { id: req.params.id } });

		const rolename = await Role.findOne({ where: { rolename: role } });
		const permissions = rolename.permissions;

		if (profileImage) {
			const cloudinaryUpload = await cloudinary.v2.uploader.upload(
				profileImage,
				{ folder: "spa-builder" }
			);
			if (user.profileImage) {
				await cloudinary.uploader.destroy(user.cloudinaryId);
			}
			newUser = {
				...req.body,
				profileImage: cloudinaryUpload.secure_url,
				cloudinaryId: cloudinaryUpload.public_id,
				permissions,
			};
		} else {
			newUser = {
				...req.body,
				profileImage: user.profileImage,
				permissions
			};
		}
		
		await user.update(newUser);

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(new ErrorResponse(err.message, 500));
	}
};

// delete user by id
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		if (user.profileImage) await cloudinary.uploader.destroy(user.cloudinaryId);

		await User.destroy({ where: { id: req.params.id } });
		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
};
// get a user by id
exports.singleUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
};

// get all user
exports.allUsers = async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.status(200).json({
			success: true,
			users,
			role: req.user.role,
			permissions: req.user.permissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
};

// update password
exports.updatePassword = async (req, res, next) => {
	if (req.user.id != req.params.id) {
		next(new ErrorResponse("You are not authorized", 401));
	}
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		user.password = req.body.password;
		await user.save();
		res.status(200).json({
			success: true,
			msg: "Password Changed",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
};
