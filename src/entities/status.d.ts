import { Status } from '@prisma/client';
import { INode } from './node'

type CPU = {
    id?: string;
    name: string;
    total: number;
    usage: number;
    free: number;
    model: string;
    frequency: string;
    status: string;
    status_id: string;
    created_at: string;
    updated_at: string;
}

export interface IStatusPayload {
    id?: string;
    node?: INode;
    node_id: string;
    ram_available: number;
    ram_total: number;
    ram_used: number;
    server_uptime: number;
    swap_available: number;
    swap_total: number;
    swap_used: number;
    cpu_total: number;
    cpu_usage_avg: number;
    cpu_free_avg: number;
    storage_used: number;
    storage_total: number;
    storage_free: number;
    cpus: CPU[];
    created_at: string;
    updated_at: string;
}

export interface IReportPayload {
    id?: string;
    node?: INode;
    node_id: string;
    status: string;
    posted_at: Date;
    updated_at: Date;
}