import { Request, Response, NextFunction } from "express";
import firebase from "../firebase";
import { IUser } from '@entities/user'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export default class UserController {
    public async authenticateUser(userPayload: IUser): Promise<any> {
        console.log(userPayload)

        const currentUser = await prisma.user.findUnique({
            where: {
                uid: userPayload.uid
            }
        })

        console.log(currentUser)

        if (currentUser) {
            return {
                user: currentUser
            }
        } else {
            const result = await prisma.user.create({
                data: {
                    uid: userPayload.uid,
                    avatar: userPayload.avatar,
                    email: userPayload.email,
                    last_logged_in: new Date().toISOString(),
                    auth_type: userPayload.auth_type,
                    name: userPayload.name
                }
            })

            return { user: result };
        }
    }

    public async updateAccount(uid: string, userPayload: IUser): Promise<any> {
        try {
            const account = await prisma.user.findUnique({
                where: {
                    uid
                }
            })

            const updateAccount = await prisma.user.update({
                where: {
                    uid
                },
                data: {
                    name: userPayload.name || null,
                    avatar: userPayload.avatar || account.avatar,
                }
            })

            return { user: updateAccount }
        } catch (error) {
            throw {
                status: 400,
                message: error.message
            }
        }
    }

    public async fetchUserByUid(uid: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                uid,
            }
        })

        return user
    }

    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const headerToken: string = req.headers.authorization || "Bearer ";

        if (!headerToken) {
            res.status(401).json(
                {
                    message: "Create an account or log in", logout: true
                }
            );
        }

        if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
            res.send({ message: "Invalid session", logout: true })
        }

        const token = headerToken.split(" ")[1];

        firebase.auth().verifyIdToken(token).then(async (result: firebase.auth.DecodedIdToken) => {
            const account = await prisma.user.findUnique({
                where: {
                    uid: result.uid,
                }
            })
            if (account.uid) {
                res.locals.account = account;

                next()
            } else {
                throw {
                    message: "Account not found, create one or log in"
                }
            }
        }).catch((err: {
            message: string
        }) => res.send({
            message: `Problem logging you in ${err.message}`
        }).status(403))
    }

    public async generateJWT(uid: string) {
        try {
            const result = await firebase.auth().createCustomToken(uid)

            return {
                token: result
            }
        } catch (err) {
            throw {
                status: 400,
                message: "Cannot log in please try again"
            }
        }
    }
}