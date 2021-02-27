import { model, Schema, Document } from 'mongoose';

export interface IStudent extends Document {
    name: String;
    srn: String;
    code: String;
    submitted: String;
    score: Number;
    classCode: String;
}

const studentSchema: Schema = new Schema({
    name: String,
    srn: String,
    code: String,
    submitted: String,
    score: Number,
    classCode: String,
});

export default model<IStudent>('student', studentSchema);
