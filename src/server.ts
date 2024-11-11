import { app } from "./lib/app.ts"

app.listen({
    port:3000,
    host:"127.0.0.1"
},(err,path)=>{
    console.log(err||path)
})