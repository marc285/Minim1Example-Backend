import { Request, Response } from 'express';
import Student from '../models/Student';

class DegreeController {

    public async getDegrees(req:Request, res:Response){
        //Returns the list of all the degrees
        try{
            let degrees = await Student.find({}, 'studies' );
            console.log(`\nAll degrees:\n${degrees}`);
            res.status(200).json(degrees);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json({"error": `${error}`});
        }
    }

    public async getStudentsByDegree(req:Request, res:Response){
        //Returns the Students enrolled in the specifid Degree ('studies')
        try{
            let students = await Student.find( {studies: req.params.degreename} );
            if(!students){
                console.log("\nNot existing Degree or no Students enrolled");
                res.status(404).json({"error": "Not existing Degree or no Students enrolled"});
            }
            else{
                console.log(`\nStudents enrolled in ${req.params.degreename}:\n ${students}`);
                res.status(200).json(students);
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json({"error": `${error}`});
        }
    }
}

const controller: DegreeController = new DegreeController();

export default controller;