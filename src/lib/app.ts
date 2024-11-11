import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./prisma.ts"

export const app = fastify()

app.get("/",async (request, response)=>{
    console.log(request.ip)
    response.status(200).send("Rodando")
})

app.get("/action/get/:Id", async(request, response)=>{
    const {Id} = z.object({
        Id: z.string().refine((value)=>{
            return !isNaN(Number(value))
        })
    }).parse(request.params)

    const transactionsFromUser = await prisma.transaction.findMany({
        where:{
            UserId: Number(Id)
        }
    })

    response.status(302).send({
        Description: "Lista de Transações do Usuário " + Id,
        Transações: [...transactionsFromUser]
    })
})

app.post("/registuser",async (request, reponse)=>{

    const {Email, Password, Username} = z.object({
        Email:z.string().email(),
        Password:z.string(),
        Username:z.string().optional()
    }).parse(request.body)

    const obj_user = await prisma.user.create({
        data:{
            Email,Password,Username
        }
    })

    if(obj_user){
        reponse.status(201).send({
            Description: "Usuario Criado",
            User_Id: obj_user.Id,
            User_Name: Username,
            User_Email: Email
        })
    }
})

app.post("/action/:UserId/:Value/:Type",async (request, response)=>{

    const {UserId,Value,Type} = z.object({
        UserId: z.string().refine((value)=>{
            return !isNaN(Number(value))
        }),
        Value: z.string().refine((value)=>{
            return !isNaN(Number(value))
        }),
        Type: z.string()
    }).parse(request.params)

    const obj_transaction = prisma.transaction.create({
        data:{
            Value: Number(Value),
            UserId: Number(UserId),
            Type
        }
    })

    response.status(201).send({
        Description: "Registro de Transação",
        Value: (await obj_transaction).Value,
        Type: (await obj_transaction).Type
    })
})

app.patch("/auth/login",async(req,res)=>{

    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)

    const doesTheEmailExists = await prisma.user.findUnique({
        where:{
            Email
        }
    })

    if(!doesTheEmailExists){
        res.status(404).send("Email não encontrado")
    } else {
        if(Password==doesTheEmailExists.Password){
            res.status(200).send({
                Description:"Usuário logado",
                UserId:doesTheEmailExists.Id
            })
        }
    }
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