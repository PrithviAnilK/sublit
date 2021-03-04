import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import http from 'http';
import {
    addAssignment,
    addStudent,
    getAssignment,
    IAssignment,
    IStudent,
    submitStudent,
} from './Assignment';
import codeRouter from './routers/code';
import testRouter from './routers/test';

dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.PORT
    ? process.env.CLIENT_URL
    : 'http://localhost:3000';

const app: Application = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: CLIENT_URL,
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/code', codeRouter);
app.use('/test', testRouter);

io.on('connection', (socket: any) => {
    socket.on('join', (data: { classCode: string; user: string }) => {
        socket.join(data.classCode);
        console.log('user joined class', data.classCode);
    });

    socket.on('addAssignment', (assignment: IAssignment, callback: any) => {
        addAssignment(assignment);
        callback();
    });

    socket.on('addStudent', (student: IStudent, callback: any) => {
        socket.join(student.classCode);
        addStudent(student);
        const Assignment = getAssignment(student.classCode);
        socket.broadcast
            .to(student.classCode)
            .emit('updateSubmissions', Assignment?.students);
        callback({ ...Assignment, students: undefined });
    });

    socket.on('submit', (student: IStudent, callback: any) => {
        const students = submitStudent(student);
        socket.broadcast.to(student.classCode).emit('onSubmit', students);
        callback();
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server Started on [dev: http://localhost:${PORT}] !`);
});
