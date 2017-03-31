import express from 'express';
import * as controller from './message.controller.js';

const router = express.Router();

router.get('/first', controller.message);

export default router;
