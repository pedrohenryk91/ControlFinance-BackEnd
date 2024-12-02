import { FastifyReply, FastifyRequest } from "fastify";

export async function HomeController(request: FastifyRequest, reply: FastifyReply){
    try{
        reply.status(200).send({
            Description: "Rodando"
        })
    } catch(e){
        reply.send({
            Error: e
        })
    }
}