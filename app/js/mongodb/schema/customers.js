var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  id: 0,
  firstName: String,
  lastName: String,
  date: Date,
  noc: 0,
  phoneNumber: 0,
  email: String,
  state: String,
},{
  collection: "customers"
  });

module.exports = customerSchema;