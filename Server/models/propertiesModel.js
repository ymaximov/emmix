const mongoose = require('mongoose');
const propertiesSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
    propertyName: {
        type: String,
        required: false
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    floor: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
},{
        timestamps: true
})

const propertiesModel = mongoose.model('properties', propertiesSchema);

module.exports = propertiesModel