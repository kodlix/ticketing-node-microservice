import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, resp: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        return resp.status(err.statusCode).send({ errros: err.serializeErrors() });
    }
    resp.status(400).send({ errors: [{ message: "Something went wrong!!!" }] });
};