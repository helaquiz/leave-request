import * as express from 'express';


class ErrorHandle {
    private static errorInstance: ErrorHandle

    private constructor() {

    }

    public static get ErrorInstance() {
        // return new Server();
        return this.errorInstance || (this.errorInstance = new this());
    }

    // catch 404
    public NotFoundException(req: express.Request, res: express.Response, next: express.NextFunction) {
        const errObj: any = {}
        const err: any = new Error('Not Found')
        errObj.url = req.originalUrl;
        console.log('ERROR PASSING THROUGH', err.message);
        // get the error stack
        const stack = err.stack.split(/\n/).map((stackTrace: string) => stackTrace.replace(/\s{2,}/g, ' ').trim());
        // send out the error as json
        res.status(500).json({
            api: err,
            url: req.originalUrl,
            error: err.message,
            stack,
        });
    }
}
export { ErrorHandle }