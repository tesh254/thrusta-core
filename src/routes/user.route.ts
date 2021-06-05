import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import * as UserMiddleware from "../middlewares/user.middleware";

const router = express.Router()

const controller = new UserController()

router.post(`/processAccount`, UserMiddleware.authenticate);

router.patch(`/updateHost`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, UserMiddleware.updateAccount);

router.get(`/getStatus`, (req: Request, res: Response, next: NextFunction) => {
    controller.verifyToken(req, res, next)
}, (req: Request, res: Response) => {
    res.status(200).json(res.locals.account)
})

router.post(`/generateToken`, UserMiddleware.generateJWT);

export default router;