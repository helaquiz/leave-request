import { verifyToken } from '../middleware/verify-jwt';

import * as express from 'express';

// import sub-routers
import { router as testRoute } from "./test.route";
import { router as userRoute } from "./user.route";
import { router as managerRouter } from "./manager.route";
import { router as reportRoute } from "./report.route";

let router = express.Router();
router.use('/test', testRoute);
router.use('/user', userRoute);
router.use('/manager', managerRouter);
router.use('/report', reportRoute);


// Export the router
export = router;