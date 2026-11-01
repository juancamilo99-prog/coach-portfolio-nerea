import express from 'express';

import { subscribeEmail, confirm, unsubscribe, sendNewsletter } from '../controller/newsletter.controller.js'

const router = express.Router();

router.post('/subscribe', subscribeEmail);
router.get('/confirm', confirm);
router.get('/unsubscribe', unsubscribe);
router.post('/send', sendNewsletter);

export default router;