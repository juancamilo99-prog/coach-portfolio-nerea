import express from 'express';

import { subscribeEmail } from '../controller/newsletter.controller.js';

const router = express.Router();

router.post('/subscribe', subscribeEmail);

export default router;