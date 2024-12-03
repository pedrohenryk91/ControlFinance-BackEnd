import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetTransactionsController(request: FastifyRequest, reply: FastifyReply){
    const user = request.user.sub
    try{
        const transactionList = await prisma.transaction.findMany({
            where:{
                UserId:user
            }
        })
        if(transactionList){
            const sanitizedList = transactionList.map(transaction => {
                const { Id, UserId, ...safeTransaction} = transaction;
                return safeTransaction;
            })
            reply.status(200).send(sanitizedList)
        } else {
            reply.status(404).send({
                Message:"Não encontrado"
            })
        }
    } catch(err){
        reply.send(err)
    }
}