var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: String,
    status: String,
    contactName: String,
    website: String,
    phone: String,
    email: String,
    address: String,
    notes: String
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;