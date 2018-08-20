
// import * as crypto from 'crypto';
const crypto = require('crypto');

import { MysqlPoolConnector } from "../libs/mysql-connector";

class LeaveDAL {

  private static _leaveDALInstance: LeaveDAL
  private db: MysqlPoolConnector;
  private constructor(db: MysqlPoolConnector) {
    this.db = db
  }

  public static LeaveDALInstance(db: MysqlPoolConnector) {

    LeaveDAL._leaveDALInstance = LeaveDAL._leaveDALInstance || new LeaveDAL(db);
    return LeaveDAL._leaveDALInstance
  }

  leaveList(empId: Number) {
    return new Promise((resolve, reject) => {
      const sqlcmd = `SELECT
                ls.leave_status_id,ls.leave_status_name_th,ls.leave_status_name_en,ll.leave_description,
                  ll.leave_from,ll.leave_to,ll.create_datetime,ll.update_datetime,ll.attach_file,
                  app.emp_code 'approve_id',app.firstname_th 'approve_firstname_th',app.lastname_th 'approve_lastname_th',
                  app.firstname_en 'approve_lastname_en',app.lastname_en 'approve_lastname_en',agent.emp_code 'agent_id',
                  agent.firstname_th 'agent_firstname_th',agent.lastname_th 'agent_lastname_th',agent.firstname_en 'agent_firstname_en',
                  agent.lastname_en 'agent_lastname_en'
              FROM leave_logs ll 
              LEFT JOIN employee agent ON ll.agent_id = agent.emp_id
              LEFT JOIN employee app ON ll.approve_id = app.emp_id
              LEFT JOIN leave_status ls ON ll.leave_status_id = ls.leave_status_id
              LEFT JOIN project pj ON ll.project_id = pj.project_id
              WHERE ll.emp_id = ?`
      this.db.exec(sqlcmd, empId, (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        else if (result) {
          if (result.length > 0) {
            resolve(result);
          } else {
            resolve(false)
          }
        }

      });
    });
  }

  leaveRequest(params: any) {
    return new Promise((resolve, reject) => {
      const sqlcmd = `INSERT INTO leave_logs SET ?`
      this.db.exec(sqlcmd, params, (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        if (result.insertId) {
          return resolve(true);
        } else {
          return resolve(false)
        }
      });
    });
  }

  leaveListForApprove() {

  }

}

export { LeaveDAL } 