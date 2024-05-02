import express from 'express';
import * as userControllers from "../controllers/userTasksControllers";
import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/user/tasks', validateJWT, userControllers.getUserTasks);
router.post('/api/user/tasks', validateJWT, userControllers.createUserTask);
router.patch('/api/user/tasks/:task_id', validateJWT, userControllers.updateUserTask); 

export default router;