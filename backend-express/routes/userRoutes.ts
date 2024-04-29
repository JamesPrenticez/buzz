import express from 'express';
import * as userController from "../controllers/userControllers";
import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/user/details', validateJWT, userController.getUserDetails);
router.get('/api/user/tasks', validateJWT, userController.getUserTasks);

export default router;