import express  from 'express';
import { getRoutetiktok } from "../controller/auth.controller.js";
import { getTiktokCallback } from '../controller/callback.controller.js';

const router = express.Router();

router.get('/', getRoutetiktok);
router.get('/callback', getTiktokCallback);

export default router;
