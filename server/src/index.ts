import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import router from './router';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Application = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(router);
app.use(cors());

io.on('connection', (socket: any) => {
    socket.on('yeye', (callback: any) => {
        console.log('yeye');
        callback();
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
