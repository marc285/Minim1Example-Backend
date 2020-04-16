import { Router } from 'express';
import studentController from '../controllers/studentController'

const router: Router = Router();

router.get('/', studentController.getStudents);

router.post('/:studentname', studentController.getStudent); //The Body contains the Student ID
router.post('/new', studentController.addStudent);

export default router;