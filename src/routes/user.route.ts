import * as express from 'express';

import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verify-jwt';

const router = express.Router();
const userCtrl = new UserController();


// /user/:route
router.route('/login')
  .post(userCtrl.login);
router.route('/logout')
  .post(userCtrl.logout);
router.route('/leave')
  .get(verifyToken, userCtrl.leaveList)
  .post(verifyToken, userCtrl.leaveRequest);
router.route('/information')
  .get(userCtrl.getUserDetail)
  .put(verifyToken, userCtrl.editUserDetail);

export { router }