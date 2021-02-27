import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Assignment from '../models/assignment.model';
import Student, { IStudent } from '../models/student.model';

export const addStudent = async (req: Request, res: Response) => {
    const { name, srn, code, submitted, score, classCode } = req.body;

    const newStudent = new Student({
        _id: new Types.ObjectId(),
        name,
        srn,
        code,
        submitted,
        score,
        classCode,
    });

    newStudent.save({}, (err: any) => {
        if (err) {
            res.json({
                err,
                message: 'Could not save file to mongodb.',
            });
        } else {
            Assignment.findOneAndUpdate(
                { classCode },
                { $push: { students: newStudent } }
            )
                .populate('students')
                .exec((err: any, newStudent) => {
                    if (err) {
                        res.json({
                            err,
                            message: 'Could not get user from db after saving.',
                        });
                    } else {
                        res.json({
                            err,
                            student: newStudent,
                            message: 'Added student to class!',
                        });
                    }
                });
        }
    });
};
