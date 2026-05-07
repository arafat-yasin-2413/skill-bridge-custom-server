import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
// import config from "../config";
// import { prisma } from "../lib/prisma";

export enum UserRole {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN",
}

const auth = (...roles: UserRole[]) =>{

    return async (req:Request, res:Response, next:NextFunction) =>{

        try{
            // checking token existence
            const token = req.headers.authorization;
            if(!token) {
                throw new Error("Token not found.");
            }

            // decoding the token
            const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
            console.log('decoded data: ', decoded);

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email
                }
            });

            if(!userData) {
                throw new Error("USER NOT EXISTS!");
            }

            if(roles.length && !roles.includes(decoded.role)) {
                throw new Error("You Are Unauthorized!");
            }

            req.user = decoded;
            next();
        }
        catch(error: any) {
            console.error(error);
            next(error);
        }
    }
}

export default auth;