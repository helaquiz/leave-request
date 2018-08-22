import * as express from 'express';

import { ManagerController } from '../controllers/manager.controller';
import { verifyToken } from '../middleware/verify-jwt';

const router = express.Router();
const managerCtrl = new ManagerController();

router.route('/leave').get(verifyToken, managerCtrl.getPendingLeaveList).post(verifyToken, managerCtrl.approvePendingLeave);

export { router }