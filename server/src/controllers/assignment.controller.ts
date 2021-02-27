import { Request, Response } from 'express';
import Assignment, { IAssignment } from '../models/assignment.model';

export const getAssignment = async (req: Request, res: Response) => {
    const { classCode } = req.body;
    await Assignment.find(
        { classCode },
        (err: any, assignment: IAssignment) => {
            if (!err) {
                res.json({ assignment });
            } else {
                res.json({
                    err,
                });
            }
        }
    );
};

export default { getAssignment };
