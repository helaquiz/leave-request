import * as express from 'Express';
import * as exjwt from 'express-jwt';
import { Configuration } from '../config';

// const key = Configuration.secretKey
// console.log(String(key))

// const exjwtOptions = {

// };

export function enableExjwt(key: string) {
    console.log(key);
    return exjwt({
        secret: key,
        credentialsRequired: true,
        getToken: function fromHeaderOrQuerystring(req: express.Request) {
            try {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            } catch (e) {
                console.log(e);
            }
        }
    }).unless({
        path: ['/api/v1/user/login', '/api/v1/user/refreshtoken', '/api/v1/test', '/api/v1/test/']
    });
}