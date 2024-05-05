import express from 'express';
import * as userControllers from "../controllers/userControllers";
import { validateJWT } from '../utils';

const router = express.Router();

router.get('/api/user/details', validateJWT, userControllers.getUser);

export default router;