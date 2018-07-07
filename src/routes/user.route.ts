import * as express from 'express';

import { UserControlles } from '../controllers/user.controller';

const router = express.Router();
const userCtrl = new UserControlles();

router.route('/user/login').post(userCtrl.login);
router.route('/user/logout').post(userCtrl.logout);

export { router }