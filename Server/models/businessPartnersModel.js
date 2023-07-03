const mongoose = require('mongoose');
const businessPartnersSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
    bpCompanyName: {
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
    website: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    BPType: {
        type: String,
        enum: ['Realtor', 'Contractor', 'Lawyer', 'Vendor', 'Other'],
        default: 'Realtor',
        required: true
    },

},{
        timestamps: true
})

const businessPartnersModel = mongoose.model('businessPartners', businessPartnersSchema);

module.exports = businessPartnersModel