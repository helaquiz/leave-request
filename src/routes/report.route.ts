import * as express from 'express';

import { verifyToken } from '../middleware/verify-jwt';
import { ReportController } from '../controllers/report.controller';

const router = express.Router();
const reportCtrl = new ReportController();


// /report/:route
// router.route('/login').post(userCtrl.login);
// router.route('/logout').post(userCtrl.logout);
// router.route('/leave').post(verifyToken, userCtrl.leaveRequest);
// router.route('/information').post(userCtrl.userDetail);

export { router }