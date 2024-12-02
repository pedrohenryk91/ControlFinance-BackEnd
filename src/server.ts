import { app } from "./lib/app.ts"
import { PORT,HOST } from "./lib/env/index.ts"

app.listen({
    port:Number(PORT),
    host:HOST
},(err,path)=>{
    console.log(err||path)
})

