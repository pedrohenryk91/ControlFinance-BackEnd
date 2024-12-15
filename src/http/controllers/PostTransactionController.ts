import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { types } from "@prisma/client";

const transactionTypes = z.enum(["Income","Outcome"])

export async function PostTransactionController(request: FastifyRequest, reply: FastifyReply){

    const {Value,Type} = z.object({
        Value: z.number(),
        Type: transactionTypes
    }).parse(request.body)

    const typeValidation = transactionTypes.safeParse(Type)

    if(!typeValidation.success){
        reply.status(400).send({
            Error: typeValidation.error.errors
        })
    }

    const UserId = String(request.user.sub)

    const transaction = await prisma.transaction.create({
        data:{
            Id: randomUUID(),
            Value,
            UserId:String(UserId),
            Type
        }
    })
    
    reply.status(201).send({
        Description: "Registro de Transação Completo"
    })
    
    reply.status(404).send("Usuário não existe");

}