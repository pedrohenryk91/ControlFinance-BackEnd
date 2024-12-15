import { FastifyReply, FastifyRequest } from "fastify";

export async function JwtHookController(request: FastifyRequest, reply: FastifyReply){
    try {
        if (request.url != "/register" && request.url != "/auth/login") {
            request.jwtVerify()
        }
    }
    catch(err) {
        reply.status(401).send(err)
    }
}