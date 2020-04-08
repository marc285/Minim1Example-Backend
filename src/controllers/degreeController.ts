import { Request, Response } from 'express';
import Student from '../models/Student';

class DegreeController {

    public async getStudentsByDegree(req:Request, res:Response){
        try{
            let students = await Student.find({studies: req.params.degreename});
            if(!students){
                console.log("Not existing Degree or no Students enrolled");
                res.json({"error": "Not existing Degree or no Students enrolled"}).status(404);
            }
            else{
                console.log(`Students enrolled in ${req.params.degreename}: ${students}`);
                res.json(students).status(200);
            }
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }
}

const controller: DegreeController = new DegreeController();

export default controller;