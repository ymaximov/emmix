const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 6000
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const doctorRoute = require('./routes/doctorsRoute')
const propertyManagementRoute = require('./routes/propertyMgRoute')
const superUser = require('./routes/superUserRoute')
app.use(express.json())

app.listen(port, ()=> console.log(`Node Server Listening on Port ${port}`))

app.use('/api/user', userRoute)
// app.use('/api/superuser', superUser)
app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/propertymg', propertyManagementRoute)