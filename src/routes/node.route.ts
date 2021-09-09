import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import * as NodeMiddleware from "../middlewares/node.middleware"

const router = express.Router();

const controller = new UserController();

router.post(`/createNode`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, NodeMiddleware.createNode)

router.post(`/activateNode`, NodeMiddleware.verifyNode, NodeMiddleware.activateNode)

router.get(`/getNodes`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, NodeMiddleware.getAllNodes)

router.get(`/singleNode/:node_id`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, NodeMiddleware.getSingleNode)

router.patch(`/toggleNode/:node_id`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, NodeMiddleware.toggleNode)

export default router;