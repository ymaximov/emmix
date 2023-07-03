const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middlewares/authMiddleware')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')

router.put('/update-user-profile/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
    } catch (error) {
        
    }
})