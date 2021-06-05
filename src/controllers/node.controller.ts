import { INodePayload } from '@entities/node';
import { PrismaClient, Node } from '@prisma/client'
import { encrypt } from 'src/utils/keys';

const prisma = new PrismaClient();

const secretKey = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

export default class NodeController {
    public async createNode(nodePayload: INodePayload): Promise<any> {
        const newNode = await prisma.node.create({
            data: {
                name: nodePayload.name,
                is_active: true,
                dev_id: nodePayload.dev_id,
            }
        })

        const hash = encrypt(newNode.id, secretKey)

        const updateNode = await prisma.node.update({
            where: {
                id: newNode.id,
            },
            data: {
                access_key: hash.content || newNode.access_key,
                iv: hash.iv || newNode.iv
            }
        })

        return updateNode;
    }

    public async generateNodeKey(nodeId: string): Promise<Node> {
        const hash = encrypt(nodeId, secretKey)

        const updateNode = await prisma.node.update({
            where: {
                id: nodeId,
            },
            data: {
                access_key: hash.content,
                iv: hash.iv
            }
        })

        return updateNode
    }

    public async getAllNodes(devId: string): Promise<Node[]> {
        const nodes = await prisma.node.findMany({
            where: {
                dev_id: devId
            },
        })

        return nodes;
    }

    public async getSingleNode(devId: string, nodeId): Promise<Node> {
        const singleNode = await prisma.node.findFirst({
            where: {
                id: nodeId,
                dev_id: devId,
            }
        })

        return singleNode;
    }

    public async toggleNodeActivity(nodeId: string, devId: string, data: {
        name: string;
        is_active: boolean;
    }): Promise<Node | {
        status: number;
        message: string;
    }> {
        const getNode = await prisma.node.findFirst({
            where: {
                id: nodeId,
                dev_id: devId
            }
        })

        if (getNode) {
            const updateNode = await prisma.node.update({
                where: {
                    id: nodeId
                },
                data: {
                    name: data.name || getNode.name,
                    is_active: data.is_active || getNode.is_active
                }
            })

            return updateNode
        } else {
            throw {
                status: 404,
                message: "Node was not found"
            }
        }
    }
}
