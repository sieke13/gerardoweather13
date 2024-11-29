import { Router } from 'express';
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';
import weatherRoutes from '../routes/api/weatherRoutes.js';
const router = Router();
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);
router.use('/weather', weatherRoutes);
export default router;
