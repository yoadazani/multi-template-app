import { NextFunction, Request, Response } from 'express';
import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

const sanitize = (
    data: string | Record<string, unknown>,
): string | Record<string, unknown> => {
    if (typeof data === 'string') return DOMPurify.sanitize(data);

    if (Array.isArray(data)) data.map(sanitize);

    if (typeof data === 'object') {
        return Object.entries(data as Record<string, unknown>).reduce(
            (acc, [key, value]) => {
                acc[key] = sanitize(value as string);
                return acc;
            },
            {} as Record<string, unknown>,
        );
    }
    return data;
};

export const sanitizeData = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    if (!req.body) return next();

    Object.keys(req.body).forEach((key) => {
        req.body[key] = sanitize(req.body[key]);
    });

    return next();
};
