const catchAsync = require('../utilities/catchAsync');
const createSendToken = require('../utilities/authUtil');
const { findByEmailId } = require('../model/repo/userRepo');
const User = require('../model/userModel');
const AppError = require('../utilities/appError');
const UserSignup = require('./beenclasses/userSignUp');


const signup = catchAsync(async (req, res, next) => {
    const userExist = await findByEmailId(req.body.emailId);
    if (userExist) {
        return next(new AppError(`User Already Registered`, 409))
    }
    else {
        const userData = new UserSignup(req.body);
        const newUser = await User.create(userData);
        createSendToken(newUser, 201, req, res);
    }
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const userExist = await findByEmailId(email)

    if (!userExist) {
        return next(new AppError(`User Not Registered`, 404))
    }

    const userPasswordMatch = await userExist.correctPassword(password, userExist.password);
    if (!userPasswordMatch) {
        return next(new AppError(`Please Enter Correct Password`, 401));
    }

    createSendToken(userExist, 200, req, res)
})


const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};





module.exports = {
    signup,
    login,
    logout
}