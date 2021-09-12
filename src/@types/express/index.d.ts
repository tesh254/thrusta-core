import { INodePayload } from "@entities/node";
import { IReportPayload, IStatusPayload } from "@entities/status";
import { IUser } from "@entities/user";
import { User, Node } from "@prisma/client";

declare module 'express' {
    export interface Request {
        body: {
            user: IUser;
            node: INodePayload;
            status: IStatusPayload;
            node_status: string;
        };
        params: {
            node_id: string;
        },
        query: {
            limit: number;
            page: number;
            from: string;
            to: string;
        }
    }

    export interface Response {
        locals: {
            account: User,
            node: Node
        }
    }
}