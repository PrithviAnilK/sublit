import { Request, Response } from 'express';
import Assignment, { IAssignment } from '../models/assignment.model';

export const getAssignments = async (req: Request, res: Response) => {
    const { classCode } = req.body;
    await Assignment.find(
        { classCode },
        (err: any, assignments: IAssignment) => {
            if (!err) {
                res.json({ assignments });
            } else {
                res.json({
                    err,
                });
            }
        }
    );
};

export const createAssignment = async (req: Request, res: Response) => {
    const { classCode, className, students } = req.body;
    const newAssignment = new Assignment({
        classCode,
        className,
        students,
        input: '',
        output: '',
        testCases: [],
    });

    newAssignment.save({}, (err: any, assignment: IAssignment) => {
        if (err) {
            res.json({
                err,
                message: 'Could not save file to mongodb.',
            });
        } else {
            res.json({
                err,
                assignment,
            });
        }
    });
};

export const addAssignmentDetails = async (req: Request, res: Response) => {
    const { classCode } = req.params;
    const { input, output, question, testCases } = req.body;

    Assignment.findOneAndUpdate(
        { classCode },
        {
            $set: {
                input,
                output,
                question,
                testCases,
            },
        }
    ).exec((err: any, assignment: any) => {
        if (err) {
            res.json({
                err,
                message: 'Could not save file to mongodb.',
            });
        } else {
            res.json({
                err,
                assignment,
            });
        }
    });
};
