import { ErrorRequestHandler } from 'express';


export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    console.error(' [Global Error]:', err.message);

    res.status(500).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? '🔒' : err.stack
    });
};