const User = require("../Models/user_model");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");

//register user
exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            newUser,
        },
    });
});

//Login user
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    //Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    // // If everything ok, send token to client
    createSendToken(user, 200, res);

});

//get current user
exports.currentUser = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: req.user,
    });
});

//logout user
exports.logout = catchAsync(async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
    });
});






/**Below functions are some common functions */

//created token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//crate new token and send it
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};



//protected routes
exports.protect = catchAsync(async (req, res, next) => {
    // Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("You are not logged in! Please log in to get access.", 401)
        );
    }

    //Verification token. This will return promise. So, i jsut used promisify inbuild method
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE AND SET USER AND GROUP ID GLOBALLY
    req.user = currentUser;
    console.log(currentUser)
    next();
});

//Give permission each protected route to access
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.account_type)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }

        next();
    };
};
