import { Router } from 'express';
import { addStudent } from '../controllers/student.controller';

const router = Router();

router.post('/:classCode/', addStudent);

export default router;
