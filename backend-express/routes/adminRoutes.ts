import express from 'express';
import * as adminController from "../controllers/adminControllers";
import { validateJWT } from '../utils'; // TODO - add this after dev

const router = express.Router()

router.get('/api/users', adminController.getAllUsers);