const { response, json } = require('express');
const express = require('express');
const app = express();

require('dotenv/config');

const userRouter = require('./routes/user')
const calibrationRouter = require('./routes/calibration')
const equiupmentRouter = require('./routes/equipment')
const instrumentRouter = require('./routes/instrument')
const calRouter = require('./routes/cal')
const reportRouter = require('./routes/report')
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
const corsOptions = {
    origin: 'http://calibrationwebsite.s3-website.us-east-2.amazonaws.com',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//Middleware
app.use(express.json())
app.use(morgan('tiny'))             //displays local request

//routers
//calibrationRouter
app.use('user', userRouter)
app.use('calibration', calibrationRouter)
app.use('equipment', equiupmentRouter)
app.use('instrument', instrumentRouter)
app.use('cal', calRouter)
app.use('report', reportRouter)

console.log('MongoDB URI:', process.env.PROFILE_CONNECTION);
mongoose.connect(process.env.PROFILE_CONNECTION)
.then(() => {
    console.log('data base connection successful')
})
.catch((err) => {
    console.log(err)
})
mongoose.set('strictQuery', false);

app.listen(5000, () => {
    console.log(api);
    console.log('server running');
})
