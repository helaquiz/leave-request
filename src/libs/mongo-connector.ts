import * as mongodb from "mongodb";

var MongoClient = mongodb.MongoClient;

/**
 * The lib creator suggests this class should be singleton for the best performance
 */
class MongoDbClient {

    private static db: any = null;

    /**
     * Perform connection
     */
    public static connect(url: string, options: mongodb.MongoClientOptions, done: (err: any) => void) {
        if (MongoDbClient.db) return done(null);

        MongoClient.connect(url, <any>{ poolSize: 10 },
            (err, db) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                MongoDbClient.db = db;
                console.log(`[pid:${process.pid}] - [MongoDB Connector] connected successfully`);
                done(null);
            });
    }

    /**
     * Get connector
     */
    public static get(): mongodb.Db {
        return MongoDbClient.db;
    }

    /**
     * Close connection
     */
    public static close(done: (err: any) => void): void {
        if (MongoDbClient.db) {
            MongoDbClient.db.close((err:any) => {
                if (err) {
                    console.error(err);
                }
                MongoDbClient.db = null;
                return done(err);
            });
        }
    }
}

export { MongoDbClient };