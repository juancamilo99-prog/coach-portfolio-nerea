import express from 'express';

import { subscribeEmail, confirm } from '../controller/newsletter.controller.js'

const router = express.Router();

router.post('/subscribe', subscribeEmail);
router.get('/confirm', confirm);

export default router;