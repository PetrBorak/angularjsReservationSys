var mongoose = require('mongoose');
var customer  = require('../schemas/customers');

var customer = mongoose.model('customer', customer);
module.exports = customer;