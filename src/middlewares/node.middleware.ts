import { INodePayload } from "@entities/node";
import { Response, Request, NextFunction } from "express";
import NodeController from "../controllers/node.controller";

const controller = new NodeController();

export function verifyNode(req: Request, res: Response, next: NextFunction) {
    const apiKey: any = req.headers["t-key"]
    const nodeUUID: any = req.headers["t-node-uuid"]

    controller.verifyNode(apiKey, nodeUUID)
        .then(Res => {
            res.locals.node = Res;
            next()
        }).catch(err => {
            res.status(err.status || 500).json(err)
        })
}

export function activateNode(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.node;

    controller.activateNode(id)
        .then(Res => {
            res.status(201).json(Res)
        }).catch(err => {
            res.status(err.status || 500).json(err)
        })
}

export function createNode(req: Request, res: Response) {
    const data: INodePayload = {
        ...req.body.node,
        dev_id: res.locals.account.id
    }

    controller.createNode(data)
        .then(Res => {
            res.status(201).json(Res);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}

export function getAllNodes(req: Request, res: Response) {
    controller.getAllNodes(res.locals.account.id)
        .then(Res => {
            res.status(200).json(Res)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

export function getSingleNode(req: Request, res: Response) {
    controller.getSingleNode(res.locals.account.id, req.params.node_id)
        .then(Res => {
            res.status(200).json(Res)
        })
        .catch(err => {
            res.status(err.status || 404).json(err)
        })
}

export function toggleNode(req: Request, res: Response) {
    controller.toggleNodeActivity(req.params.node_id, res.locals.account.id, {
        name: req.body.node.name,
        is_active: req.body.node.is_active
    }).then(Res => {
        res.status(201).json(Res)
    })
        .catch(err => {
            res.status(err.status || 404).json(err)
        })
}