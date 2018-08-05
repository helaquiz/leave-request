import * as express from 'express';


class ErrorHandle {
    private static errorInstance: ErrorHandle

    private constructor() {

    }

    public static get ErrorInstance() {
        return this.errorInstance || (this.errorInstance = new this());
    }


    // catch Error
    public CatchException(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(err);
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ code: err.status, message: err.message });
            // logger.error(err);
        } else {
            next();
        }
    }

    // catch 404
    public NotFoundException(req: express.Request, res: express.Response, next: express.NextFunction) {
        const errObj: any = {}
        const err: any = new Error('Not Found')
        errObj.url = req.originalUrl;
        console.log('ERROR PASSING THROUGH', err.message);
        // get the error stack
        const stack = String(err.stack).split(/\n/).map((stackTrace: string) => stackTrace.replace(/\s{2,}/g, ' ').trim());
        // send out the error as json
        res.status(err.status || 404).json({
            code: err.status || 404,
            api: err,
            url: req.originalUrl,
            error: err.message,
            stack,
        });
    }

    public InternalException(req: express.Request, res: express.Response, next: express.NextFunction) {
        const errObj: any = {}
        const err: any = new Error('INTERNAL ERROR')
        errObj.url = req.originalUrl;
        console.log('ERROR PASSING THROUGH', err.message);
        // get the error stack
        const stack = err.stack.split(/\n/).map((stackTrace: string) => stackTrace.replace(/\s{2,}/g, ' ').trim());
        // send out the error as json
        res.status(500).json({
            code: 500,
            api: err,
            url: req.originalUrl,
            error: err.message,
            stack,
        });
    }

    public Logger(a: any, b: any, c: any, d: any) {
        console.log(`hiii`, a, b, c, d)
    }
}
export { ErrorHandle }