const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors/index")

// WE CAN HASH PASSWORD HERE OR...==>
// const register = async (req, res) => {
//     const {name, email, password} = req.body

//     const salt = await bcrypt.genSalt(10)  // random bytes for protecting our password, it is a very good practice..
//     const hashedPassword = await bcrypt.hash(password, salt)
//     const tempUser = {name, email, password: hashedPassword}
//     const user = await User.create({...tempUser})

//     res.status(StatusCodes.CREATED).json(user)

// }

// ==> .. PASSWORD CAN BE HASHED IN SCHEMA before saving USERSCHEMA (READ DOCUMENTATION)
const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}






const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password..")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}   

module.exports = {register, login}


