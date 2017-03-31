import express from 'express';
import message from './message';

const router = express.Router();

router.use('/message', message);

export default router;
