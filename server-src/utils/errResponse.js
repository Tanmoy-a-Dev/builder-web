
class ErrResponse extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode
    }
};

module.exports = ErrResponse;