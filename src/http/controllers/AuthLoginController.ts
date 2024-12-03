import { FastifyReply, FastifyRequest } from "fastify";
import { comparePassword } from "../../lib/tools";
import { prisma } from "../../lib/prisma";
import z from "zod"

export async function AuthLoginController(request: FastifyRequest, reply: FastifyReply){

    try {
        const {Email,Password} = z.object({
            Email:z.string().email().toLowerCase(),
            Password:z.string()
        }).parse(request.body)

        const doesTheEmailExists = await prisma.user.findUnique({
            where:{
                Email
            }
        })

        if(!doesTheEmailExists){
            reply.status(404).send("Email não encontrado")
        } else {
            if(await comparePassword(Password, doesTheEmailExists.Password)){
                const token = await reply.jwtSign({},{
                    sign:{
                        sub:doesTheEmailExists.Id
                    }
                })
                reply.status(200).send({ token })
            }
            else{
                reply.status(401).send({
                    Message: "Senha Incorreta"
                })
            }
        }
    } catch(e){
        reply.status(417).send({
            Error: e
        })
    }
}