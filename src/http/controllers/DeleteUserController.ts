import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function DeleteUserController(request: FastifyRequest, reply: FastifyReply){
    const Id = request.user.sub
    try {
        await prisma.transaction.deleteMany({
            where:{
                UserId:Id
            }
        })
        await prisma.user.delete({
            where:{
                Id
            }
        })
        reply.status(204).send({
            Description:"User deleted succesfully"
        })
    } catch(e){
        reply.status(404).send({
            Error:"User not found",
            e
        })
    }
}