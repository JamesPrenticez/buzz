import express from 'express';
import * as tasksController from "../controllers/tasksControllers";
// import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/tasks/all', tasksController.getAllTasks);

export default router;