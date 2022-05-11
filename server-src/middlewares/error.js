const ErrorResponse = require("../utils/errResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError') {
        const message = `Duplicate Field Value`;
        error = new ErrorResponse(message, 401)
    }
    if (error.name === 'SequelizeValidationError') {
        const message = Object.values(error.errors).map(item => item.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(500).json({
        success: false,
        msg: err.message
    });
}

module.exports = errorHandler;