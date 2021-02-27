import { model, Schema, Document } from 'mongoose';
import { IStudent } from './student.model';

export interface IAssignment extends Document {
    classCode: String;
    input: String;
    output: String;
    question: String;
    className: String;
    testCases: [{ input: String; output: String }];
    students: [IStudent];
}

const assignmentSchema: Schema = new Schema({
    classCode: String,
    className: String,
    question: String,
    input: String,
    output: String,
    testCases: [{ input: String, output: String }],
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
});

export default model<IAssignment>('assignment', assignmentSchema);
