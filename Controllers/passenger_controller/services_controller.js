const Services = require("../../Models/Services");
const catchAsync = require("../../Utils/catchAsync");
const sendEmail = require("../../Utils/email");
const Filter = require('../../Utils/Filters')

//get all services
exports.allServices = catchAsync(async (req, res, next) => {
    let Respond = new Filter(Services.find(), req.query).filter().sort().limitFields().paginate();
    const Servicess = await Respond.query;
    res.status(200).json({
        status: "success",
        data: {
            Servicess,
        },
    });
});
