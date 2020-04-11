import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const StudentSchema: Schema = new Schema (
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        phones: { 
            type: [ 
                {
                    name: {type: String}, 
                    number: {type: String}
                }
            ],
            required: true //At least a single phone provided
        },
        studies: { 
            type: [ {type: String} ],
            required: true //The Student is enrolled in at least one degree
        }
    }
);

export default model('Student', StudentSchema);