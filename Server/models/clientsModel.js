const mongoose = require('mongoose');
const businessPartnersSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'company'
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
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: true
    },
    clientType: {
        type: String,
        enum: ['Buyer', 'Seller', 'Landlord', 'Renter'],
        default: 'Buyer'
    },

},{
        timestamps: true
})

const clientsModel = mongoose.model('clients', businessPartnersSchema);

module.exports = clientsModel