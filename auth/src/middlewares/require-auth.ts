import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { NotAuthorizedError } from '../errors/not-authorized-error';
 
import { RequestValidationError } from '../errors/request-validation-error';

export const requireAuth = async (req: Request, res:Response, next: NextFunction) => {
   if (!req.currentUser) {
       throw new NotAuthorizedError();
   }
    next();
}