import { STAT_JOB_NAME } from './constants';
import { systemStatsQueue } from './queue';

export async function addStatsToQueue(data) {
    await systemStatsQueue.add(STAT_JOB_NAME, data)
}