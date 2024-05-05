import express from "express";

const router = express.Router();

import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import userRoutes from './userRoutes'
import userTasksRoutes from './userTasksRoutes'
import tasksRoutes from './tasksRoutes'

router.use(authRoutes);
router.use(adminRoutes);
router.use(userRoutes);
router.use(userTasksRoutes);
router.use(tasksRoutes);

export default router;
