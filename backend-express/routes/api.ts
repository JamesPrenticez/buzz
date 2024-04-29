import express from "express";

const router = express.Router();

import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import tasksRoutes from './tasksRoutes'

router.use(authRoutes);
router.use(userRoutes);
router.use(tasksRoutes);

export default router;
