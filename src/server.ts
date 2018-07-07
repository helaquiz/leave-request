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
import { MongoDbClient } from './libs/mongo-connector';

import * as route from './routes/ROUTES';

import { ErrorHandle } from './middleware/error-handle'

export class Server {
    private static _serverInstance: Server
    public server: express.Application
    public config: Configuration

    private constructor(env: string = 'local') {
        this.config = new Configuration(env);
        this.server = express();
        this._config();
        this._route();
        this._init();
    }

    public static get ServerInstance() {
        // return new Server();
        return this._serverInstance || (this._serverInstance = new this());
    }

    private _config() {
        this.server.disable('etag');
        this.server.use(cors());
        this.server.use(bodyParser.json({ limit: '10mb' }));
        // this.server.use(methodOverride(function (req, res) {
        //     console.log(`override`)
        //     let customdata = req.body
        //     req.body.data = `1111`
        //     var method = req.body.method
        //     delete req.body.method
        //     return method;
        // }));
        this.server.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        if (env === 'development' || env === 'qa') {
            this.server.use(morgan('common'));
            this.server.use(errorHandler());
        } else if (env === 'local') {
            this.server.use(morgan('common'));
            this.server.use(errorHandler());
        } else {
            this.server.use(morgan('combined'));
        }
    }

    private _route() {
        // Route
        this.server.use(route.testRoute);
        this.server.use(route.userRoute);
        let errorHandle = ErrorHandle.ErrorInstance
        this.server.use(errorHandle.NotFoundException)
    }

    private _init() {
        if (cluster.isMaster) {
            console.log(`=========================================================================================`);
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
            this.server.listen(Configuration.serverPort, function () {
                // database.connect('mysql','mongodb','redis','firebase');
                console.log(`=========================Worker ${process.pid} started===================================`);
                MongoDbClient.connect(Configuration.mongoUrl, Configuration.mongoOptions, (err) => {
                    if (err) {
                        console.error(err);
                        process.exit(1); // exit with failure
                    }
                });
            });
        }
    }
}

let server = Server.ServerInstance;
