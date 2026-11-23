import { type Request, type Response, type NextFunction } from 'express';
import { envVars } from '../utils/env';
import status from 'http-status';

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (envVars.NODE_ENV === "development") {
        console.log('this error is from global error handler middleware:', err);
    }

    let statusCode = status.INTERNAL_SERVER_ERROR;
    let message = err.message;
    let stack = err.stack;

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: envVars.NODE_ENV === "development" ? stack : undefined,
        error: envVars.NODE_ENV === "development" ? err : undefined,
    });
}