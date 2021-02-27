import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import routers from './routers';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const mongoURL = process.env.PORT
    ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.msilm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/sparks';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { studentRouter, assignmentRouter } = routers;
app.use('/student/', studentRouter);
app.use('/assignment/', assignmentRouter);

app.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
