import { model, Schema, Document } from 'mongoose';
import { IStudent } from './student.model';

export interface IAssignment extends Document {
    classCode: String;
    className: String;
    students: [IStudent];
}

const assignmentSchema: Schema = new Schema({
    classCode: String,
    className: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
});

export default model<IAssignment>('assignment', assignmentSchema);
