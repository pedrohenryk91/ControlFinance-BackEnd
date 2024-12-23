import { RegisterClientController } from "./controllers/RegisterClientController"
import { PostTransactionController } from "./controllers/PostTransactionController"
import { GetTransactionsController } from "./controllers/GetTransactionsController"
import { DeleteUserController } from "./controllers/DeleteUserController"
import { AuthLoginController } from "./controllers/AuthLoginController"
import { JwtHookController } from "./hooks/JwtHookController"
import { FastifyInstance } from "fastify"
import { HomeController } from "./controllers/HomeController"
import { VerifyJWT } from "./middlewares/verifyJWT"

export async function Router(app: FastifyInstance){
    app.addHook("preHandler", JwtHookController)
    app.post("/register", RegisterClientController)
    app.post("/auth/login", AuthLoginController)
    app.post("/register/transaction", { preHandler: [VerifyJWT] }, PostTransactionController)
    app.get("/get/transactions", { preHandler:[VerifyJWT] }, GetTransactionsController)
    app.get("/", HomeController)
    app.delete("/delete/user", { preHandler:[VerifyJWT] }, DeleteUserController)
}