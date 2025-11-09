import { Router } from 'express';
import testRoutes from './test';

const router = Router();

// Register all routes
router.use('/api', testRoutes);

export default router;
