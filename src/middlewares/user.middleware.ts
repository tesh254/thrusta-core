import { Response, Request } from "express";
import UserController from "../controllers/user.controller";

export function authenticate(req: Request, res: Response) {
    const { user: { uid, avatar, email, auth_type } } = req.body;

    new UserController().authenticateUser({
        uid,
        avatar,
        email,
        auth_type
    }).then(Res => {
        res.status(201).json(Res)
    }).catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
}

export function updateAccount(req: Request, res: Response) {
    const { user } = req.body;

    new UserController().updateAccount(res.locals.account.uid, {
        ...user
    }).then(Res => {
        res.status(200).json(Res)
    })
        .catch(err => {
            res.status(err.status || 400).json(err)
        })
}

export function generateJWT(req: Request, res: Response) {
    const identifier: any = req.query.uid;

    new UserController().generateJWT(identifier)
        .then(Res => {
            return res.status(201).json(Res)
        }).catch(err => {
            return res.status(err.status || 400).json({
                message: err.message
            })
        })

}