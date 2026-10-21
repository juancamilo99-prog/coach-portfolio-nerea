import express  from 'express';
import { syncTiktokVideos } from '../controller/sync.controller.js';

const router = express.Router();

router.get('/', syncTiktokVideos);

export default router;