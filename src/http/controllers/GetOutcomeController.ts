import { FastifyRequest, FastifyReply } from "fastify";

export async function GetOutcomeController(request: FastifyRequest, reply: FastifyReply){
    const user = request.user.sub
    
}