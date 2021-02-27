import { Router } from 'express';
import {
    createAssignment,
    getAssignments,
} from '../controllers/assignment.controller';

const router = Router();

router.get('/:classCode/', getAssignments);
router.post('/', createAssignment);

export default router;
