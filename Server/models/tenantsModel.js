const mongoose = require('mongoose');
const tenantsSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
    socialSecurity: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    employerName: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married'],
        default: 'Single'
    },
}, {
    timestamps: true
});


const tenantsModel = mongoose.model('tenants', tenantsSchema);

module.exports = tenantsModel