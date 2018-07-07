import * as fs from "fs";
import * as ini from "ini";
import * as path from "path";
import * as mongodb from 'mongodb';
import { IMysqlConfig } from "./interfaces/mysql";
/**
 * Configuration class for MySQL
 */
class MysqlConfiguration implements IMysqlConfig {
    public host: string = 'localhost';
    public port: number = 3306;
    public user: string = '';
    public password: string = '';
    public db: string = '';
    public charset: string = 'utf8';
    public timezone: string = 'utc';
    public connectionMode: string = 'pool';

    // For pool connection
    public acquireTimeout: number = 10000;
    public waitForConnections: boolean = true;
    public connectionLimit: number = 100;
    public queueLimit: number = 100;
}

/**
 * Configuration class for Server
 */
class Configuration {
    // Server
    static serverTitle = 'AOT-Limousine Backoffice Server';
    static serverPort = 80;
    // MySQL
    static mysqlConfig: IMysqlConfig;
    // MongoDB
    static mongoUrl: string;
    static mongoOptions: mongodb.MongoClientOptions;

    constructor(private env: string) {
        switch (env) {
            case 'production':
                this.loadConfiguration(env, './config.ini');
                break;
            case 'development':
                this.loadConfiguration(env, './config.develop.ini');
                break;
            case 'qa':
                this.loadConfiguration(env, './config.qa.ini');
                break;
            case 'local':
                this.loadConfiguration(env, './config.local.ini');
                break;
            default:
                console.log('Configuration mode: undefined');
                process.exit(1);
        }
    }
    /**
     * Set configuration for Production mode
     */
    private loadConfiguration(env: string, configPath: string): void {
        let config = ini.parse(fs.readFileSync(configPath, 'utf-8'));
        // Server
        Configuration.serverPort = Number(config.server.port);
        // MySQL
        Configuration.mysqlConfig = new MysqlConfiguration();
        Configuration.mysqlConfig.host = config.mysql.host;
        Configuration.mysqlConfig.port = Number(config.mysql.port);
        Configuration.mysqlConfig.user = config.mysql.user;
        Configuration.mysqlConfig.password = config.mysql.password;
        Configuration.mysqlConfig.db = config.mysql.db;
        Configuration.mysqlConfig.charset = config.mysql.charset;
        Configuration.mysqlConfig.timezone = config.mysql.timezone;
        Configuration.mysqlConfig.connectionMode = config.mysql.connectionMode;
        Configuration.mysqlConfig.acquireTimeout = Number(config.mysql.acquireTimeout);
        Configuration.mysqlConfig.waitForConnections = config.mysql.waitForConnections;
        Configuration.mysqlConfig.connectionLimit = Number(config.mysql.connectionLimit);
        Configuration.mysqlConfig.queueLimit = Number(config.mysql.queueLimit);
        // MongoDB
        Configuration.mongoUrl = config.mongo.mongourl;
        Configuration.mongoOptions;
    }

    copyFolder(srcPath: string, destPath: string) {
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }
        if (!fs.existsSync(srcPath))
            return;
        let files = fs.readdirSync(srcPath);
        for (let i = 0; i < files.length; i++) {
            let current = fs.lstatSync(path.join(srcPath, files[i]));
            if (current.isDirectory()) {
                this.copyFolder(path.join(srcPath, files[i]), path.join(destPath, files[i]));
            } else {
                let oldFile = fs.createReadStream(path.join(srcPath, files[i]));
                let newFile = fs.createWriteStream(path.join(destPath, files[i]));
                oldFile.pipe(newFile);
            }
        }
    }
}

export { Configuration }