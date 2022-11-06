const mongoose = require('mongoose');
const validator = require("validator");

const servicesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  cvv: { type: String, required: [true,"Please Enter cvv"] },
  accountName: { type: String, required: [true,"Please Enter account name"] },
  accountNumber: { type: String, required: [true,"Please Enter account number"]  },
  amount: { type: Number, required: [true,"Please Enter price"] },
  expDate: { type: Date, required: [true,"Please Enter date"] },
  account_type: {
    type: String,
    enum: ['local_passenger', 'foreign_passenger'],
    default: 'local_passenger'
  },
});

const MakePayment = mongoose.model('makePayment', servicesSchema);
module.exports = MakePayment;
