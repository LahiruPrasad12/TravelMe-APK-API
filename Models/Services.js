const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  name:{ type: String, required: [true,"Please Enter Service Name"] },
  origin: { type: String, required: [true,"Please Enter origin Name"] },
  destination: { type: String, required: [true,"Please Enter destination Name"] },
  start_time: { type: Date, required: [true,"Please Enter start_time"]  },
  arrival_time: { type: Date, required: [true,"Please Enter Item arrival_time"]  },
  price: { type: Number, required: [true,"Please Enter price"] },
  bus_num: {type: String, required: [true,"Please Enter bus_num"]},
  contact_num: {type: Number, required: [true,"Please Enter contact_num"]},
  type: {
    type: String,
    enum: ['AC', 'NON/AC'],
    default: 'NON/AC'
  },
});

const Service = mongoose.model('Services', servicesSchema);
module.exports = Service;
