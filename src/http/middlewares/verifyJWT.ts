import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyJWT(req:FastifyRequest,res:FastifyReply) {
    try{
        await req.jwtVerify()
    }catch(err){
        console.log("Token jwt nao foi fornecido")
    }
}