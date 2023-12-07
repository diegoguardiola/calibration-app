const { response, json } = require('express');
const express = require('express');
const app = express();

require('dotenv/config');
const cors = require('cors');
const corsOptions = {
    origin: 'https://calibration-app-client.vercel.app', // or use an array of origins
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));
const userRouter = require('./routes/user')
const calibrationRouter = require('./routes/calibration')
const equiupmentRouter = require('./routes/equipment')
const instrumentRouter = require('./routes/instrument')
const calRouter = require('./routes/cal')
const reportRouter = require('./routes/report')
const morgan = require('morgan');
const mongoose = require('mongoose');

  

//Middleware
app.use(express.json())
app.use(morgan('tiny'))             //displays local request

//routers
//calibrationRouter
app.use('/user', userRouter)
app.use('/calibration', calibrationRouter)
app.use('/equipment', equiupmentRouter)
app.use('/instrument', instrumentRouter)
app.use('/cal', calRouter)
app.use('/report', reportRouter)

mongoose.connect(process.env.PROFILE_CONNECTION)
.then(() => {
    console.log('data base connection successful')
})
.catch((err) => {
    console.log(err)
})
mongoose.set('strictQuery', false);

app.listen(5000, () => {
    console.log('server running');
})
