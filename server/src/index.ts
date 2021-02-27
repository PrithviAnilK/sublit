import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import routers from './routers';
import dotenv from 'dotenv';

const axios =require('axios')
const request = require('request')

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000

// const mongoURL = process.env.PORT
//     ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.msilm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
//     : 'mongodb://localhost:27017/sparks';

// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { studentRouter, assignmentRouter } = routers;
app.use('/student/', studentRouter);
app.use('/assignment/', assignmentRouter);

app.post('/code',(req,res)=>{
    const data = {
        ...req.body,
        clientId: 'ea736c0edffc53ecad54581e3a22e27b',
        clientSecret:
            '10f9b9f228599f46347319df937b48e11eeb11114a376f51234beda05c4e6cd6',
    };

      request(
        {
          url: 'https://api.jdoodle.com/v1/execute',
          method: 'POST',
          json: data,
        },
        function (error, response, body) {
          //   console.log('error:', error);
          //   console.log('statusCode:', response && response.statusCode);
          //   console.log('body:', body);
          res.send(body);
        }
      );
})

app.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
