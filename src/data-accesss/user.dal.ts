
// import * as crypto from 'crypto';
const crypto = require('crypto');

import { MysqlPoolConnector } from "../libs/mysql-connector";

class UserDAL {

  private static _userDALInstance: UserDAL
  private db: MysqlPoolConnector;
  private constructor(db: MysqlPoolConnector) {
    this.db = db
  }

  public static UserDALInstance(db: MysqlPoolConnector) {

    UserDAL._userDALInstance = UserDAL._userDALInstance || new UserDAL(db);
    return UserDAL._userDALInstance
  }

  Login(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const sqlcmd = `SELECT 
              emp.emp_code,emp.firstname_th,emp.lastname_th,emp.firstname_en,
              emp.lastname_en,emp.email,emp.mobile_no,emp.date_of_birth,emp.hired_datetime,
              emps.employee_status_id,emps.employee_status_name_th,emps.employee_status_name_en,
              role.role_id,role.role_name_th,role.role_name_en,
              dpmt.department_id,dpmt.department_name,
              user.username
          FROM
              user
                  LEFT JOIN employee emp ON user.emp_id = emp.emp_id
                  LEFT JOIN employee_status emps ON emp.employee_status_id = emps.employee_status_id
                  LEFT JOIN role ON emp.role_id = role.role_id
                  LEFT JOIN department dpmt ON emp.department_id = dpmt.department_id
          WHERE username = ? AND password = ?`
      this.db.exec(sqlcmd, [params.username, params.password], (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        console.log(result);
        if (result.length) {
          return resolve(result[0]);
        } else {
          return resolve(false)
        }
      })
    })
  }

  VerifyToken(params: any) {
    return new Promise((resolve, reject) => {
      const sqlcmd = `SELECT * FROM user WHERE username = ? AND access_token = ?`
      this.db.exec(sqlcmd, [params.username, params.access_token], (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        if (result.length === 1) {
          resolve(true);
        } else {
          resolve(false)
        }
      })
    });
  }

  UpdateAccessToken(username: string) {
    return new Promise((resolve, reject) => {
      const accessToken = crypto.randomBytes(15).toString('hex').substring(10, 25);
      const sqlcmd = `UPDATE user SET access_token = ? WHERE username = ?`
      this.db.exec(sqlcmd, [accessToken, username], (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        if (result.changedRows === 1) {
          resolve(accessToken);
        } else {
          resolve(false)
        }
      })


    })
  }

  getEmpIdFromEmpCode(empCode: string) {
    return new Promise((resolve, reject) => {
      const sqlcmd = `SELECT emp_id FROM employee WHERE emp_code = ?`
      this.db.exec(sqlcmd, empCode, (err, result) => {
        if (err) {
          let errmessage = err.message ? err.message : null;
          let errno = err.errno ? err.errno : null;
          console.log(`${errmessage} , Error number :${errno}`)
          return reject({ _isSuccess: false, code: errno, message: errmessage })
        }
        if (result.length === 1) {
          resolve(result[0].emp_id);
        } else {
          resolve(false)
        }
      })
    });
  }


}

export { UserDAL } 