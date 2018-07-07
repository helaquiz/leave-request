export interface IMysqlConfig {
    host: string;
    port: number
    user: string;
    password: string;
    db: string;
    charset: string;
    timezone: string;
    connectionMode: string;
    // For pool connection
    acquireTimeout: number;
    waitForConnections: boolean;
    connectionLimit: number;
    queueLimit: number;
}

export interface IMysqlPool {
    exec(query: string, data: any, callback: (err: any, res?: any) => void): void;
    close(): void;
    escape(string: string): string;
    startTransaction(callback: (err: any, connection?: any) => void): void;
}