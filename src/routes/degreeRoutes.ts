import { Router } from 'express';
import degreeController from '../controllers/degreeController';

const router: Router = Router();

router.get('/', degreeController.getDegrees);
router.get('/:degreename/students/', degreeController.getStudentsByDegree);

export default router;