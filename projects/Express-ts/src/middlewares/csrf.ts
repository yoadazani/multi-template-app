import { Request, Response, NextFunction } from 'express';
import Csrf from 'csrf';
import { AuthError } from '../errors/AuthError';
import { HttpStatusCodes } from '../constants/httpStatusCodes';
import { CSRF_SECRET } from '../constants';

const csrfProtection = new Csrf();

export const csrfMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const { csrfToken } = req.body;
    const secret = CSRF_SECRET.get('CSRF_SECRET');

    const isCSRFValid = csrfProtection.verify(secret, csrfToken);

    CSRF_SECRET.clear();

    if (!csrfToken || !isCSRFValid) {
        throw new AuthError(
            'Unauthorized! please login first!',
            undefined,
            'Unauthorized',
            HttpStatusCodes.UNAUTHORIZED,
        );
    }

    return next();
};
