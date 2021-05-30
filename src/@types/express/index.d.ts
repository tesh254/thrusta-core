import { IUser } from "@entities/user";
import { User } from "@prisma/client";

declare module 'express' {
    export interface Request {
        body: {
            user: IUser;

        };
    }

    export interface Response {
        locals: {
            account: User
        }
    }
}