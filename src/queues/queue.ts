import { Queue } from "bullmq";
import { REDIS_PORT, REDIS_URL, STAT_QUEUE_NAME } from "./constants";

export const systemStatsQueue = new Queue(STAT_QUEUE_NAME, {
    connection: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
});