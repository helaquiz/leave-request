import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';

class LeaveControlles {
    
    async leaveList(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next)
        }
    }

}

export { LeaveControlles }