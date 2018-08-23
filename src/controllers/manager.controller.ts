import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';
import { DAL } from '../data-accesss/DAL';
import { Pagination } from '../libs/basic-helper';

class ManagerController {
    /** Leave logs pending list (not approve) */
    async getPendingLeaveList(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const departmentId = Number(req.user.department_id);
            // const pagination = {
            //     page: req.query.page ? Number(req.query.page) : 1,
            //     limit: req.query.limit ? Number(req.query.limit) : 20
            // }
            /** TRY TO USE Promise.all() */
            const [data, count] = await Promise.all([
                await DAL.leaveDAL().leaveListForApprover(departmentId),
                await DAL.leaveDAL().CountleaveListForApprover(departmentId)]);

            return res.json({
                code: 1,
                message: `OK`,
                count,
                data
            });
        } catch (err) {
            console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next);
        }
    }

    /** Update leave logs for ...status (approve,decline) */
    async updateLeaveRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (Number(req.user.role_id) !== 3) {
                return res.status(403).json({ code: 403, message: `FORBIDDEN` });
            };
            const params = {
                departmentId: Number(req.user.department_id),
                roleId: Number(req.user.role_id),
                leaveId: Number(req.body.leave_id),
                approveId: Number(await DAL.userDAL().getEmpIdFromEmpCode(req.user.emp_code)),
                leaveStatusId: Number(req.body.leave_status_id)
            }
            let result: boolean = false;
            switch (params.leaveStatusId) {
                case 2: result =
                    await DAL.leaveDAL().approveLeave(params);
                    break;
                case 3: result =
                    await DAL.leaveDAL().declineLeave(params);
                    break;
                default: return res.status(400).json({ code: 400, message: `Bad Request.` });
            }
            if (!result) return res.status(400).json({ code: 400, message: `Bad Request.` });

            return res.json({ code: 1, message: `OK`, params });
        } catch (err) {
            console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next);
        }
    }

}

export { ManagerController }