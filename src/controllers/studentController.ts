import { Request, Response } from 'express';
import Student from '../models/Student';

class StudentController {

    public async getStudents (req: Request, res: Response){
        //Returns the list of all the Students
        try{
            let students = await Student.find();
            res.json(students).status(200);
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async getStudent (req:Request, res:Response){
        //Gets the details of a Student
        try{
            let student = await Student.find({'name': req.params.studentname});
            if(!student){
                console.log(`Student ${req.params.studentname} not found`);
                res.json({"error": `Student ${req.params.studentname} not found`}).status(404);
            }
            else
                res.json(student).status(200);
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async addStudent (req:Request, res:Response){
        //Add a new Student
        try{
            let {name, address, phones, studies} = req.body;

            //Considering that Students can have the same name (no unique)
            let newStudent = new Student( {name,address,phones,studies} );
            await newStudent.save();
            console.log(`Added Student: ${newStudent}`);
            res.status(201); 
        }
        catch(error){
            console.log(error);
            res.status(500); 
        }
    }

}

const controller: StudentController = new StudentController();

export default controller;   //We export an instance of the Student Controller (Just as we did with the Student Router)