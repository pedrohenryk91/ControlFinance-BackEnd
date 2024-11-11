import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./prisma.ts"

export const app = fastify()

app.get("/",async (request, response)=>{
    console.log(request.ip)
    response.status(200).send("Paz do Senhor")
})

app.post("/adduser",async (request, reponse)=>{

    const {Email, Password, Username} = z.object({
        Email:z.string(),
        Password:z.string(),
        Username:z.string().optional()
    }).parse(request.body)

    const obj_user = await prisma.user.create({
        data:{
            Email,Password,Username
        }
    })

    if(obj_user){
        reponse.status(201).send("Usuario Criado" + obj_user)
    }
})

app.post("/action/:value",async (request, response)=>{
    
})

app.delete("/remuser/:Id", async (request, response)=>{

    const {Id} = z.object({
        Id:z.string()
    }).parse(request.params)

    const id = Number(Id)
    
    try{
        const user = await prisma.user.delete({
            where:{
                Id:id
            }
        })
        response.send("Usuario deletado" + user)
    }
    catch(err){
        response.status(498).send("erro" + err)
    }
})