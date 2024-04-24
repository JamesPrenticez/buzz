import express from "express";

const router = express.Router();

import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import testRoutes from './testRoutes'

router.use(authRoutes);
router.use(userRoutes);
router.use(testRoutes);

export default router;
