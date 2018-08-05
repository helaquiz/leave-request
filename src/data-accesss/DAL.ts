
import { UserDAL } from './user.dal'
import { MysqlPoolConnector } from '../libs/mysql-connector';
import { Configuration } from '../config';

export class DAL {

  private db: MysqlPoolConnector;
  private static _DALInstance: DAL;

  private _userDAL: UserDAL

  private constructor() {
    this.db = new MysqlPoolConnector(Configuration.mysqlConfig);
    this._userDAL = UserDAL.UserDALInstance(this.db);
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

}