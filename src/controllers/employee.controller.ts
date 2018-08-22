import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';

class EmployeeController {

  getEmployeeList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log(`Worker ${process.pid} : ${req.url}`)
      // throw "Internal";

      return res.json({ code: 1, message: `OK` });
    } catch (err) {
      // console.log(err)
      return ErrorHandle.ErrorInstance.InternalException(req, res, next)
      
    }
  }

  getEmployeeStatus() {
    
  }

}

export { EmployeeController }