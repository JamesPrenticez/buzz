import express from 'express';
import * as userControllers from "../controllers/userControllers";
import { validateJWT } from '../utils';

const router = express.Router();

// router.get('/api/user/details', validateJWT, userControllers.getUserDetails);

// router.get('/api/user/tasks', validateJWT, userController.getUserTasks);
// router.post('/api/user/tasks', validateJWT, userController.createUserTask);
// router.patch('/api/user/tasks/:taskId', validateJWT, userController.updateUserTask); 
router.get('/api/user/tasks', validateJWT, userControllers.getUserTasks);
router.post('/api/user/tasks', userControllers.createUserTask);
router.patch('/api/user/tasks/:taskId', userControllers.updateUserTask); 

export default router;