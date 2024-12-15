import { FastifyReply, FastifyRequest } from "fastify";

export async function HomeController(request: FastifyRequest, reply: FastifyReply){
    reply.status(200)
}