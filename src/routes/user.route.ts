import * as express from 'express';

import { UserControlles } from '../controllers/user.controller';

const router = express.Router();
const userCtrl = new UserControlles();


// /user/:route
router.route('/login').post(userCtrl.login);
router.route('/logout').post(userCtrl.logout);

export { router }