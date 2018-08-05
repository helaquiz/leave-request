import * as express from 'express';

import { UserControlles } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verify-jwt';

const router = express.Router();
const userCtrl = new UserControlles();


// /user/:route
router.route('/login').post(userCtrl.login);
router.route('/logout').post(userCtrl.logout);
router.route('/leave').post(verifyToken, userCtrl.leaveRequest);
router.route('/information').post(userCtrl.userDetail);

export { router }