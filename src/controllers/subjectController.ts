import { Request, Response } from 'express';
import Student from '../models/Student';
import Subject from '../models/Subject';

class SubjectController {

    public async getSubjects (req: Request, res: Response){
        //Returns the list of all the Subjects
        try{
            let subjects = await Subject.find();
            res.status(200).json(subjects);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async getSubject (req: Request, res: Response){
        //Returns the details of a Subject
        try{
            let subject = await Subject.findOne( {'name': req.params.subjectname} );    //We search by name (not by id) as Subjects are unique
            if(!subject){
                console.log(`\nSubject ${req.params.subjectname} not found`);
                res.status(404).json(`Subject ${req.params.subjectname} not found`);
            }
            else
                res.status(200).json(subject);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async getStudents (req: Request, res: Response){
        //Returns the Subject with the Students in it (insted of their IDs)
        try{
            let checkSubject = await Subject.find( {'name': req.params.subjectname} );  //We search by name (not by id) as Subjects are unique
            if(!checkSubject){
                console.log(`\nSubject ${req.params.subjectname} not found`);
                res.status(404).json(`Subject ${req.params.subjectname} not found`);
            }
            else{
                //let subj:Subject = new Subject();

                let populatedSubject = await Subject.findOne( {'name': req.params.subjectname} ).populate('students');

                //let students = await Subject.findOne( {'name': req.params.subjectname} , 'students' ).populate('students');

                console.log(`\n Students in ${req.params.subjectname}:\n ${populatedSubject}`);
                res.status(200).json(populatedSubject);

                //console.log(students+`\n`);
                //res.json(students).status(200);

            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    /* public async getStudentInSubject(req: Request, res: Response){
        //Gets the details of a specific Student enrolled in a Subject
        try{
            let checkSubject = await Subject.find( {'name': req.params.subjectname} );
            if(!checkSubject){
                console.log(`\nSubject ${req.params.subjectname} not found`);
                res.status(404).json({"error": `Subject ${req.params.subjectname} not found`});
            }
            else{
                let studentsInSubjectIDs = await Subject.find( {},'students' );
                let {_id} = req.body;   //Id of the student
                let found: Boolean = false;
                for(let stID of studentsInSubjectIDs){
                    // let match = Student.findOne( {'_id': stID} , {'name':req.params.studentname} ); //PASAR EL ID MEJOR
                    //if(match){
                    //    found = true;
                    //    res.status(200).json(match);
                    //}
                    let student = Student.findOne({'_id':_id});
                    if()
                }
                if(!found){
                    console.log(`\nStudent ${req.params.studentname} not found in Subject ${req.params.subjectname}`);
                    res.status(404).json({"error": `Student ${req.params.studentname} not found in Subject ${req.params.subjectname}`});
                }
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json({"error": `${error}`});
        }
    } */

    public async addSubject (req: Request, res: Response){
        //Adds a new Subject
        try{
            //let {name,students} = req.body;
            let {name} = req.body;
            let checkSubject = await Subject.findOne( {'name': name} );
            if(!checkSubject){
                //let newSubject = new Subject({name,students});
                let newSubject = new Subject( {name} ); //We assume the Subject is going to be populated later with function addStudentToSubject
                await newSubject.save();
                console.log(`\nAdded Subject:\n ${newSubject}`);
                res.status(201).json(newSubject);
            }
            else{
                console.log(`\nSubject already exists:\n ${checkSubject}`);
                res.status(409).json(`Subject already exists: ${checkSubject}`);
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json( `${error}`);
        }
    }

    public async addStudentToSubject(req: Request, res: Response){
        //Adds the given Student to the given Subject
        try{
            let checkSubject = await Subject.findOne( {'name': req.params.subjectname} );
            let {_id} = req.body; // id of the Student
            //let checkStudent = await Student.findOne( {'name': name} );
            let checkStudent = await Student.findOne( {'_id': _id}, 'name' );
            if(checkSubject && checkStudent){
                //let studentID = await Student.findOne( {'name': name}, '_id' );
                await Subject.updateOne( {'name': req.params.subjectname}, {$addToSet:{'students':_id}} ).then((data) => {
                    if(data.nModified == 1){
                        console.log(`\nStudent ${checkStudent} has been added to Subject ${req.params.subjectname}`);
                        res.status(201).json(`Student ${checkStudent} has been added to Subject ${req.params.subjectname}`);
                    }
                    else{
                        console.log(`\nStudent ${checkStudent} is already enrolled in Subject ${req.params.subjectname}`);
                        res.status(409).json(`Student ${checkStudent} is already enrolled in Subject ${req.params.subjectname}`);
                    }
                });
            }
            else if (!checkStudent){
                console.log(`\nStudent not found`);
                res.status(404).json(`Student not found`);
            }
            else{
                console.log(`\nSubject ${req.params.subjectname} not found`);
                res.status(404).json(`Subject ${req.params.subjectname} not found`);
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

}

const controller: SubjectController = new SubjectController();

export default controller;   //We export an instance of the Subject Controller (Just as we did with the Subject Router)