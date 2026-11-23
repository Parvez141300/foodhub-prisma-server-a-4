import { type Request, type Response, type NextFunction } from 'express';
import status from 'http-status';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: `This Route ${req.originalUrl} not found`,
    });
}