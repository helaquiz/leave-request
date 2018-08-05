import { verifyToken } from '../middleware/verify-jwt';

import * as express from 'express';

// import sub-routers
import { router as testRoute } from "./test.route";
import { router as userRoute } from "./user.route";

let router = express.Router();
router.use('/test', testRoute);
router.use('/user', userRoute);

// Export the router
export = router;