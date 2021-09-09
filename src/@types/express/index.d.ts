import { INodePayload } from "@entities/node";
import { IUser } from "@entities/user";
import { User, Node } from "@prisma/client";

declare module 'express' {
    export interface Request {
        body: {
            user: IUser;
            node: INodePayload
        };
    }

    export interface Response {
        locals: {
            account: User,
            node: Node
        }
    }
}