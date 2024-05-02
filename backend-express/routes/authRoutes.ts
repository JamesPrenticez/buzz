import express from 'express';
import * as authControllers from '@/controllers/authControllers'
const router = express.Router();

router.post('/api/register', authControllers.register);
router.post('/api/login', authControllers.login);

export default router;