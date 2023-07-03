const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Company = require("../models/companyModel")
const authMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require('bcryptjs')

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
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

router.get("/get-all-users/:companyId", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({companyId: req.params.companyId});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching users", success: false, error });
    console.log(error);
  }
});

// router.post("/change-doctor-account-status", authMiddleware, async (req, res) => {
//   try {
//     const {doctorId, status, userId} = req.body;
//     const doctor = await Doctor.findByIdAndUpdate(doctorId, {
//       status,
//     });
//     const user = await User.findOne({_id: userId})
//     const unseenNotifications = user.unseenNotifications;
//     unseenNotifications.push({
//       type: 'new-doctor-request-changed',
//       message: `Your doctor account has been ${status}`,
//       onClickPath: '/notifications'
//     })
//     await User.findByIdAndUpdate(user._id, {unseenNotifications})
//     const doctors = await Doctor.find({})
//     res.status(200).send({
//       message: 'Doctor status updated successfully',
//       success: true,
//       data: doctor,
//     })
//     } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error fetching doctors", success: false, error });
//     console.log(error);
//   }
// });
router.post("/change-doctor-account-status", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });
    console.log(doctorId)
    console.log(doctor)

    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onclickPath: "/notifications",
    });
    user.isDoctor = status === 'approved' ? true : false
    await user.save()
    console.log(user,"saved")

    res.status(200).send({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Error updating doctor status", success: false });
  }
});

router.get('/company/:id', authMiddleware, async (req, res) => {
  try {
    const companies = await Company.findById(req.params.id); 
    res.status(200).json(companies)
   }
   catch(err) {
     res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err})
   }
})

router.get('/get-all-companies', authMiddleware, async (req, res) => {
  try {
   const companies = await Company.find(); 
   res.status(200).json(companies)
  }
  catch(err) {
    res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err})
  }
})

router.post('/create-company', async(req, res) => {
  try {
    console.log(req.body);
  const companyExist = await Company.findOne({companyName: req.body.companyName});
  if (companyExist){
      return res.status(200).send({message: 'Company already exists', success: false})
  }
  // console.log(req.body.securityCode);
  //   const securityCode = req.body.securityCode ;

    // const salt = await bcrypt.genSalt(10);
    // const hashedSecurityCode = await bcrypt.hash(securityCode, salt);

    // req.body.securityCode = hashedSecurityCode;

    const newCompany = new Company(req.body);
    const comp = await newCompany.save();
    console.log(119)
    console.log(comp);
    console.log(121)
    res.status(200).send({message: 'Company created successfully', success: true})

  } catch (error) {
    console.log(error);
      res.status(500).send({message: 'Error creating Company', success: false, error});// 
  }
})

router.get('/user-profile/:userId',authMiddleware, async(req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    res.status(200).json(user)
  }
  catch(err) {
    res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
  }
})
router.put('/update-company-profile/:companyId',authMiddleware, async(req, res) => {
  try {
    const companyId = req.params.companyId
    await Company.updateOne({_id: companyId}, req.body)
    res.status(201).json({message: "Company profile has been updated"})
  } catch (err) {
    res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
  }
})

router.put('/update-user-profile/:userId', authMiddleware, async(req, res) => {
  try {
    const user_id = req.params.userId
    await User.updateOne({_id: user_id}, req.body)
    res.status(201).json({message: "User profile has been updated"})
  } catch (err) {
    res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failure'})
  }
})

module.exports = router;
