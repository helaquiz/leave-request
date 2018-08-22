import * as express from 'express';

import { TestController } from '../controllers/test.controller';

const router = express.Router();
const testCtrl = new TestController();

router.route('/').get(testCtrl.test);

export { router }