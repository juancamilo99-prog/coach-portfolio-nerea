import express  from 'express';
import { getRoutetiktok } from "../controller/auth.controller.js";

const router = express.Router();

router.get('/', getRoutetiktok);

export default router;
