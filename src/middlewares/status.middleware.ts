import { IReportPayload, IStatusPayload } from '@entities/status';
import { Response, Request, NextFunction } from 'express'
import StatusController from '../controllers/status.controller';

const controller = new StatusController();

export function createStatus(req: Request, res: Response, next: NextFunction) {
    controller.createStatus(req.body.status, req.body.node_status)
        .then(Res => {
            res.status(201).json(Res);
        }).catch(err => {
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message
            })
        })
}

export function getStatuses(req: Request, res: Response, next: NextFunction) {
    controller.getStatuses(req.params.node_id, req.query.limit, req.query.page, req.query.from, req.query.to)
        .then(Res => {
            res.status(200).json(Res)
        }).catch(err => {
            res.status(err.status || 500).json({
                message: err.message,
                status: err.status || 500
            })
        })
}

export function getReports(req: Request, res: Response, next: NextFunction) {
    controller.getReports(req.params.node_id)
        .then(Res => {
            res.status(200).json(Res)
        }).catch(err => {
            res.status(err.status || 500).json({
                message: err.message,
                status: err.status || 500
            })
        })
}