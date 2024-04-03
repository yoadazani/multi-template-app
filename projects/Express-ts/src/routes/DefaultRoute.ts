import { Router } from 'express';
import { getServerStatus } from '../controllers/getServerStatus';

const router = Router();

router.route('/').get(getServerStatus);

export default router;
