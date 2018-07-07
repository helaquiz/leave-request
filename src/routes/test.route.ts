import * as express from 'express';

import { TestControlles } from '../controllers/test.controller';

const router = express.Router();
const testCtrl = new TestControlles();

router.route('/test').get(testCtrl.test);

export { router }