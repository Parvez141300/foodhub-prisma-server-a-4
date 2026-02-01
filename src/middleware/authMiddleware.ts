
import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}

export enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN",
}

const authMiddleware = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            if(!session){
                return res.status(401).json({message: "Unauthorized access"});
            }

            // if(!session.user.emailVerified){
            //     return res.status(403).json({message: "user's email must be verified to access this resource"});
            // }
            
            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified,
            }

            if(roles.length && !roles.includes(req.user.role as UserRole)){
                return res.status(403).json({message: "This user has no permission to access this resource"});
            }
            
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default authMiddleware;