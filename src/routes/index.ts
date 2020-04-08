import { Router } from 'express';
import studentRouter from './studentRoutes';
import subjectRouter from './subjectRoutes';
import degreeRouter from './degreeRoutes';

const router: Router = Router();

router.use('/students', studentRouter);
router.use('/subjects', subjectRouter);
router.use('/degrees', degreeRouter)

export default router;