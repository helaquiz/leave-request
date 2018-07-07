import * as redis from "redis";
// import * as Promise from "bluebird";

// const redisAsync : any = Promise.promisifyAll(redis);
let redisAsync:any;

class RedisClient {
    // static db: redis.RedisClient = null;
    static db: any = null;
    constructor(options: redis.ClientOpts) {
        RedisClient.db = redisAsync.createClient(options);
        RedisClient.db.on('connect', function () { console.log('Redis connected'); });
        RedisClient.db.on('error', function (err:any) { console.log('Redis error'); console.error(err); });
        RedisClient.db.on('end', function () { console.log('Redis ends the connection'); });
        RedisClient.db.on('reconnecting', function () { console.log('Redis is reconnecting'); });
        RedisClient.db.on('ready', function () { console.log('Redis is ready!'); });
    }
}

export { RedisClient }