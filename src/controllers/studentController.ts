import { Request, Response } from 'express';
import Student from '../models/Student';

class StudentController {

    public async getStudents (req: Request, res: Response){
        //Returns the list of all the Students
        try{
            let students = await Student.find();
            res.status(200).json(students);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async getStudent (req:Request, res:Response){
        //Returns the details of a Student
        try{
            let {_id} = req.body;   //We need to send the _id of the student through the HTTP Body
            
            //let student = await Student.find({'name': req.params.studentname});
            
            let student = await Student.find({'_id': _id});
            if(!student){
                console.log(`\nStudent ${req.params.studentname} with id ${_id} not found`);
                res.status(404).json(`Student ${req.params.studentname} with id ${_id} not found`);
            }
            else
                res.status(200).json(student);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async addStudent (req:Request, res:Response){
        //Adds a new Student
        try{
            let {name, address, phones, studies} = req.body;
            let newStudent = new Student( {name,address,phones,studies} );
            await newStudent.save();    //Considering that Students can have the same name (no unique)
            console.log(`\nAdded Student:\n ${newStudent}`);
            res.status(201).json(newStudent); 
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`); 
        }
    }

}

const controller: StudentController = new StudentController();

export default controller;   //We export an instance of the Student Controller (Just as we did with the Student Router)