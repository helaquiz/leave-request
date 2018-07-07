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

  Login(obj: any) {
    return new Promise((resolve, reject) => {
      const sqlcmd = `SELECT * FROM user WHERE username = ?`
      this.db.exec(sqlcmd, obj.username, (err, result) => {
        if (result.length) {
          // console.log(result)
          resolve(result)
        }else {
          resolve(`no data`)
        }
      })
      // setTimeout(() => {
      //   console.log(`Login Process`, obj)
      //   resolve(true)
      // }, 1000);
    })
  }

}


// let DAL = UserDAL.UserDALInstance;
export { UserDAL } 