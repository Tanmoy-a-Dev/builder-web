// importing required files
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errResponse");

// importing model
const { users: User } = require("../utils/database");

exports.protect = async (req, res, next) => {

    let token = req.cookies.access_token;

    if (!token) {
        next(new ErrorResponse("Unauthorized access!!", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            next(new ErrorResponse("Bad Request", 401))
        }
        req.user = user;
        next();

    } catch (err) {
        next(new ErrorResponse("Error!!", 401));
    }

}