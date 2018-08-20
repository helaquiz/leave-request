import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';
const router = express.Router();


class ReportControllers {
    test(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            throw "Internal";
            
            // return res.json({ code: 1, message: `OK` });
        } catch (err) {
            // console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next)
            // return res.status(500).json({ code: 400, message: `NOT FOUND.` });
        }
    }

}

export { ReportControllers }