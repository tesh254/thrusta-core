import { INodePayload } from '@entities/node';
import { PrismaClient, Node } from '@prisma/client'
import uuidApiKey from "uuid-apikey";

const prisma = new PrismaClient();

// const secretKey = "489402f90222226116956ab7cd2cb97f1961b796737fc8c06f6ac7ab764a5976";

export default class NodeController {
    public async createNode(nodePayload: INodePayload): Promise<any> {
        const newNode = await prisma.node.create({
            data: {
                name: nodePayload.name,
                is_active: true,
                dev_id: nodePayload.dev_id,
            }
        })

        const hash = uuidApiKey.create()

        const updateNode = await prisma.node.update({
            where: {
                id: newNode.id,
            },
            data: {
                api_key: hash.apiKey,
                api_key_uuid: hash.uuid
            }
        })

        return updateNode;
    }

    public async generateNodeKey(nodeId: string): Promise<Node> {
        const hash = uuidApiKey.create()

        const updateNode = await prisma.node.update({
            where: {
                id: nodeId,
            },
            data: {
                api_key: hash.apiKey,
                api_key_uuid: hash.uuid
            }
        })

        return updateNode
    }

    public async verifyNode(apiKey: string, nodeUUID: string): Promise<Node> {
        if (nodeUUID && apiKey) {
            const node = await prisma.node.findUnique({
                where: {
                    id: nodeUUID,
                }
            })

            if (node?.id) {
                if (node.api_key === apiKey) {
                    if (uuidApiKey.check(apiKey, node.api_key_uuid)) {
                        return node
                    } else {
                        throw {
                            message: "Invalid API Key",
                            status: 401
                        }
                    }
                } else {
                    throw {
                        message: "API keys don't match",
                        status: 401
                    }
                }
            } else {
                throw {
                    message: "Node not verified",
                    status: 403
                }
            }
        } else {
            throw {
                message: "Provide API and Node uuid arguments",
                status: 400
            }
        }
    }

    public async activateNode(nodeId: string): Promise<Node> {
        const node = await prisma.node.update({
            where: {
                id: nodeId
            },
            data: {
                activated_at: new Date().toISOString()
            }
        })


        return node
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
