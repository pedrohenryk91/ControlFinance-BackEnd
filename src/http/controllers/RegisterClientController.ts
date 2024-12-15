import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword } from "../../lib/tools.ts";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma.ts";
import z from "zod";

export async function RegisterClientController(request: FastifyRequest, reply: FastifyReply){
    
    try {
        const {Email, Password} = z.object({
            Email:z.string().email().toLowerCase(),
            Password:z.string()
        }).parse(request.body)

        const hashedPassword = await hashPassword(Password)
    
        await prisma.user.create({
            data:{
                Id: randomUUID(),
                Email,
                Password: hashedPassword
            }
        })

        reply.status(201).send({
            Description: "Usuario Criado"
        })
    
    } catch(e){
        reply.status(417).send({
            Error: e
        })
    }
}