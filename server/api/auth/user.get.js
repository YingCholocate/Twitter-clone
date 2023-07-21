import { userTransformer } from "~/server/transformer/user";
export default defineEventHandler(async(event)=>{
    console.log("00",  userTransformer(event.context.auth?.user))
    return {
            user:userTransformer(event.context.auth?.user)
        }
    })