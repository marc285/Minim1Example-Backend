import { Request, Response } from 'express';
import Subject from '../models/Subject';
import Student from '../models/Student';

class SubjectController {

    public async getSubjects (req: Request, res: Response){
        //Returns the list of all the Subjects
        try{
            let subjects = await Subject.find();
            res.json(subjects).status(200);
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async getSubject (req: Request, res: Response){
        //Gets the details of a Subject
        try{
            let subject = await Subject.findOne( {'name': req.params.subjectname} );
            if(!subject){
                console.log(`Subject ${req.params.subjectname} not found`);
                res.json({"error": `Subject ${req.params.subjectname} not found`}).status(404);
            }
            else
                res.json(subject).status(200);
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async getStudents (req: Request, res: Response){
        //Returns the list of Students of a given Subject
        try{
            let checkSubject = await Subject.find( {'name': req.params.subjectname} );
            if(!checkSubject){
                console.log(`Subject ${req.params.subjectname} not found`);
                res.json({"error": `Subject ${req.params.subjectname} not found`}).status(404);
            }
            else{
                let studentsIDs = await Subject.find( {'name': req.params.subjectname}, 'students');
                //let students = await Student.findById(studentsIDs);
                
                let students = new Array();
                for (let stID of studentsIDs){
                    let match = await Student.findOne({'_id': stID}, 'name');
                    if(match)
                        students.push(match.toObject());
                }

                /* for (let stID of studentsIDs){
                    let match = await Student.findOne({'_id': stID});
                    if(match)
                        students.push(match.toObject());
                } */
                
                /* let students: Document[];
                let i: number = 0;

                for(let stID of studentsIDs){
                    let check = await Student.findOne({'_id': stID});
                    if(check)
                        students[i] = check;
                    
                    else
                        i++;
                } */

                res.json(students).status(200);
            }
            
            
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async getStudentInSubject(req: Request, res: Response){
        //Gets the details of a specific Student enrolled in a Subject
        try{
            let checkSubject = await Subject.find( {'name': req.params.subjectname} );
            if(!checkSubject){
                console.log(`Subject ${req.params.subjectname} not found`);
                res.json({"error": `Subject ${req.params.subjectname} not found`}).status(404);
            }
            else{
                let studentsInSubjectIDs = await Subject.find( {},'students' );
                let found: Boolean = false;
                for(let stID of studentsInSubjectIDs){
                    let match = Student.findOne( {'_id': stID} , {'name':req.params.studentname} );
                    if(match){
                        found = true;
                        res.json(match).status(200);
                    }
                }
                if(!found){
                    console.log(`Student ${req.params.studentname} not found in Subject ${req.params.subjectname}`);
                    res.json({"error": `Student ${req.params.studentname} not found in Subject ${req.params.subjectname}`}).status(404);
                }
            }
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async addSubject (req: Request, res: Response){
        //Add a new Subject
        try{
            //let {name,students} = req.body;
            let {name} = req.body;
            let checkSubject = await Subject.findOne( {'name': name} );
            if(!checkSubject){
                //let newSubject = new Subject({name,students});
                let newSubject = new Subject({name}); //We assume the Subject is going to be populated later with function addStudentToSubject
                await newSubject.save();
                console.log(`Added Subject: ${newSubject}`);
                res.status(201);

                /* let addedDocument = await newSubject.save();
                let addedSubject = addedDocument.toObject();
                if(addedSubject.name == name){
                    console.log(`Added Subject: ${name}`);
                    res.status(201);
                }
                else{
                    console.log("Error adding the Subject");
                    res.status(500);
                } */

            }
            else{
                console.log(`Subject already exists: ${checkSubject}`);
                res.json({"error": `Subject already exists: ${checkSubject}`}).status(409);
            }
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

    public async addStudentToSubject(req: Request, res: Response){
        try{
            let checkSubject = await Subject.findOne( {'name': req.params.subjectname} );
            let {name} = req.body; //We only need the Student's name but then he must be already inside the DB
            let checkStudent = await Student.findOne( {'name': name} );
            if(checkSubject && checkStudent){
                let studentID = await Student.findOne( {'name': name}, '_id' );
                await Subject.updateOne( {'name': req.params.subjectname}, {$addToSet:{'students':studentID}} );
                console.log(`Student ${name} has been added to Subject ${req.params.subjectname}`);
                res.status(201);
            }
            else if (!checkStudent){
                console.log(`Student ${name} not found`);
                res.json({"error": `Student ${name} not found`}).status(404);
            }
            else{
                console.log(`Subject ${req.params.subjectname} not found`);
                res.json({"error": `Subject ${req.params.subjectname} not found`}).status(404);
            }
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
    }

}

const controller: SubjectController = new SubjectController();

export default controller;   //We export an instance of the Subject Controller (Just as we did with the Subject Router)