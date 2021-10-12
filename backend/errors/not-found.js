const CustomAPIError = require("./custom-api")
const { StatusCodes } = require("http-status-codes")

class NotFoundAPIError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundAPIError

