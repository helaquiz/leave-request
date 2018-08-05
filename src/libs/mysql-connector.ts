// MySQL Connector here manages connection as 'Pool'

import * as mysql from "mysql";
import { IMysqlConfig, IMysqlPool } from "../interfaces/mysql-interface";



class MysqlPoolConnector implements IMysqlPool {
    pool: mysql.Pool;
    constructor(private config: IMysqlConfig) {
        this.pool = mysql.createPool({
            host: this.config.host,
            port: this.config.port,
            user: this.config.user,
            password: this.config.password,
            database: this.config.db,
            acquireTimeout: this.config.acquireTimeout,
            waitForConnections: this.config.waitForConnections,
            connectionLimit: this.config.connectionLimit,
            queueLimit: this.config.queueLimit
        });

        this.exec(`SELECT now() as time`, null, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Connect MySQL at : ${result[0].time}`);
            }
        })
    }

    getPool(): mysql.Pool {
        return this.pool;
    }
    /**
     * Execute query command with safty releasing the connection
     */
    exec(query: string, data: any, callback: (err: any, res?: any) => void): void {
        this.getPool().getConnection((err, connection) => {
            if (err) {
                if (connection) connection.release();
                return callback(err);
            }
            connection.query(query, data, (err, res) => {
                const lastCheckIn = process.uptime();
                connection.release();
                const finishTime = process.uptime();
                if ((finishTime - lastCheckIn) > 3) {
                    console.log('==================================================')
                    console.log(`Query finished in ${finishTime - lastCheckIn} s.`)
                }
                if (err) {
                    if (data) {
                        console.log(`And your ? are replace with ...`);
                        console.log(data);
                    }
                }
                return callback(err, res);
            });
        });
    }

    close(): void {
        if (this.pool) {
            this.pool.end(err => { });
        }
    }

    escape(string: string) {
        return mysql.escape(string)
    }

    getConnetion(callback: (err: any, connection?: any) => void): void {
        this.getPool().getConnection((err, connection: any) => {
            if (err) {
                if (connection) connection.release();
                return callback(err);
            }
            return callback(err, connection);
        });
    }

    rollback(connection: mysql.PoolConnection, err: mysql.MysqlError, callback: (error: any) => void): void {
        connection.rollback(function () {
            connection.release();
            return callback(err);
        })
    }

}

export { MysqlPoolConnector }
