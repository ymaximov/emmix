const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    taxId: {
        type: String,
        required: true
    },
    mainContact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state_province: {
        type: String,
        required: false
    },
    postal_code: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
},{
        timestamps: true
}
)

const companyModel = mongoose.model('company', companySchema);

module.exports = companyModel