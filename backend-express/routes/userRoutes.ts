import express from 'express';
import * as userController from "../controllers/userControllers";
import * as habitsController from "../controllers/habitsControllers";
import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/user/details', validateJWT, userController.getUserDetails);

router.get('/api/users', userController.getAllUsers);
router.get('/api/habits', habitsController.getUserHabits);

export default router;