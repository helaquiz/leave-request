
import { UserDAL } from './user.dal'
import { MysqlPoolConnector } from '../libs/mysql-connector';
import { Configuration } from '../config';
import { LeaveDAL } from './leave.dal';

export class DAL {

  private db: MysqlPoolConnector;
  private static _DALInstance: DAL;

  private _userDAL: UserDAL;
  private _leaveDAL: LeaveDAL;

  private constructor() {
    this.db = new MysqlPoolConnector(Configuration.mysqlConfig);
    this._userDAL = UserDAL.UserDALInstance(this.db);
    this._leaveDAL = LeaveDAL.LeaveDALInstance(this.db);
  }

  static getDALInstance() {
    if (!DAL._DALInstance) {
      DAL._DALInstance = new DAL();
    } else {
    }
    return DAL._DALInstance
  }

  static userDAL() {
    return this._DALInstance._userDAL
  }

  static leaveDAL() {
    return this._DALInstance._leaveDAL
  }

}