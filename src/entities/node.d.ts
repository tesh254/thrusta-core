import { Node } from "@prisma/client";
import { IUser } from "./user";

export interface INodePayload {
    id: string;
    name: string;
    access_key: string;
    is_active: boolean;
    dev_id: string;
}

export type INode = INodePayload & Node;