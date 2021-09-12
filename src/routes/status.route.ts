import UserController from "../controllers/user.controller";
import { verifyNode } from '../middlewares/node.middleware';
import express, { NextFunction, Request, Response } from 'express';
import * as StatusMiddleware from '../middlewares/status.middleware';

const router = express.Router();
const controller = new UserController();

router.post(`/createStatus`, verifyNode, StatusMiddleware.createStatus);

router.get(`/getStatuses`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, StatusMiddleware.getStatuses)

router.get(`/getReports`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, StatusMiddleware.getReports)

export default router;