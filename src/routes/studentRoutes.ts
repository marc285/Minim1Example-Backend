import { Router } from 'express';
import studentController from '../controllers/studentController'

const router: Router = Router();

router.get('/all', studentController.getStudents);
router.get('/:studentname', studentController.getStudent);

router.post('/new', studentController.addStudent);



//TEST
/* router.get('/name', (req: Request, res: Response) => {
    res.send("Marc");
});

router.get('/phones', (req: Request, res: Response) => {
    res.send(
        {
        "phone": 8888,
        "phone2": 9999
    });
});

router.get('/degree', (req: Request, res: Response) => {
    res.send({
        "degree name": "Network Engineering",
        "year": "3B",
        "subjects": ["PX", "IOT", "SX", "EA", "XT"]
    });
}); */

export default router;