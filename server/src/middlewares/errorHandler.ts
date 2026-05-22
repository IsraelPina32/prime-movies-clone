import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
  });
};