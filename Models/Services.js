const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  name:{ type: String, required: [true,"Please Enter Service Name"] },
  from: { type: String, required: [true,"Please Enter origin Name"] },
  to: { type: String, required: [true,"Please Enter destination Name"] },
  time: { type: String, required: [true,"Please Enter start_time"]  },
  // arrival_time: { type: String, required: [true,"Please Enter Item arrival_time"]  },
  price: { type: Number, required: [true,"Please Enter price"] },
  busno: {type: String, required: [true,"Please Enter bus_num"]},
  routeno: {type: String, required: [true,"Please Enter bus_num"]},
  roottype: {type: String, required: [true,"Please Enter bus_num"]},
  noofbus: {type: String, required: [true,"Please Enter bus_num"]},
  status: {type: String, required: [true,"Please Enter bus_num"]},
  capacity: {type: String, required: [true,"Please Enter bus_num"]},
  contact_num: {type: Number, required: [true,"Please Enter contact_num"]},
  type: { type: String },
});

const BusTrip = mongoose.model('bustrip', servicesSchema);
module.exports = BusTrip;
