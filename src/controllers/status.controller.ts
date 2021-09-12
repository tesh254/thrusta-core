import { PrismaClient, Node, Prisma } from '@prisma/client';
import { IStatusPayload, IReportPayload } from '@entities/status'

const prisma = new PrismaClient();

export default class StatusController {
    public async createStatus(statusPayload: IStatusPayload, nodeStatus: string): Promise<any> {
        const cpus = statusPayload.cpus as Prisma.JsonArray;

        const newStatus = await prisma.status.create({
            data: {
                node_id: statusPayload.node_id,
                ram_available: statusPayload.ram_available,
                ram_total: statusPayload.ram_total,
                ram_used: statusPayload.ram_used,
                server_uptime: statusPayload.server_uptime,
                swap_available: statusPayload.swap_available,
                swap_used: statusPayload.swap_used,
                swap_total: statusPayload.swap_total,
                cpu_total: statusPayload.cpu_total,
                cpu_usage_avg: statusPayload.cpu_usage_avg,
                cpu_free_avg: statusPayload.cpu_free_avg,
                cpus,
            }
        })

        const newReport = await prisma.report.create({
            data: {
                node_id: statusPayload.node_id,
                status: nodeStatus
            }
        })

        return {
            status: newStatus,
            report: newReport
        }
    }

    public async getStatuses(nodeId: string, limit: any, page: any, from: any, to: any): Promise<any> {
        const statuses = await prisma.status.findMany({
            where: {
                created_at: {
                    gte: from,
                    lt: to
                },
                node_id: nodeId
            },
            skip: limit,
            take: page,
        })

        const totalStatuses = await prisma.status.count();

        return {
            statuses,
            total_reports: totalStatuses,
            current_page: page,
            limit,
            pages: totalStatuses / limit
        }
    }

    public async getReports(nodeId: string): Promise<any> {
        const report = await prisma.report.findFirst({
            where: {
                node_id: nodeId,
            },
            orderBy: [
                {
                    posted_at: 'asc'
                }
            ]
        })

        return {
            report: report.id ? report : null
        }
    }
}