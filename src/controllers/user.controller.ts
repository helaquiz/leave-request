import * as express from 'express';
import * as jwt from 'jsonwebtoken';



import { DAL } from '../data-accesss/DAL';
import { Configuration } from '../config';
import * as dateHelper from '../libs/date-helper';
import { upload } from '../libs/file-upload';


class UserControlles {
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let options: jwt.SignOptions = {
                expiresIn: 3600
            }
            console.log(`Worker ${process.pid} : ${req.url}`)
            let result: Array<any> = await DAL.userDAL().Login(req.body);;
            if (result) {
                const accessToken = await DAL.userDAL().UpdateAccessToken(req.body.username);
                const payload = Object.assign({}, result, { access_token: accessToken }) // remove RowDataPacket
                const token = jwt.sign(payload, Configuration.secretKey, options)
                return res.json({
                    code: 1,
                    message: `OK`,
                    token: token
                });
            } else {
                return res.json({
                    code: 401,
                    message: `Unauthorized`
                });
            }
        } catch (err) {
            console.log(err);
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

    leaveRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
    
            upload(req, res, async (err: Error) => {
                if (err) return res.json({ code: 501, message: err.message })
                if (!req.file) return res.json({ code: 500, message: "Image not found." })
                // console.log(req.user);
                console.log(req.body);
                const obj = {
                    attach_file: String(req.file.path),
                    leave_reason_id: Number(req.body.leave_reason_id),
                    leave_description: req.body.leave_description.trim(),
                    create_datetime: dateHelper.getTodayUtc(),
                    update_datetime: dateHelper.getTodayUtc(),

                }
                let saveURL = await DAL.userDAL().LeaveRequest(obj);
                return res.json({
                    code: 1,
                    message: "Recieve image done.",
                })
            })

            // return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }


    userDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }

}

export { UserControlles }