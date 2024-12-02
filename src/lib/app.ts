import {fastify} from "fastify"
import fastifyJwt from '@fastify/jwt'
import { SECRET } from "./env/index.ts"
import { Router } from "../http/router.ts"

export const app = fastify()

app.register(fastifyJwt, {secret: SECRET})
app.register(Router)