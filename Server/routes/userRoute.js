const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const BusinessPartner = require('../models/businessPartnersModel')
const Client = require('../models/clientsModel')

router.post('/register', async(req, res) => {
    try {
    const userExist = await User.findOne({email: req.body.email});
    if (userExist){
        return res.status(403).send({message: 'User already exists', success: false})
    }
      const password = req.body.password ;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      req.body.password = hashedPassword;

      const newuser = new User(req.body);
      await newuser.save();
      
      res.status(200).send({message: 'User created successfully', success: true})

    } catch (error) {
        res.status(500).send({message: 'Error creating user', success: false, error});// 
    }
})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (!user){
            return res  
            .status(200)
            .send({message: 'User does not exist', success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res
            .status(200)
            .send({message: 'Password is incorrect', success: false})
        } else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            res.status(200).send({message: 'Login Successful', success: true, data:token})
        }
    } catch (error){
        console.log(error);
        res
        .status(500)
        .send({message: 'Error logging in', success: false, error})
    } 
})

router.post('/get-user-info-by-id', authMiddleware, async(req, res)=> {
    try {
        const user = await User.findOne({_id: req.body.userId}, {}, {populate: 'companyId'})
        user.password = undefined;
        if(!user){
            return res
            .status(200)
            .send({message: 'User does not exist', success: false});
        } else {
            res.status(200).send({message: 'User found', success: true, 
            data: user
        })
        }
    } catch (error) {
        res
        .status(500)
        .send({message: 'Error getting user info', success: false, error});
        console.log(error)

    }
})

router.post('/apply-doctor-account',  authMiddleware, async(req, res) => {
    try {
        const newdoctor = new Doctor({...req.body, status: 'pending'});
        
        await newdoctor.save();
        const adminUser = await User.findOne({isAdmin: true})
        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: 'new-doctor-request',
            message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + ' ' + newdoctor.lastName
            },
            onclickPath: '/admin/doctorslist'
        })
        await User.findByIdAndUpdate(adminUser._id, {unseenNotifications});
        res.status(200).send({
            success: true,
            message: 'Doctor account applied successfully'
        })
    } catch (error) {
        res.status(500).send({message: 'Error creating doctor account', success: false, error});
        console.log(error)

    }
})

router.post('/mark-all-notifications-as-seen',  authMiddleware, async(req, res) => {
    try {
       const user = await User.findOne({_id: req.body.userId});
       const unseenNotifications = user.unseenNotifications;
       const seenNotifications = user.seenNotifications
       seenNotifications.push(...unseenNotifications)
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications
        const updatedUser = await user.save()
        updatedUser.password = undefined;
    
        res.status(200).send({
            success: true,
            message: 'All notifications marked as seen',
            data: updatedUser,
        })
    } catch (error) {
        res.status(500).send({message: 'Error has occured', success: false, error});
        console.log(error)

    }
})

router.post('/delete-all-notifications',  authMiddleware, async(req, res) => {
    try {
       const user = await User.findOne({_id: req.body.userId});
       const unseenNotifications = user.unseenNotifications;
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Notifications have been deleted',
            data: updatedUser,
        })
    } catch (error) {
        res.status(500).send({message: 'Error deleting notifications', success: false, error});
        console.log(error)

    }
})

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
    try {
      const doctors = await Doctor.find({status: 'approved'});
      res.status(200).send({
        message: "Doctors fetched successfully",
        success: true,
        data: doctors,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500)
        .send({ message: "Error fetching doctors", success: false, error });
    }
  });

  router.post("/book-appointment", authMiddleware, async (req, res) => {
    try {
        req.body.status = 'pending'
        console.log(req.body,'90909--0-')
        const newAppointment = new Appointment(req.body)
        console.log(newAppointment,"apointment _+-=-=-=-")
        await newAppointment.save()

        const doctor = await User.findOne({_id: req.body.doctorInfo.userId})
        console.log(doctor,'doctor')
        doctor.unseenNotifications.push({
           type: 'new-appointment-request',
           message: `a new appointment has been made by ${req.body.userInfo.user.name}`,
           onClickPath: '/doctor/appointments'
        });
        await doctor.save()
        res.status(200).send({message:"completed"})
    } catch (error) {
      console.log(error);
  
      res
        .status(500)
        .send({ message: "Error updating doctor status", success: false,error });
    }
  });

  router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
    try {
      const appointments = await Appointment.find({userId: req.body.userId});
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500)
        .send({ message: "Error fetching appointments", success: false, error });
    }
  });

//   router.put('/update-user-profile/:userId', authMiddleware, async(req, res) => {
//     try {
//         const user_id = req.params.userId
//         await User.updateOne({_id: user._id}, req.body)
//         res.status(201).json({message: 'User profile has been updated'})
//     } catch (error) {
//         res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
//     }
// })

router.post('/create-business-partner', authMiddleware, async(req, res) => {
    try {
      console.log(req.body);
    // const companyExist = await Company.findOne({companyName: req.body.companyName});
    // if (companyExist){
    //     return res.status(200).send({message: 'Company already exists', success: false})
    // }

  
      const newBusinessPartner = new BusinessPartner(req.body);
      const comp = await newBusinessPartner.save();
      res.status(200).send({message: 'Business Partner created successfully', success: true})
        console.log(comp)
    } catch (error) {
      console.log(error);
        res.status(500).send({message: 'Error creating business partner', success: false, error});// 
    }
  })

  router.post('/create-client', authMiddleware, async(req, res) => {
    try {
      console.log(req.body);
    // const companyExist = await Company.findOne({companyName: req.body.companyName});
    // if (companyExist){
    //     return res.status(200).send({message: 'Company already exists', success: false})
    // }

  
      const newClient = new Client(req.body);
      const client = await newClient.save();
      res.status(200).send({message: 'Client created successfully', success: true})
        console.log(client)
    } catch (error) {
      console.log(error);
        res.status(500).send({message: 'Error creating client', success: false, error})
    }
  })

  router.get('/get-all-business-partners/:companyId', authMiddleware, async(req, res) => {
    try {
        const businessPartners = await BusinessPartner.find({companyId: req.params.companyId})
        res.status(200).json(businessPartners)
    } catch (error) {
        res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
    }
  })

  router.get('/get-all-clients/:companyId', authMiddleware, async(req, res) => {
    try {
        const clients = await Client.find({companyId: req.params.companyId})
        res.status(200).json(clients)
    } catch (error) {
        res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
    }
  })
  router.get('/bp-profile/:bpId',authMiddleware, async(req, res) => {
    try {
      const bpId = req.params.bpId
      const bp = await BusinessPartner.findById(bpId)
      res.status(200).send({
        message: "Business partner fetched successfully",
        success: true,
        data: bp,
      });
      // console.log(bp, bpId)
    }
    catch(err) {
      res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
    }
  })
  router.put('/update-bp-profile/:bpId',authMiddleware, async(req, res) => {
    try {
      const bpId = req.params.bpId
      await BusinessPartner.updateOne({_id: bpId}, req.body)
      res.status(201).json({message: "Business partner profile has been updated"})
    } catch (err) {
      res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
    }
  })


module.exports = router