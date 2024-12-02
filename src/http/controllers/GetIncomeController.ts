import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../lib/prisma"

export async function GetIncomeController(request: FastifyRequest, reply: FastifyReply){
    const user = request.user.sub
    try{
        const transactionList = await prisma.transaction.findMany({
            where:{
                UserId:user,
                Type:"Income"
            }
        })
        if(transactionList){
            reply.status(200).send([...transactionList])
        } else {
            reply.status(404).send({
                Message:"Não encontrado"
            })
        }
    } catch(err){
        reply.send(err)
    }
}