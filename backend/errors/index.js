const CustomAPIError = require("./custom-api")
const BadRequestError = require("./bad-request")
const UnauthenticatedError = require("./unauthenticated")
const NotFoundAPIError = require("./not-found")

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundAPIError
}