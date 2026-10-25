import express from 'express';

import { subscribeEmail, confirm, unsubscribe } from '../controller/newsletter.controller.js'

const router = express.Router();

router.post('/subscribe', subscribeEmail);
router.get('/confirm', confirm);
router.get('/unsubscribe', unsubscribe);

export default router;