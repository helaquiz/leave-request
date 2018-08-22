import * as express from 'express';
import { ErrorHandle } from '../middleware/error-handle';
import { DAL } from '../data-accesss/DAL';

class ManagerController {

    /** Leave logs pending list(not approve) */
    async getPendingLeaveList(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const departmentId = Number(req.user.department_id);
            const data = await DAL.leaveDAL().leaveListForApprover(departmentId);
            return res.json({ code: 1, message: `OK`, data: data });
        } catch (err) {
            console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next);
        }
    }

    async approvePendingLeave(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (Number(req.user.role_id) !== 3) {
                return res.status(403).json({ code: 403, message: `FORBIDDEN` });
            };
            const params = {
                departmentId: Number(req.user.department_id),
                roleId: Number(req.user.role_id),
                leaveId: Number(req.body.leave_id),
                approveId: Number(await DAL.userDAL().getEmpIdFromEmpCode(req.user.emp_code))
            }
            const result = await DAL.leaveDAL().approveLeave(params);
            if (!result) return res.status(400).json({ code: 400, message: `Bad Request.` });
            return res.json({ code: 1, message: `OK`, params });
        } catch (err) {
            console.log(err)
            return ErrorHandle.ErrorInstance.InternalException(req, res, next);
        }
    }

}

export { ManagerController }