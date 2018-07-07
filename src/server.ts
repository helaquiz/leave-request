// declare static node env
let env: string = process.env.NODE_ENV || 'local'; // 'local' | development'|'production'
if (!env) process.exit(1);
// Cluster
import * as cluster from 'cluster';
import * as os from 'os';
// 3rd Party
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as errorHandler from 'errorhandler';

import { Configuration } from './config';
import { DAL } from './data-accesss/DAL';

import * as ROUTER from './routes/ROUTES';

import { ErrorHandle } from './middleware/error-handle'

export class Server {
    private static _serverInstance: Server
    private server: express.Application
    private config: Configuration
    private DAL: DAL

    private constructor(env: string = 'local') {
        this.config = Configuration.getConfigInstance(env);
        this.server = express();
        this.DAL = DAL.getDALInstance();
        this._init();
    }

    public static getServerInstance() {
        if (!Server._serverInstance) {
            Server._serverInstance = new Server();
        } else {
        }
        return Server._serverInstance
    }

    private _enableOps() {
        this.server.disable('etag');
        this.server.use(cors());
        this.server.use(bodyParser.json({ limit: '10mb' }));
        this.server.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        if (env === 'development' || env === 'qa') {
            this.server.use(morgan('common'));
            this.server.use(errorHandler({ log: ErrorHandle.ErrorInstance.Logger }));
        } else if (env === 'local') {
            this.server.use(morgan('common'));
            this.server.use(errorHandler({ log: ErrorHandle.ErrorInstance.Logger }));
        } else {
            this.server.use(morgan('combined'));
        }
    }

    private _route() {
        // Route
        this.server.use(ROUTER);
        let errorHandle = ErrorHandle.ErrorInstance
        this.server.use(errorHandle.NotFoundException)
        // DAL
    }

    private _init() {
        if (cluster.isMaster) {
            console.log(`========================================================================================`);
            console.log('Node env: ' + env);
            console.log(`Configuration Suite: ${env}`);
            console.log(`${Configuration.serverTitle} Server start listening on port : ${Configuration.serverPort}`);
            for (let i = 0; i < 2; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
            this.config.copyFolder('./template', '../build');
        } else {
            this._enableOps();
            this._route();
            this.server.listen(Configuration.serverPort, function () {
                console.log(`=========================Worker ${process.pid} started===================================`);
            });
        }
    }
}

let server = Server.getServerInstance();
