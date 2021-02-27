import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import router from './router';
import http from 'http';
const request = require('request');

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

app.post('/code', (req, res) => {
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
        function (err: any, response: any, body: any) {
            res.send(body);
        }
    );
});

httpServer.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
