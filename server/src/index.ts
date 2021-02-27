import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
