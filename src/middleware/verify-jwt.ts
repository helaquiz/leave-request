import { DAL } from '../data-accesss/DAL';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as exjwt from 'express-jwt';
import { Configuration } from '../config';



export async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        console.log(`user`, req.user.username)
        console.log(`Worker ${process.pid} : ${req.url}`)
        const result = await DAL.userDAL().VerifyToken(req.user);
        if (result) {
            next();
        } else {
            throw new Error();
        }
    } catch (e) {
        console.log(e);
        return res.status(403).json({
            code: 403,
            message: `Forbidden.`
        })
    }
}