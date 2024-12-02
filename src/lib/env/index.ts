import z from "zod";
import "dotenv/config"

export const {SECRET,PORT,HOST} = z.object({
    SECRET:z.string(),
    PORT:z.string(),
    HOST:z.string()
}).parse(process.env)