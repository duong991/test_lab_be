import { log } from 'console';
import { HttpException } from './httpException';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';

const handleException = (error: any, next: NextFunction) => {
    try {
        log(error);
        if (error instanceof HttpException) {
            throw error;
        } else {
            console.log(error);
            throw new HttpException(500, error.message);
        }
    } catch (error) {
        next(error);
    }
};

export const handleExceptionAndResponse = (error: any, req: Request, res: Response) => {
    try {
        log(error);
        if (error instanceof HttpException) {
            throw error;
        } else {
            throw new HttpException(500, error.message);
        }
    } catch (error) {
        let status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        let statusResponse = [401, 403, 406, 500].includes(status) ? status : 200;
        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

        if (statusResponse === 401 && message === 'jwt expired') {
            statusResponse = 406;
            status = 406;
        }
        res.status(statusResponse).json({
            status: 'error',
            statusCode: status,
            message: message.includes(',') ? message.split(',')[0] : message,
        });
    }
};

export default handleException;
