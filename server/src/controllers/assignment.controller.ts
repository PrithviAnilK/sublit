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
