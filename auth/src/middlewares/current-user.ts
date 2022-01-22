import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
 
interface IUserPayload{
    email: string;
    id: string;
}

declare global{
    namespace Express {
        interface Request{
            currentUser?: IUserPayload;
        }
    }
}

export const currentUser = async (req: Request, res:Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        console.log("jwt token is empty");        
        next();        
    }

    try {
        const payload = await jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as IUserPayload;
        req.currentUser = payload;
    } catch (error) {
        console.log("CurrentUserMiddleWare", error);        
    }

    next();
}