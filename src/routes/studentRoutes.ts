import { Router } from 'express';
import studentController from '../controllers/studentController'

const router: Router = Router();

router.get('/', studentController.getStudents);
router.get('/:studentname', studentController.getStudent);

router.post('/new', studentController.addStudent);

export default router;