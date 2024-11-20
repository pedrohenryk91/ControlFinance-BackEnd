import Fastify,{fastify} from "fastify"
import { z } from "zod"
import { prisma } from "./prisma.ts"
import { comparePassword, hashPassword } from "./tools.ts"
import fastifyJwt from '@fastify/jwt';
import { randomUUID } from "crypto";
import { VerifyJWT } from "../http/midlewares/verifyJWT.ts";

const SECRET = "segredossecretos"

export const app = fastify()

app.register(fastifyJwt, {secret: SECRET})

app.addHook("preHandler",async (request, response)=>{
    try {
        if (request.url != "/register" && request.url != "/auth/login") {
            request.jwtVerify()
        }
    }
    catch(err) {
        response.status(401).send(err)
    }
})

app.get("/",async (request, response)=>{
    console.log(request.ip)
    response.status(200).send("Rodando")
})

app.get("/action/get/transactions",{
    preHandler:[VerifyJWT]
},async (request, response)=>{
    const user = request.user.sub
    try{
        const transactionList = await prisma.transaction.findMany({
            where:{
                UserId:user
            }
        })
        if(transactionList){
            response.status(200).send([...transactionList])
        } else {
            response.status(404).send({
                Message:"Não encontrado"
            })
        }
    } catch(err){
        response.send(err)
    }
})

app.get("/protected",{
    preHandler: [VerifyJWT]
},async (request, response)=>{
    const user = request.user
    console.log(user)
})

app.post("/register",async (request, reponse)=>{

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
        reponse.status(201).send({
            Description: "Usuario Criado",
            User_Id: obj_user.Id,
            User_Name: Username,
            User_Email: Email
        })
    }
})

app.post("/action/post/transaction",{
    preHandler:[VerifyJWT]
},async (request, response)=>{

    const {Value,Type} = z.object({
        Value: z.number(),
        Type: z.string()
    }).parse(request.body)

    const UserId = String(request.user.sub)

    const obj_transaction = await prisma.transaction.create({
        data:{
            Id: randomUUID(),
            Value,
            UserId:String(UserId),
            Type
        }
    })
    
    response.status(201).send({
        Description: "Registro de Transação",
        Value: obj_transaction.Value,
        Type: obj_transaction.Type
    })
    
    response.status(404).send("Usuário não existe");

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
        if(await comparePassword(Password, doesTheEmailExists.Password)){
            const token = await res.jwtSign({},{
                sign:{
                    sub:doesTheEmailExists.Id
                }
            })
            res.status(201).send({ token })
        }
        else{
            res.status(401).send({
                Message: "Senha Incorreta"
            })
        }
    }
})