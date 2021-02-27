import { Router } from 'express';
import {
    addAssignmentDetails,
    createAssignment,
    getAssignments,
} from '../controllers/assignment.controller';

const router = Router();

router.get('/:classCode/', getAssignments);
router.post('/', createAssignment);
router.put('/:classCode/', addAssignmentDetails);

export default router;
