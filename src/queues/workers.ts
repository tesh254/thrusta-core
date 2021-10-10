import { Job, Worker } from 'bullmq'
import { REDIS_PORT, REDIS_URL, STAT_QUEUE_NAME } from './constants'
import StatusController from '../controllers/status.controller'

const statusController = new StatusController();

export const systemStatsWorker = new Worker(STAT_QUEUE_NAME, async (job: any) => {
    try {
        const { data: {
            node_credentials: {
                node_identifier: node_id,
                api_key
            }, system_stats: {
                uptime: server_uptime,
                memory_used: ram_used,
                memory_available: ram_available,
                memory_total: ram_total,
                memory_cached: ram_cached,
                cpu_used: cpu_usage_avg,
                cpu_free: cpu_free_avg,
                cpu_total,
                cpu_count
            }
        } } = job;

        const newStatus = await statusController.nodeStatusUpdate({
            node_id,
            ram_available,
            ram_cached, ram_total, ram_used,
            cpu_usage_avg,
            cpu_total,
            cpu_free_avg,
            cpu_count,
            cpus: [],
            server_uptime,
            storage_free: 0,
            storage_total: 0,
            storage_used: 0,
            swap_available: 0,
            swap_total: 0,
            swap_used: 0,
            created_at: '',
            updated_at: ''
        }, 'UPDATE', {
            node_uuid: node_id,
            api_key
        })

        return newStatus
    } catch (error) {
        throw error;
    }
}, {
    connection: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
})

systemStatsWorker.on("completed", (job) => {
    console.log(`${job.id} has completed!`)
})

systemStatsWorker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`)
})