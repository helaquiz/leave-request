// export { router as testRoute } from './test.route';
// export { router as userRoute } from './user.route';
import * as express from "express";

// import sub-routers
import { router as testRoute } from "./test.route";
import { router as userRoute } from "./user.route";

let router = express.Router();
router.use('/test', testRoute);
router.use('/user', userRoute);

// Export the router
export = router;