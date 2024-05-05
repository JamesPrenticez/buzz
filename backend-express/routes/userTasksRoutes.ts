import express from 'express';
import * as userTasksControllers from "../controllers/userTasksControllers";
import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/user/tasks', validateJWT, userTasksControllers.getUserTasks);
router.post('/api/user/tasks', validateJWT, userTasksControllers.createUserTask);
router.patch('/api/user/tasks/:task_id', validateJWT, userTasksControllers.updateUserTask); 

export default router;