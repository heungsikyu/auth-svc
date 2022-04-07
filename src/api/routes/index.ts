import { Router } from 'express';
import { authRouter } from './auth.router';

const router = Router();

/** ROUTE */
router.use("/xmd-auth", authRouter);

export default router;