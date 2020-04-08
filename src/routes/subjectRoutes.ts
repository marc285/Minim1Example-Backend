import { Router } from 'express';
import subjectController from '../controllers/subjectController'

const router: Router = Router();

router.get('/all', subjectController.getSubjects);
router.get('/:subjectname', subjectController.getSubject);
router.get('/:subjectname/students', subjectController.getStudents); //Not Workking
router.get('/:subjectname/students/:studentname', subjectController.getStudentInSubject); //Not Working

router.post('/new', subjectController.addSubject);
router.post('/:subjectname/addstudent', subjectController.addStudentToSubject);

export default router;