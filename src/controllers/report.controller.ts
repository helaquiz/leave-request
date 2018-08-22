import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';
const router = express.Router();


class ReportController {
    test(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            throw "Internal";
            
            // return res.json({ code: 1, message: `OK` });
        } catch (err) {
            // console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next)
        }
    }

}

export { ReportController }