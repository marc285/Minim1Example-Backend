import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const SubjectSchema: Schema = new Schema (
    {
        name: {type: String, required: true, unique: true}, //An unique name for each Subject
        students: { 
            type: [ {type: mongoose.Types.ObjectId, ref: 'Student'} ],
            //required: true //At least one Student in the Subject
        }
    }
);

export default model('Subject', SubjectSchema);