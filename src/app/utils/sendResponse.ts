
import { Response } from 'express';

interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
}

export const sendResponse = <T>(res: Response, responseData: IApiResponse<T>) => {
    const { statusCode, success, message, data } = responseData;
    return res.status(statusCode).json({
        success: success,
        message: message,
        data: data,
    });
}