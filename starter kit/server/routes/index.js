import express from 'express';
import checking from './checking';
import authentication from './authentication';

const router = express.Router();

router.use('/checking', checking);
router.use('/auth', authentication);

export default router;
