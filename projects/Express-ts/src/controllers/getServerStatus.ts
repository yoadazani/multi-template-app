import { Request, Response } from 'express';
import { HttpStatusCodes } from '../constants/httpStatusCodes';

export const getServerStatus = async (_req: Request, res: Response) => {
    res.json({
        status: HttpStatusCodes.SERVER_AVAILABLE,
        message: 'Server is available',
    }).status(HttpStatusCodes.SERVER_AVAILABLE);
};
