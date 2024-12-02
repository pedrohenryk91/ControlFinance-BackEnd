import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword } from "../../lib/tools.ts";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma.ts";
import z from "zod";

export async function RegisterClientController(request: FastifyRequest, reply: FastifyReply){
    const {Email, Password, Username} = z.object({
        Email:z.string().email(),
        Password:z.string(),
        Username:z.string().optional()
    }).parse(request.body)

    const hashedPassword = await hashPassword(Password)
    
    const obj_user = await prisma.user.create({
        data:{
            Id: randomUUID(),
            Email,
            Password: hashedPassword,
            Username
        }
    })

    if(obj_user){
        reply.status(201).send({
            Description: "Usuario Criado",
            User_Id: obj_user.Id,
            User_Name: Username,
            User_Email: Email
        })
    }
}