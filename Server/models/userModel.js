const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    tenantId: {
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
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    passwordHint: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Super User', 'Professional User'],
        default: 'Super User'
    },
    isAdmin: {
        type: String,
        type: Boolean,
        default: false
    },

    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    }
},{
        timestamps: true
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel