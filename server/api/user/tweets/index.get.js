import formidable from "formidable";
import { tweetTransformer } from "~/server/transformer/tweet";
import { getTweets } from "~/server/db/tweets";
export default defineEventHandler(async (event) => {
    const form=formidable({})
    const response=await new Promise((resolve,reject)=>{
        form.parse(event.req,(err,fields,files)=>{
            if(err){
                reject(err)
            }
            resolve({fields,files})
        })
    })

    const {fields,files}=response
    const userId=event.context?.auth?.user?.id
    const tweetData={
        text:fields.text,
        authorId:userId
    }
    const replyTo=fields.replyTo
    if(replyTo&&replyTo!=='null'){
        tweetData.replyToId=replyTo
    }

    const tweets=await getTweets({
        include:{
            auth:true,
            mediaFiles:true,
            replies:{
                include:{
                    author:true
                }
            },
            replyTo:{
                include:{
                    author:true
                }
            }
        },
        orderBy:[
            {
                createdAt:'desc'
            }
        ]
    })
    const filePromises=Object.keys(files).map(async(key)=>{
        const file=files[key]
        const cloundinaryResource=await uploadToCloundinary(file.filepath)
        return createMediaFIle({
            url:cloundinaryResource.secure_url,
            providePublicId:cloundinaryResource.public.id,
            userID:userId
        })
    })
    return{
        tweet:tweetTransformer(tweets)
    }

})