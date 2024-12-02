import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";

export async function PostTransactionController(request: FastifyRequest, reply: FastifyReply){
    const {Value,Type} = z.object({
        Value: z.number(),
        Type: z.string()
    }).parse(request.body)

    const UserId = String(request.user.sub)

    const obj_transaction = await prisma.transaction.create({
        data:{
            Id: randomUUID(),
            Value,
            UserId:String(UserId),
            Type
        }
    })
    
    reply.status(201).send({
        Description: "Registro de Transação",
        Value: obj_transaction.Value,
        Type: obj_transaction.Type
    })
    
    reply.status(404).send("Usuário não existe");

}