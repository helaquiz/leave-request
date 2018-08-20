import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { DAL } from '../data-accesss/DAL';
import { Configuration } from '../config';
import * as dateHelper from '../libs/date-helper';
import { upload } from '../libs/file-upload';
import { ErrorHandle } from '../middleware/error-handle';


class UserControlles {

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let options: jwt.SignOptions = {
                expiresIn: 36000
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

    async leaveList(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const empId = await DAL.userDAL().getEmpIdFromEmpCode(req.user.emp_code);
            if (!empId) throw 'Internal';
            const leavelist = await DAL.leaveDAL().leaveList(Number(empId));
            return res.json({
                code: 1,
                message: `OK`,
                data: leavelist
            });
        } catch (err) {
            return ErrorHandle.ErrorInstance.InternalException(req, res, next)
        }
    }

    leaveRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            upload(req, res, async (err: Error) => {
                if (err) return res.json({ code: 501, message: err.message });
                // if (req.file) return res.json({ code: 500, message: "Image not found." })
                const empId = await DAL.userDAL().getEmpIdFromEmpCode(req.user.emp_code);
                const agentId = await DAL.userDAL().getEmpIdFromEmpCode(req.body.agent_code);
                if (!empId) return res.status(400).json({ code: 400, message: `Bad Request.` });
                const obj = {
                    attach_file: req.file ? String(req.file.path) : null,
                    // leave_status_id: 1, /// Set Default In Database
                    leave_reason_id: Number(req.body.leave_reason_id),
                    leave_description: req.body.leave_description.trim(),
                    leave_from: dateHelper.toUtcString(new Date(req.body.leave_from)),
                    leave_to: dateHelper.toUtcString(new Date(req.body.leave_to)),
                    create_datetime: dateHelper.getTodayUtc(),
                    update_datetime: dateHelper.getTodayUtc(),
                    emp_id: empId,
                    agent_id: agentId,
                    // agent_task: String(),
                }
                console.log(obj)
                let saveURL = await DAL.leaveDAL().leaveRequest(obj);
                // if (!saveURL) throw "Internal";
                return res.json({
                    code: 1,
                    message: `OK`,
                    obj: obj
                })
            })

            // return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }

    getUserDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }

    editUserDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            console.log(`Worker ${process.pid} : ${req.url}`)
            return res.json({ code: 1, message: `OK` });
        } catch (err) {
            return res.status(404).json({ code: 400, message: `NOT FOUND.` });
        }
    }



}

export { UserControlles }