import express from 'express';
import * as controller from './checking.controller.js';

const router = express.Router();

router.get('/', controller.checking);

export default router;
