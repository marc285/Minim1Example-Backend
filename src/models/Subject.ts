import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const SubjectSchema: Schema = new Schema (
    {
        name: {type: String, required: true, unique: true}, //An unique name for each Subject
        students: { 
            type: [ {type: mongoose.Types.ObjectId, ref: 'Student', unique: true} ], //No repeated Students in this Subject's list
            required: true //At least one Student in the Subject
        }
    }
);

export default model('Subject', SubjectSchema);