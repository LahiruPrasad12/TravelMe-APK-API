//register user
const catchAsync = require("../../Utils/catchAsync");
const Payment = require("../../Models/paymentModel");
const AppError = require("../../Utils/AppError");

exports.makePayment = catchAsync(async (req, res, next) => {
  const newUser = await Payment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});



exports.makeUserPayment = catchAsync(async (req, res, next) => {
 const { cvv, account_number, account_name, expDate } = req.body;
 if(!cvv || !account_number || !account_name || !expDate){
   return next(new AppError("please provide valid details!", 400));
 }else if(cvv>999 || cvv<100){
   return next(new AppError("please provide valid cvv!", 400));
 }
 else {
    res.status(200).json({
      status: "success"
    });
 }
});
