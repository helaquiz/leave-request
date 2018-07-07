import * as express from 'express';
const router = express.Router();


class UserControlles {

    login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(req.body)
            
            console.log(`Worker ${process.pid} : ${req.url}`)
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }
    logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }
}

export { UserControlles }